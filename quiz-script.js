const questions = [
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "HyperText Modern Logic", "Home Tool Markup Language"], answer: "HyperText Markup Language" },
    { question: "What is the primary purpose of CSS?", options: ["To create web content", "To style and layout web pages", "To connect databases", "To manage web servers"], answer: "To style and layout web pages" },
    { question: "Which symbol is used for comments in JavaScript?", options: ["#", "//", "/* */", "--"], answer: "//" },
    { question: "What keyword is used to declare a variable in JavaScript?", options: ["var", "declare", "int", "def"], answer: "var" },
    { question: "Which function is used to display text in the console in JavaScript?", options: ["print()", "echo()", "console.log()", "display()"], answer: "console.log()" },
    { question: "Which programming language is used for web styling?", options: ["JavaScript", "CSS", "PHP", "Python"], answer: "CSS" },
    { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Process Utility", "Central Processor Unifier"], answer: "Central Processing Unit" },
    { question: "Which of these is not a JavaScript framework?", options: ["React", "Angular", "Django", "Vue"], answer: "Django" },
    { question: "What is the purpose of SQL?", options: ["Styling websites", "Database management", "Server configuration", "Network protocols"], answer: "Database management" }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let answers = [];

const questionBox = document.querySelector(".question-box");
const optionsContainer = document.querySelector(".answer-options");
const scoreDisplay = document.querySelector(".score");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const quizHeader = document.getElementById("quiz-number");
const timerDisplay = document.querySelector(".timer-display");

function loadQuestion() {
    clearTimeout(timer);
    const current = questions[currentQuestion];
    quizHeader.textContent = currentQuestion + 1;
    questionBox.textContent = current.question;
    optionsContainer.innerHTML = "";

    current.options.forEach(option => {
        const btn = document.createElement("button");
        btn.classList.add("option");
        btn.textContent = option;
        btn.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 10;
    updateTimerDisplay();

    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
            setTimeout(moveToNextQuestion, 1000);
        }
    }, 1000);
}

function updateTimerDisplay() {
    scoreDisplay.textContent = `${score}/${questions.length}`;
    timerDisplay.textContent = `${timeLeft}/10`;
}

function checkAnswer(selectedOption) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestion].answer;
    const options = document.querySelectorAll(".option");

    let isCorrect = false;

    options.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "#8BC34A";
        } else if (btn.textContent === selectedOption) {
            btn.style.backgroundColor = "#F44336";
        }
        btn.disabled = true;

        if (selectedOption === correctAnswer) {
            isCorrect = true;
        }
    });

    answers.push({
        question: questions[currentQuestion].question,
        selected: selectedOption,
        correct: correctAnswer
    });

    if (isCorrect) score++;
    updateProgressBar(isCorrect);

    setTimeout(moveToNextQuestion, 1000);
}

function showCorrectAnswer() {
    const correctAnswer = questions[currentQuestion].answer;
    const options = document.querySelectorAll(".option");

    options.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "#8BC34A";
        }
        btn.disabled = true;
    });

    answers.push({
        question: questions[currentQuestion].question,
        selected: null,
        correct: correctAnswer
    });

    updateProgressBar(false);
}

function updateProgressBar(isCorrect) {
    const progressStep = document.createElement("div");
    progressStep.classList.add("progress-step");
    progressStep.style.backgroundColor = isCorrect ? "#8BC34A" : "#F44336";
    progressBar.appendChild(progressStep);
}

function moveToNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    document.body.innerHTML = `
        <div class="result-container">
            <h1>Quiz Completed!</h1>
            <p class="final-score">Your Score: ${score}/${questions.length}</p>
            <div class="result-details">
                <div class="column-left">
                    ${answers.slice(0, 5).map(answer => formatResultItem(answer)).join('')}
                </div>
                <div class="column-right">
                    ${answers.slice(5).map(answer => formatResultItem(answer)).join('')}
                </div>
            </div>
        </div>
    `;
}

function formatResultItem(answer) {
    return `
        <div class="result-item" style="background-color: ${answer.selected === answer.correct ? '#8BC34A' : '#F44336'};">
            <p><strong>${answer.question}</strong></p>
            <p>Your Answer: ${answer.selected || "No Answer"}</p>
            <p>Correct Answer: ${answer.correct}</p>
        </div>
    `;
}

nextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length) {
        moveToNextQuestion();
    }
});

loadQuestion();
