const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used to define a paragraph?",
    options: ["<p>", "<h1>", "<div>", "<span>"],
    answer: "<p>"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const nameInput = document.getElementById('name-input');
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');

startBtn.addEventListener('click', () => {
  const userName = nameInput.value.trim();
  if (userName === "") {
    alert("Please enter your name to start the quiz.");
    return;
  }
  welcomeScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  loadQuestion();
});

function loadQuestion() {
  resetState();
  const current = questions[currentIndex];
  questionEl.textContent = `Q${currentIndex + 1}: ${current.question}`;
  current.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(button, current.answer));
    optionsEl.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = 'none';
  optionsEl.innerHTML = '';
  scoreEl.textContent = '';
}

function selectAnswer(button, correctAnswer) {
  const allButtons = optionsEl.querySelectorAll('button');
  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
    }
  });

  if (button.textContent === correctAnswer) {
    score++;
  }

  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = "🎉 Quiz Completed!";
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
}
