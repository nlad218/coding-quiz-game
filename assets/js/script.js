// DOM elements
const startButton = document.querySelector(".start-button");
const questionContainers = document.querySelectorAll(".question-container");
const questionTexts = document.querySelectorAll(".question-text");
const answerButtons = document.querySelectorAll(".answer-button");
const timerCount = document.querySelector(".timer-count");
const endContainer = document.getElementById("end-container");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");

// Quiz variables
let currentQuestionIndex = 0;
let timeRemaining = 90; // Initial time in seconds
let timerInterval;

// Questions and answers
const questions = [
  {
    question: "Question 1: What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Text Multi Language",
    ],
    correct: 0,
  },
  {
    question:
      "Question 2: Which of the following is NOT a programming language?",
    answers: ["JavaScript", "Python", "HTML", "CSS"],
    correct: 2,
  },
  {
    question:
      "Question 3: What symbol is used for single-line comments in most programming languages?",
    answers: ["#", "//", "/*", "%%"],
    correct: 1,
  },
  {
    question:
      "Question 4: In JavaScript, what function is used to print something to the console?",
    answers: ["console.print()", "print()", "console.log()", "log()"],
    correct: 2,
  },
  // Add more questions here...
];

// Event listener for start button
startButton.addEventListener("click", startQuiz);

// Event listener for answer buttons
answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedAnswerIndex = parseInt(button.dataset.index);
    checkAnswer(selectedAnswerIndex);
  });
});

// Event listener for submit score button
submitScoreButton.addEventListener("click", saveScore);

// Function to start the quiz
function startQuiz() {
  startButton.classList.add("hidden");
  questionContainers[currentQuestionIndex].classList.remove("hidden");
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

// Function to display a question and its answers
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTexts[currentQuestionIndex].textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    answerButtons[index].textContent = answer;
    answerButtons[index].dataset.index = index;
  });
}

// Function to check the user's answer
function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedIndex === currentQuestion.correct) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  } else {
    timeRemaining -= 10; // Subtract 10 seconds for an incorrect answer
    updateTimerDisplay();
  }
}

// Function to update the timer display
function updateTimerDisplay() {
  timerCount.textContent = timeRemaining;
}

// Function to update the timer
function updateTimer() {
  timeRemaining--;
  updateTimerDisplay();
  if (timeRemaining <= 0) {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionContainers.forEach((container) => container.classList.add("hidden"));
  endContainer.classList.remove("hidden");
  finalScore.textContent = timeRemaining;
}

// Function to save the user's score
function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    // Save the initials and score to some storage (localStorage, server, etc.)
    // Example: localStorage.setItem(initials, timeRemaining);
    initialsInput.value = "";
  }
}

// Initialize the timer display
updateTimerDisplay();
