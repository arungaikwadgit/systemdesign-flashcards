/* global FLASHCARDS */

(function () {
  "use strict";

  // =======================
  // Guards
  // =======================
  if (!Array.isArray(FLASHCARDS) || FLASHCARDS.length === 0) {
    // Fail loudly in console so you immediately see it in DevTools
    console.error("FLASHCARDS not found or empty. Check data/system-design-cards.js is loaded before script.js.");
    return;
  }

  // =======================
  // State
  // =======================
  let deck = [];
  let index = 0;

  let score = { good: 0, ok: 0, bad: 0 };
  let sessionLog = []; // { q, a, d, result }

  let timerInterval = null;
  let secondsLeft = 0;

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

  const restartTopBtn = document.getElementById("restartTopBtn");
  const showAnswerBtn = document.getElementById("showAnswerBtn");

  const goodBtn = document.getElementById("goodBtn");
  const okBtn = document.getElementById("okBtn");
  const badBtn = document.getElementById("badBtn");

  // =======================
  // Helpers
  // =======================
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
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

  // Android/Chrome reliability: use pointer events instead of inline onclick
  if (cardEl) {
    cardEl.addEventListener("pointerup", (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest("button") || target.closest("select") || target.closest("input") || target.closest("label"))
      ) {
        return;
      }
      flipCard();
    });
  }

  // Stop bubbling so taps on controls never flip card
  document.querySelectorAll("button, select, input, label").forEach((el) => {
    el.addEventListener("pointerup", (e) => e.stopPropagation());
  });

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
  // Deck building
  // =======================
  function buildDeck() {
    const filter = difficultyFilter.value;

    deck = FLASHCARDS
      .filter(card => (filter === "all" ? true : card.d === filter))
      .map(card => ({ ...card }));

    if (deck.length === 0) {
      deck = FLASHCARDS.map(card => ({ ...card }));
    }

    if (shuffleToggle.checked) {
      deck = shuffleArray(deck);
    }
  }

  // =======================
  // Badges + UI
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

  function updateProgress() {
    const activeFilter = difficultyFilter.value === "all" ? "All" : difficultyFilter.value;
    progressEl.textContent =
      `Card ${index + 1} of ${deck.length} • Difficulty: ${activeFilter} • ✅ ${score.good} ⚠️ ${score.ok} ❌ ${score.bad}`;
  }

  function loadCard() {
    if (index >= deck.length) {
      showResult();
      return;
    }

    const card = deck[index];

    // Reset to front each new card
    setFlipped(false);

    questionEl.textContent = card.q;
    answerEl.textContent = card.a;

    applyDifficultyBadges(card.d || "Basic");
    updateProgress();

    startTimerIfEnabled();
  }

  // =======================
  // Mark answers
  // =======================
  function markAnswer(type, opts = {}) {
    if (index >= deck.length) return;

    sessionLog.push({ ...deck[index], result: type });

    if (!opts.fromTimer) clearTimer();

    if (!Object.prototype.hasOwnProperty.call(score, type)) return;
    score[type] += 1;

    index += 1;
    loadCard();
  }

  // =======================
  // Result / review
  // =======================
  function showResult() {
    clearTimer();

    // hide main UI parts
    cardEl.classList.add("hidden");
    document.querySelector(".buttons").classList.add("hidden");
    document.querySelector(".actions").classList.add("hidden");
    document.querySelector(".controls").classList.add("hidden");
    document.querySelector(".meta").classList.add("hidden");
    restartTopBtn.classList.add("hidden");

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
        <button class="primary" id="restartBtnInline">Restart</button>
        <button class="secondary" style="width:100%; margin-top:8px;" id="reviewBtnInline">Review Missed Only</button>
      </div>
    `;

    // wire inline buttons
    document.getElementById("restartBtnInline").addEventListener("click", restartGame);
    document.getElementById("reviewBtnInline").addEventListener("click", reviewMissed);
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
          <button class="primary" id="restartFullBtn">Restart Full Deck</button>
        </div>
      `;
      document.getElementById("restartFullBtn").addEventListener("click", restartGame);
      return;
    }

    // restore UI
    cardEl.classList.remove("hidden");
    document.querySelector(".buttons").classList.remove("hidden");
    document.querySelector(".actions").classList.remove("hidden");
    document.querySelector(".controls").classList.remove("hidden");
    document.querySelector(".meta").classList.remove("hidden");
    restartTopBtn.classList.remove("hidden");

    resultEl.classList.add("hidden");
    resultEl.innerHTML = "";

    deck = missedOnly.map(x => ({ q: x.q, a: x.a, d: x.d || "Basic" }));
    if (shuffleToggle.checked) deck = shuffleArray(deck);

    index = 0;
    score = { good: 0, ok: 0, bad: 0 };

    loadCard();
  }

  // =======================
  // Restart
  // =======================
  function restartGame() {
    clearTimer();
    sessionLog = [];
    index = 0;
    score = { good: 0, ok: 0, bad: 0 };

    // restore UI
    cardEl.classList.remove("hidden");
    document.querySelector(".buttons").classList.remove("hidden");
    document.querySelector(".actions").classList.remove("hidden");
    document.querySelector(".controls").classList.remove("hidden");
    document.querySelector(".meta").classList.remove("hidden");
    restartTopBtn.classList.remove("hidden");

    resultEl.classList.add("hidden");
    resultEl.innerHTML = "";

    buildDeck();
    loadCard();
  }

  // =======================
  // Wire buttons
  // =======================
  restartTopBtn.addEventListener("click", restartGame);
  showAnswerBtn.addEventListener("click", showAnswer);

  goodBtn.addEventListener("click", () => markAnswer("good"));
  okBtn.addEventListener("click", () => markAnswer("ok"));
  badBtn.addEventListener("click", () => markAnswer("bad"));

  shuffleToggle.addEventListener("change", restartGame);

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

  difficultyFilter.addEventListener("change", restartGame);

  // =======================
  // Boot
  // =======================
  restartGame();

})();
