const questions = [
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "High Tech Modern Language", "HyperText Modern Logic", "Home Tool Markup Language"],
        answer: "HyperText Markup Language"
    },
    {
        question: "Which programming language is used for web styling?",
        options: ["JavaScript", "CSS", "PHP", "Python"],
        answer: "CSS"
    },
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Process Utility", "Central Processor Unifier"],
        answer: "Central Processing Unit"
    },
    {
        question: "Which of these is not a JavaScript framework?",
        options: ["React", "Angular", "Django", "Vue"],
        answer: "Django"
    },
    {
        question: "What is the purpose of SQL?",
        options: ["Styling websites", "Database management", "Server configuration", "Network protocols"],
        answer: "Database management"
    }
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

// Add these functions to display questions and handle interactions

// Initialize the quiz when the page loads
function initializeQuiz() {
    // Create progress bar steps
    createProgressBar();
    // Display first question
    displayQuestion();
    // Update score display
    updateScore();
    // Start timer
    startTimer();
    
    // Add event listener for Next button
    nextButton.addEventListener('click', handleNextButton);
}

// Display the current question and options
function displayQuestion() {
    const currentQ = questions[currentQuestion];
    questionBox.textContent = currentQ.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create new option buttons
    currentQ.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(button);
    });
    
    // Update quiz number
    quizHeader.textContent = currentQuestion + 1;
}

// Handle option selection
function selectOption(selectedOption) {
    // Store user's answer
    answers[currentQuestion] = selectedOption;
    
    // Highlight the selected option
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === selectedOption) {
            option.classList.add('selected');
        }
    });
    
    // Check if answer is correct and update score
    if (selectedOption === questions[currentQuestion].answer) {
        if (!answers.includes(selectedOption)) {
            score++;
            updateScore();
        }
    }
}

// Handle Next button click
function handleNextButton() {
    clearInterval(timer);
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        timeLeft = 10;
        displayQuestion();
        startTimer();
        updateProgressBar();
    } else {
        // End of quiz
        showResults();
    }
}

// Create progress bar steps
function createProgressBar() {
    for (let i = 0; i < questions.length; i++) {
        const step = document.createElement('div');
        step.classList.add('progress-step');
        if (i === 0) step.classList.add('active');
        progressBar.appendChild(step);
    }
}

// Update progress bar
function updateProgressBar() {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        if (index <= currentQuestion) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = `${score}/${questions.length}`;
}

// Start timer for current question
function startTimer() {
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNextButton();
        }
    }, 1000);
}

// Show quiz results
function showResults() {
    questionBox.textContent = `Quiz Complete! Your score: ${score}/${questions.length}`;
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';
    
    // Display all questions and answers
    questions.forEach((q, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        
        const userAnswer = answers[index] || 'Not answered';
        const isCorrect = userAnswer === q.answer;
        
        resultItem.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${q.question}</p>
            <p>Your answer: ${userAnswer} ${isCorrect ? '✓' : '✗'}</p>
            <p>Correct answer: ${q.answer}</p>
        `;
        
        optionsContainer.appendChild(resultItem);
    });
}

// Start the quiz when the page loads
window.onload = initializeQuiz;