const startButton = document.querySelector(".start-button");
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const questionText = document.getElementById("question");
const optionButtons = document.querySelectorAll('[id^="option-"]');
const questionOutcome = document.getElementById("question-outcome");
const timerCount = document.querySelector(".timer-count");
const endContainer = document.getElementById("end-container");
const finalScoreSpan = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");

let quizOver = false; // Variable to track quiz status
let timer; // To store the timer interval

// Define your questions and answers here
const questions = [
  {
    question: "Question 1: What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Text Multi Language",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Question 2: Which of the following is NOT a programming language?",
    options: ["JavaScript", "Python", "HTML", "CSS"],
    correctIndex: 2,
  },
  {
    question:
      "Question 3: What symbol is used for single-line comments in most programming languages?",
    options: ["#", "//", "/*", "%%"],
    correctIndex: 1,
  },
  {
    question:
      "Question 4: In JavaScript, what function is used to print something to the console?",
    options: ["console.print()", "print()", "console.log()", "log()"],
    correctIndex: 2,
  },
  {
    question:
      "Question 5: What symbol is used for single-line comments in most programming languages?",
    options: ["#", "//", "/*", "%%"],
    correctIndex: 1,
  },
  {
    question:
      "Question 6: What symbol is used for single-line comments in most programming languages?",
    options: ["#", "//", "/*", "%%"],
    correctIndex: 1,
  },
  // Add more questions and answers as needed
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 90; // Initial time in seconds

function startQuiz() {
  startScreen.style.display = "none";
  questionScreen.style.display = "block";
  showQuestion(currentQuestionIndex);
  startTimer();
}

function showQuestion(index) {
  if (index < questions.length) {
    const currentQuestion = questions[index];
    questionText.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, i) => {
      optionButtons[i].textContent = option;
      optionButtons[i].addEventListener("click", () => {
        checkAnswer(i, currentQuestion.correctIndex);
      });
    });
  } else {
    endQuiz();
  }
}

function checkAnswer(selectedIndex, correctIndex) {
  if (selectedIndex === correctIndex) {
    score++;
    questionOutcome.textContent = "Correct!";
  } else {
    timeLeft -= 10;
    questionOutcome.textContent = "Incorrect!";
  }

  currentQuestionIndex++;
  setTimeout(() => {
    questionOutcome.textContent = "";
    showQuestion(currentQuestionIndex);
  }, 1000);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerCount.textContent = timeLeft;

    if (timeLeft <= 0 || quizOver) {
      // Stop timer if quiz is over
      clearInterval(timer);
      if (!quizOver) {
        endQuiz();
      }
    }
  }, 1000);
}

function endQuiz() {
  quizOver = true;
  questionScreen.style.display = "none";
  endContainer.style.display = "block";
  finalScoreSpan.textContent = score;
}

submitScoreButton.addEventListener("click", () => {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ initials, score });
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
});

startButton.addEventListener("click", startQuiz);
