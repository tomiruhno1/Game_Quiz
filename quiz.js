let questions = [];
let currentQuestionIndex = 0;

const questionText = document.getElementById("question-text");
const answerElements = Array.from(document.querySelectorAll("input[name='answer']"));
const answerLabels = Array.from(document.querySelectorAll("label"));
const feedbackContainer = document.getElementById("feedback");
const feedbackText = document.getElementById("feedback-text");
const questionListContainer = document.getElementById("question-list");
const questionList = document.getElementById("question-ul");

const addQuestionButton = document.getElementById("add-question-button");
const playButton = document.getElementById("play-button");
const questionContainer = document.getElementById("question-container");
const answerContainer = document.getElementById("answer-container");
const submitButton = document.getElementById("submit-button");
const questionInputContainer = document.getElementById("question-input");
const addNewQuestionButton = document.getElementById("add-new-question");

addQuestionButton.addEventListener("click", showQuestionInput);
playButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", checkAnswer);
addNewQuestionButton.addEventListener("click", addNewQuestion);

function showQuestionInput() {
    questionInputContainer.style.display = "block";
    addQuestionButton.style.display = "none";
    playButton.style.display = "none";
    questionListContainer.style.display = "none";
}

function addNewQuestion() {
    const questionInput = document.getElementById("new-question");
    const answerInputs = [
        document.getElementById("new-answer1"),
        document.getElementById("new-answer2"),
        document.getElementById("new-answer3"),
        document.getElementById("new-answer4")
    ];
    const correctAnswerInput = document.getElementById("new-correct-answer");

    const question = questionInput.value.trim();
    const answers = answerInputs.map(input => input.value.trim());
    const correct = parseInt(correctAnswerInput.value);

    if (!question || answers.some(answer => !answer) || isNaN(correct) || correct < 0 || correct > 3) {
        alert("Invalid input. Please make sure all fields are filled correctly.");
        return;
    }

    questions.push({
        question,
        answers,
        correct
    });

    // Clear input fields
    questionInput.value = "";
    answerInputs.forEach(input => (input.value = ""));
    correctAnswerInput.value = "";

    alert("Question added successfully!");
    questionInputContainer.style.display = "none";
    addQuestionButton.style.display = "block";
    questionListContainer.style.display = "block";

    // Display the updated list of questions
    displayQuestionList();
    if (questions.length > 0) {
        playButton.style.display = "block";
    }
}

function displayQuestionList() {
    questionList.innerHTML = "";
    questions.forEach((q, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Q${index + 1}: ${q.question}`;
        questionList.appendChild(listItem);
    });
}

function startQuiz() {
    if (questions.length === 0) {
        alert("Please add questions first.");
        return;
    }

    // Hide the question list
    questionListContainer.style.display = "none";

    addQuestionButton.style.display = "none";
    playButton.style.display = "none";
    questionContainer.style.display = "block";
    answerContainer.style.display = "block";

    loadQuestion(currentQuestionIndex);
}

function loadQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.question;

    question.answers.forEach((answer, i) => {
        answerElements[i].value = i;
        answerLabels[i].style.display = "block";
        document.getElementById(`answer${i}`).textContent = answer;
    });
}

function checkAnswer() {
    const selectedAnswer = parseInt(document.querySelector("input[name='answer']:checked").value);
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (selectedAnswer === correctAnswer) {
        feedbackText.textContent = "Correct!";
    } else {
        feedbackText.textContent = "Incorrect. Try again.";
    }

    feedbackContainer.style.display = "block";
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        feedbackText.textContent = "Quiz completed!";
        // You can add code here to handle the end of the quiz
    }
}
