// ---------- Page switching ----------
const pages = document.querySelectorAll(".page");
const triggers = document.querySelectorAll("[data-page]"); // nav buttons, logo, "read more" buttons
const menu = document.querySelector("#menuList");
const hamBtn = document.querySelector("#hamIcon");

function showPage(n) {
  pages.forEach(p => { p.hidden = p.id !== "page" + n; });
  document.querySelectorAll("#menuList [data-page]").forEach(b => {
    b.classList.toggle("active", Number(b.dataset.page) === n);
  });
  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

triggers.forEach(t => t.addEventListener("click", () => showPage(Number(t.dataset.page))));
showPage(1);

// ---------- Hamburger menu ----------
function closeMenu() {
  menu.classList.remove("open");
  hamBtn.setAttribute("aria-expanded", "false");
}
hamBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open"); // CSS handles the slide animation
  hamBtn.setAttribute("aria-expanded", open);
});

// ---------- Quiz ----------
const questions = [
  { question: "When did the Western Roman Empire fall?", answer: ["476 AD", "1453 AD", "509 BC", "27 BC"], correct: 0 },
  { question: "What marked the transition of the Roman government from a kingdom to a Republic?", answer: ["The fall of the Roman Empire", "The establishment of the Republic in 509 BC", "The coronation of the first Roman Emperor", "The founding of Rome in 753 BC"], correct: 1 },
  { question: "What were the Romans known for in terms of architecture and construction?", answer: ["Inventing the steam engine", "Developing the printing press", "Engineering the arch, dome, aqueducts, and durable concrete", "Pioneering space travel"], correct: 2 },
  { question: "What was a significant form of entertainment in Roman culture?", answer: ["Football matches", "Cooking shows", "Gladiator fights and chariot races at the Colosseum", "Video games"], correct: 2 },
  { question: "Who was the first emperor of Rome?", answer: ["Julius Caesar", "Augustus (formerly known as Octavian)", "Nero", "Cleopatra"], correct: 1 },
  { question: "Who were the twin brothers in Roman mythology who founded Rome?", answer: ["Romulus and Julius", "Romulus and Maximus", "Remus and Augustus", "Romulus and Remus"], correct: 3 },
  { question: "What event traditionally marks the end of the Western Roman Empire?", answer: ["The fall of the Byzantine Empire", "The Battle of Hastings", "The fall of Rome to Germanic chieftain Odoacer in 476 AD", "The signing of the Magna Carta"], correct: 2 }
];

const scoreText = document.querySelector("#scoreText");
const questionText = document.querySelector("#questionText");
const answersEl = document.querySelector("#answers");
const startBtn = document.querySelector("#startBtn");

let remaining = [];
let current = null;
let score = 0;
let locked = false;

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

function startQuiz() {
  remaining = shuffle(questions); // every question once, random order
  score = 0;
  startBtn.hidden = true;
  nextQuestion();
}

function nextQuestion() {
  locked = false;
  scoreText.textContent = `Score: ${score}`;
  answersEl.innerHTML = "";

  if (remaining.length === 0) {
    questionText.textContent = `You scored ${score} out of ${questions.length}`;
    startBtn.textContent = "Retry";
    startBtn.hidden = false;
    return;
  }

  current = remaining.pop();
  questionText.textContent = current.question;

  shuffle(current.answer.map((text, index) => ({ text, index }))).forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "box";
    btn.textContent = opt.text;
    btn.dataset.index = opt.index;
    btn.addEventListener("click", () => checkAnswer(btn, opt.index));
    answersEl.append(btn);
  });
}

function checkAnswer(btn, index) {
  if (locked) return; // ignore double clicks
  locked = true;

  const isCorrect = index === current.correct;
  if (isCorrect) score++;

  [...answersEl.children].forEach(b => {
    b.disabled = true;
    if (Number(b.dataset.index) === current.correct) b.classList.add("green");
  });
  if (!isCorrect) btn.classList.add("red");

  scoreText.textContent = `Score: ${score}`;
  questionText.append(document.createElement("br"), isCorrect ? "Correct!" : "Wrong!");
  setTimeout(nextQuestion, isCorrect ? 800 : 1700);
}

startBtn.addEventListener("click", startQuiz);