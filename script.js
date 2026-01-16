// =======================
// Flashcards (All 50) + Difficulty Tags
// d: "Basic" | "Intermediate" | "Advanced"
// =======================
const FLASHCARDS = [
  { q: "1) What is Generative AI?", a: "AI systems that create new content (text, images, audio, code, video) by learning patterns from data and generating realistic outputs.", d: "Basic" },
  { q: "2) Difference between Generative AI and Traditional AI?", a: "Traditional AI focuses on classification/prediction/detection (e.g., spam). Generative AI creates new content (e.g., emails/images). Traditional uses structured objectives; GenAI uses neural nets + probabilistic generation.", d: "Basic" },
  { q: "3) What are Large Language Models (LLMs)?", a: "Deep learning models trained on massive text datasets to understand and generate human-like language, typically using transformer architecture (e.g., GPT, Claude, LLaMA).", d: "Basic" },
  { q: "4) Role of transformers in Generative AI?", a: "Transformers use self-attention to model relationships between tokens, enabling strong context understanding and high-quality generation.", d: "Basic" },
  { q: "5) What is the architecture of GPT?", a: "Decoder-only transformer: input embeddings, positional encoding, stacked transformer blocks (self-attn + FFN), output layer for next-token prediction.", d: "Basic" },
  { q: "6) How does a language model generate text?", a: "It predicts the next token given prior context and repeats token-by-token. Decoding strategies include greedy, beam search, top-k, and top-p sampling.", d: "Basic" },
  { q: "7) What is prompt engineering?", a: "Designing prompts to steer model behavior and output quality using techniques like zero-shot, few-shot, role prompting, constraints, and structured outputs.", d: "Basic" },
  { q: "8) What is fine-tuning in LLMs?", a: "Further training a pre-trained model on task- or domain-specific data to improve performance for a particular use case (e.g., support bot, legal assistant).", d: "Basic" },
  { q: "9) What is tokenization in NLP?", a: "Splitting text into tokens (words/subwords/characters). LLMs operate on tokens, not raw text.", d: "Basic" },
  { q: "10) Pre-training vs fine-tuning?", a: "Pre-training learns general language patterns from large corpora. Fine-tuning adapts the model to specific tasks/domains. Pre-training = broad; fine-tuning = targeted.", d: "Basic" },

  { q: "11) What are embeddings and why are they important?", a: "Dense vector representations that capture semantic meaning. Similar concepts are close in vector space; used for search, clustering, retrieval, and context matching.", d: "Basic" },
  { q: "12) What is temperature in text generation?", a: "Controls randomness. Lower temp = more deterministic; higher temp = more diverse/creative. It scales token probabilities before sampling.", d: "Basic" },
  { q: "13) What is top-k and top-p sampling?", a: "Top-k samples from the k most probable tokens. Top-p (nucleus) samples from the smallest set whose cumulative probability ≥ p. Both manage diversity.", d: "Basic" },
  { q: "14) Difference between ChatGPT and GPT?", a: "GPT is the base model. ChatGPT is tuned for dialogue (often using RLHF and instruction tuning) to be more helpful, safe, and conversational.", d: "Basic" },
  { q: "15) What are hallucinations in LLMs?", a: "Confident but incorrect outputs. Causes include weak grounding, ambiguous prompts, limited training signals, and probabilistic generation.", d: "Basic" },

  { q: "16) What is RLHF?", a: "Reinforcement Learning with Human Feedback: human preferences train a reward model; the model is optimized to produce preferred responses under that reward.", d: "Intermediate" },
  { q: "17) What are diffusion models in image generation?", a: "They start from random noise and iteratively denoise to produce an image, guided by a learned denoising model.", d: "Intermediate" },
  { q: "18) Difference between GANs and diffusion models?", a: "GANs: generator vs discriminator, fast but can be unstable (mode collapse). Diffusion: iterative denoising, slower but often more stable and high quality.", d: "Intermediate" },
  { q: "19) What is Stable Diffusion?", a: "An open-source diffusion-based model for text-to-image and image-to-image generation, designed to be efficient on consumer GPUs.", d: "Intermediate" },
  { q: "20) What is multimodal AI?", a: "Models that understand/generate across multiple modalities (text, images, audio, video), enabling tasks like vision Q&A, captioning, and audio-to-text.", d: "Basic" },

  { q: "21) What is image-to-text generation?", a: "Models analyze images and produce descriptive text, combining computer vision understanding with language generation (e.g., captioning, product descriptions).", d: "Intermediate" },
  { q: "22) What is a vector database and how is it used with LLMs?", a: "Stores embeddings and supports similarity search. In RAG, queries become vectors, retrieve relevant chunks, then feed them to the LLM for grounded responses.", d: "Intermediate" },
  { q: "23) What is RAG (Retrieval-Augmented Generation)?", a: "A retriever finds relevant documents; the LLM generates an answer using retrieved context, improving factuality and domain accuracy.", d: "Intermediate" },
  { q: "24) How does grounding work in Generative AI?", a: "Grounding anchors responses in external facts by injecting retrieved documents, database results, or tool outputs, reducing hallucinations.", d: "Intermediate" },
  { q: "25) Explain embeddings in Generative AI.", a: "Vector representations capturing meaning. Used for semantic search, recommendations, clustering, and retrieving relevant context for prompting.", d: "Intermediate" },
  { q: "26) What are system, user, and assistant roles in chat models?", a: "System sets behavior/policies; user provides requests; assistant returns outputs. Role separation improves instruction hierarchy and consistency.", d: "Intermediate" },
  { q: "27) How do you evaluate a generative model?", a: "Assess fluency, relevance, factuality, safety, and diversity via automatic metrics, benchmarks, human review, and task-specific evaluations.", d: "Intermediate" },
  { q: "28) Common LLM evaluation metrics?", a: "Text: BLEU/ROUGE (overlap), perplexity (fluency), BERTScore (semantic). Images: FID. Also A/B win rates and human preference scores.", d: "Intermediate" },
  { q: "29) What are tokens and context length?", a: "Tokens are input units. Context length is the max tokens a model can process at once (prompt + history + output).", d: "Basic" },
  { q: "30) What causes token limit errors?", a: "When prompt + expected output exceed max context. Fix by shortening, chunking, summarizing, or using a larger-context model.", d: "Basic" },

  { q: "31) What is model compression?", a: "Reducing model size/cost while keeping accuracy. Common methods: pruning, quantization, and knowledge distillation.", d: "Intermediate" },
  { q: "32) What are LoRA and QLoRA?", a: "LoRA adds low-rank trainable adapters for efficient fine-tuning. QLoRA combines LoRA with 4-bit quantization to reduce memory and enable tuning on limited hardware.", d: "Advanced" },
  { q: "33) Few-shot vs zero-shot learning?", a: "Zero-shot: no examples, rely on generalization. Few-shot: include a few examples in the prompt to guide behavior via in-context learning.", d: "Intermediate" },
  { q: "34) How does Chain-of-Thought (CoT) prompting help?", a: "Encourages step-by-step reasoning, improving accuracy on multi-step problems (logic, math, planning). Use carefully for safety/verbosity needs.", d: "Intermediate" },
  { q: "35) What are guardrails in Generative AI?", a: "Policies and technical controls that constrain outputs for safety, compliance, and alignment (filters, tool gating, refusal policies, validators).", d: "Intermediate" },
  { q: "36) What is content moderation in AI outputs?", a: "Filtering or flagging unsafe/inappropriate content (hate, harassment, violence, sexual content, self-harm, etc.) using classifiers and rules.", d: "Intermediate" },
  { q: "37) What is synthetic data and how is it generated?", a: "Artificial data mimicking real distributions without exposing sensitive info. Generated using GANs, diffusion models, or LLMs; used for training/testing and privacy.", d: "Intermediate" },
  { q: "38) How is Generative AI used in design and media?", a: "Text-to-image, video creation, voiceovers, marketing drafts, rapid prototyping, style exploration, and automating repetitive creative tasks.", d: "Intermediate" },
  { q: "39) Explain OpenAI’s GPTs (custom GPTs).", a: "User-configured assistants with custom instructions, knowledge files, and tool access for specialized workflows, often with minimal/no code.", d: "Advanced" },
  { q: "40) What is the OpenAI API and how do you use it?", a: "A REST API to call models (text, vision, audio). Send prompts + parameters (model, temperature, etc.) and receive generated responses for apps and workflows.", d: "Advanced" },

  { q: "41) What is latent space in generative models?", a: "A compact representation where each point corresponds to a potential output. Models learn to map between latent space and real data (common in GANs/VAEs).", d: "Advanced" },
  { q: "42) What are safety challenges in Generative AI?", a: "Hallucinations, bias, toxic content, privacy leakage, jailbreaks, and misuse. Mitigations: guardrails, grounding, moderation, and monitoring.", d: "Advanced" },
  { q: "43) How is copyright handled with AI-generated content?", a: "Laws vary and are evolving. Questions include authorship of outputs and legality of training data use; compliance typically requires policy + legal review.", d: "Advanced" },
  { q: "44) What is AI watermarking?", a: "Embedding detectable signals into AI-generated text/images to help identify synthetic content for attribution, detection, and policy enforcement.", d: "Advanced" },
  { q: "45) What are ethical concerns in Generative AI?", a: "Deepfakes, impersonation, bias reinforcement, misinformation, plagiarism, and data misuse. Requires transparency, fairness, and human oversight.", d: "Advanced" },
  { q: "46) What are the risks of deepfakes?", a: "Fraud, identity theft, political manipulation, harassment, defamation, and erosion of trust in media; mitigated via detection tools and policy controls.", d: "Advanced" },
  { q: "47) How do you fine-tune a model on custom data?", a: "Prepare a clean dataset, define objective, train using frameworks (e.g., Hugging Face) and PEFT methods (LoRA/QLoRA), validate, and deploy with monitoring.", d: "Advanced" },
  { q: "48) Popular open-source LLMs?", a: "Examples: LLaMA family, Mistral, Falcon, BLOOM, OpenAssistant. Used for private deployments, research, and customization.", d: "Advanced" },
  { q: "49) How do you integrate Generative AI in applications?", a: "Use APIs (hosted) or self-host open models. Typical pattern: prompt + tools + RAG + safety filters + observability. Integrate via backend services.", d: "Intermediate" },
  { q: "50) What skills are needed for working in Generative AI?", a: "Python, ML/DL fundamentals, transformers/attention, data prep, prompt design, model evaluation, deployment, and API integration.", d: "Basic" }
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