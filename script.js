// =======================
// Flashcards (All 50) + Difficulty Tags
// d: "Basic" | "Intermediate" | "Advanced"
// =======================
const FLASHCARDS = [
  { q: "API Design", a: "Designing clear, consistent endpoints using HTTP semantics. Focus on clarity, status codes, and predictable behavior.", d: "Basic" },
  { q: "Saga", a: "A pattern for managing distributed transactions using a series of local steps with compensating actions.", d: "Advanced" },
  { q: "DNS", a: "Resolves domain names to IP addresses. Caching and TTL are critical for performance and availability.", d: "Basic" },
  { q: "Idempotency", a: "Repeating the same request produces the same result. Critical for retries in distributed systems.", d: "Intermediate" },
  { q: "JWT", a: "Stateless authentication token signed by the server. Scales well but needs careful expiration.", d: "Intermediate" },
  { q: "HTTPS", a: "Encrypts data in transit using TLS to ensure confidentiality and integrity.", d: "Basic" },
  { q: "Redis", a: "In-memory data store used for caching, sessions, and rate limiting.", d: "Intermediate" },
  { q: "RPC", a: "Remote calls that feel like local function calls. Faster but tightly coupled.", d: "Intermediate" },
  { q: "Monolith vs Microservices", a: "Monoliths are simpler. Microservices scale teams but add complexity.", d: "Basic" },
  { q: "Modular Monolith", a: "Single deployable unit with strong internal boundaries.", d: "Intermediate" },
  { q: "Web Request Path", a: "DNS → Load balancer → App → Database → Response.", d: "Basic" },
  { q: "System Design Fundamentals", a: "Scalability, availability, consistency, latency, fault tolerance.", d: "Basic" },
  { q: "Consistent Hashing", a: "Distributes data evenly and minimizes rebalancing when nodes change.", d: "Advanced" },
  { q: "API Versioning", a: "Allows API evolution without breaking clients.", d: "Intermediate" },
  { q: "Microservices 101", a: "Independent services with their own data and deployments.", d: "Intermediate" },
  { q: "Frontend 101", a: "Client-side rendering, state management, and performance.", d: "Basic" },
  { q: "WebSockets", a: "Persistent bi-directional connections for real-time updates.", d: "Intermediate" },
  { q: "Bloom Filters", a: "Probabilistic structure for fast membership checks with false positives.", d: "Advanced" },
  { q: "Security Basics", a: "Never store plaintext passwords. Use salted hashes and rate limiting.", d: "Basic" },
  { q: "Service Discovery", a: "Allows services to dynamically locate each other.", d: "Intermediate" }
];

// =======================
// State
// =======================
let deck = [];
let index = 0;

let score = { good: 0, ok: 0, bad: 0 };
let answeredCount = 0;

let timerInterval = null;
let secondsLeft = 0;

let sessionLog = []; // { q, a, d, result: 'good'|'ok'|'bad' }

// =======================
// DOM
// =======================
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const cardEl = document.getElementById("card");

const shuffleToggle = document.getElementById("shuffleToggle");
const timerToggle = document.getElementById("timerToggle");
const timerSecondsInput = document.getElementById("timerSeconds");

const difficultyFilter = document.getElementById("difficultyFilter");
const difficultyBadge = document.getElementById("difficultyBadge");
const difficultyBadgeBack = document.getElementById("difficultyBadgeBack");

const flipInner = document.getElementById("flipInner");

// Ensure card flip works reliably on mobile
if (cardEl) {
  cardEl.addEventListener("pointerup", (e) => {
    // Only flip if the tap was not on a button/control
    const target = e.target;
    if (target && (target.closest("button") || target.closest("select") || target.closest("input") || target.closest("label"))) {
      return;
    }
    flipCard();
  });
}

document.querySelectorAll("button, select, input, label").forEach((el) => {
  el.addEventListener("pointerup", (e) => e.stopPropagation());
});


// =======================
// Helpers
// =======================
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerEl.classList.add("hidden");
}

// =======================
// Flip logic
// =======================
function setFlipped(isFlipped) {
  if (!flipInner) return;
  flipInner.classList.toggle("is-flipped", isFlipped);
}

function flipCard() {
  if (!flipInner) return;
  const isNowFlipped = !flipInner.classList.contains("is-flipped");
  setFlipped(isNowFlipped);
}

function showAnswer() {
  setFlipped(true);
}

// =======================
// Timer
// =======================
function startTimerIfEnabled() {
  clearTimer();
  if (!timerToggle.checked) return;

  const perCard = clamp(parseInt(timerSecondsInput.value || "45", 10), 10, 180);
  secondsLeft = perCard;

  timerEl.classList.remove("hidden");
  timerEl.textContent = `⏱️ ${secondsLeft}s`;

  timerInterval = setInterval(() => {
    secondsLeft -= 1;
    timerEl.textContent = `⏱️ ${secondsLeft}s`;

    if (secondsLeft <= 0) {
      clearTimer();
      markAnswer("bad", { fromTimer: true });
    }
  }, 1000);
}

// =======================
// Deck building (difficulty filter)
// =======================
function buildDeck() {
  const filter = difficultyFilter.value;

  deck = FLASHCARDS
    .filter(card => (filter === "all" ? true : card.d === filter))
    .map(x => ({ ...x }));

  if (deck.length === 0) {
    deck = FLASHCARDS.map(x => ({ ...x }));
  }

  if (shuffleToggle.checked) deck = shuffleArray(deck);
}

// =======================
// UI
// =======================
function applyDifficultyBadges(level) {
  const cls = level === "Basic" ? "basic" : level === "Intermediate" ? "intermediate" : "advanced";

  if (difficultyBadge) {
    difficultyBadge.textContent = level;
    difficultyBadge.classList.remove("basic", "intermediate", "advanced");
    difficultyBadge.classList.add(cls);
  }

  if (difficultyBadgeBack) {
    difficultyBadgeBack.textContent = level;
    difficultyBadgeBack.classList.remove("basic", "intermediate", "advanced");
    difficultyBadgeBack.classList.add(cls);
  }
}

function loadCard() {
  if (index >= deck.length) {
    showResult();
    return;
  }

  const card = deck[index];

  // Reset to front on each new card
  setFlipped(false);

  questionEl.textContent = card.q;
  answerEl.textContent = card.a;

  const level = card.d || "Basic";
  applyDifficultyBadges(level);

  const activeFilter = difficultyFilter.value === "all" ? "All" : difficultyFilter.value;
  progressEl.textContent =
    `Card ${index + 1} of ${deck.length}  •  Difficulty: ${activeFilter}  •  ✅ ${score.good}  ⚠️ ${score.ok}  ❌ ${score.bad}`;

  startTimerIfEnabled();
}

// =======================
// Answer marking (with logging)
// =======================
function markAnswer(type, opts = {}) {
  if (index >= deck.length) return;

  // Log current card
  sessionLog.push({ ...deck[index], result: type });

  if (!opts.fromTimer) clearTimer();

  if (!Object.prototype.hasOwnProperty.call(score, type)) return;

  score[type] += 1;
  answeredCount += 1;
  index += 1;

  loadCard();
}

function showResult() {
  clearTimer();

  cardEl.classList.add("hidden");
  document.querySelector(".buttons").classList.add("hidden");
  document.querySelector(".actions").classList.add("hidden");
  document.querySelector(".controls").classList.add("hidden");
  document.querySelector(".meta").classList.add("hidden");
  document.getElementById("restartTopBtn").classList.add("hidden");

  const total = deck.length;
  const got = score.good;
  const partial = score.ok;
  const missed = score.bad;

  const maxPoints = total * 2;
  const points = got * 2 + partial * 1;
  const percent = Math.round((points / maxPoints) * 100);

  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    <h2>Session Complete</h2>

    <div class="row"><span>✅ Got it</span><span>${got}</span></div>
    <div class="row"><span>⚠️ Partial</span><span>${partial}</span></div>
    <div class="row"><span>❌ Missed</span><span>${missed}</span></div>
    <div class="row"><span>Total Cards</span><span>${total}</span></div>
    <div class="row"><span>Score</span><span>${percent}%</span></div>

    <div style="margin-top:12px;">
      <button class="primary" onclick="restartGame()">Restart</button>
      <button class="secondary" style="width:100%; margin-top:8px;" onclick="reviewMissed()">Review Missed Only</button>
    </div>
  `;
}

// =======================
// Restart + Review Missed
// =======================
function restartGame() {
  clearTimer();
  sessionLog = [];

  index = 0;
  score = { good: 0, ok: 0, bad: 0 };
  answeredCount = 0;

  cardEl.classList.remove("hidden");
  document.querySelector(".buttons").classList.remove("hidden");
  document.querySelector(".actions").classList.remove("hidden");
  document.querySelector(".controls").classList.remove("hidden");
  document.querySelector(".meta").classList.remove("hidden");
  document.getElementById("restartTopBtn").classList.remove("hidden");

  resultEl.classList.add("hidden");
  resultEl.innerHTML = "";

  buildDeck();
  loadCard();
}

function reviewMissed() {
  const missedOnly = sessionLog.filter(x => x.result === "bad" || x.result === "ok");

  if (missedOnly.length === 0) {
    resultEl.innerHTML = `
      <h2>Nothing to Review</h2>
      <div style="margin-top:10px; line-height:1.5;">
        You had no Partial/Missed cards in the last run.
      </div>
      <div style="margin-top:12px;">
        <button class="primary" onclick="restartGame()">Restart Full Deck</button>
      </div>
    `;
    return;
  }

  cardEl.classList.remove("hidden");
  document.querySelector(".buttons").classList.remove("hidden");
  document.querySelector(".actions").classList.remove("hidden");
  document.querySelector(".controls").classList.remove("hidden");
  document.querySelector(".meta").classList.remove("hidden");
  document.getElementById("restartTopBtn").classList.remove("hidden");

  resultEl.classList.add("hidden");
  resultEl.innerHTML = "";

  // Keep difficulty in review deck
  deck = missedOnly.map(x => ({ q: x.q, a: x.a, d: x.d || "Basic" }));
  if (shuffleToggle.checked) deck = shuffleArray(deck);

  index = 0;
  score = { good: 0, ok: 0, bad: 0 };
  answeredCount = 0;

  loadCard();
}

// =======================
// Listeners
// =======================
shuffleToggle.addEventListener("change", () => restartGame());

timerToggle.addEventListener("change", () => {
  clearTimer();
  startTimerIfEnabled();
});

timerSecondsInput.addEventListener("change", () => {
  if (timerToggle.checked) {
    clearTimer();
    startTimerIfEnabled();
  }
});

difficultyFilter.addEventListener("change", () => restartGame());

// =======================
// Boot
// =======================

restartGame();
