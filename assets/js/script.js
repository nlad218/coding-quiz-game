//Selecting Elements from HTML
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

// Questions and Answers
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
      "Question 3: In JavaScript, what function is used to print something to the console?",
    options: ["console.print()", "print()", "log()", "console.log()"],
    correctIndex: 3,
  },
  {
    question:
      "Question 4: What symbol is used for single-line comments in most programming languages?",
    options: ["#", "//", "/*", "%%"],
    correctIndex: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // Initial time in seconds

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

    // Remove previous event listeners
    optionButtons.forEach((button) => {
      button.removeEventListener("click", optionClickHandler);
    });

    // Add event listener to all option buttons
    optionButtons.forEach((button, i) => {
      button.textContent = currentQuestion.options[i];
      button.addEventListener("click", optionClickHandler);
    });
  } else {
    endQuiz();
  }
}

function optionClickHandler(event) {
  const clickedOptionIndex = Array.from(optionButtons).indexOf(event.target);
  checkAnswer(clickedOptionIndex, questions[currentQuestionIndex].correctIndex);
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
  finalScoreSpan.textContent = timeLeft;
}

submitScoreButton.addEventListener("click", () => {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ initials, timeLeft });
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
});

startButton.addEventListener("click", startQuiz);
