var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var timerElement = document.getElementById('countdown');



var currentQuestion = {};
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var timer;
var timerCount;


var questions = [

    {
        question: "We are currently on the develop branch. Which of the following commands does NOT switch to a new branch?",
        choice1: "git checkout main",
        choice2: "git checkout -b feature/header",
        choice3: "git branch feature/header",
        choice4: "git checkout branch",
        answer: 3
    },
    {
        question: "Which of the following is NOT a good reason for version control?",
        choice1: "Version control allows the codebase to be modified and tested without interrupting the user experience.",
        choice2: "Version control allows changes to the codebase to be tested individually.",
        choice3: "Version control allows teams to work on individual features synchronously.",
        choice4: "Version control allows features to ship directly to the main branch.",
        answer: 4
    },
    {
        question: "After you’re done creating and testing a new feature in a feature branch, what is the next step?",
        choice1: "Merge the feature branch into the main branch.",
        choice2: "Merge the feature branch into the develop branch.",
        choice3: "Create a new feature branch.",
        choice4: "Perform git push origin main.",
        answer: 2
    },
    {
        question: "How do you create a flexbox?",
        choice1: "display: flex;",
        choice2: "display: flexbox;",
        choice3: "display: box;",
        choice4: "display: grid;",
        answer: 1
    },
    {
        question: "By default, in which direction does a flexbox lay out its items?",
        choice1: "A row.",
        choice2: "A column.",
        choice3: "A row-reversed.",
        choice4:"A column-reversed",
        answer: 1
    }
];

var points = 10;
var questionNum = 5;


function startGame() {
    questionCounter = 0;
    score = 0;
    timerCount = 75
    availableQuestions = [...questions];
    console.log(availableQuestions);
    startTimer();
    getNewQuestion();
};

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            getNewQuestion();
        }
    }, 1000);
}

function getNewQuestion () {
    if(availableQuestions.length == 0 || questionCounter >= questionNum) {
        clearInterval(timer);
        return window.location.assign("/end.html")
    }

    questionCounter++;
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number]
    });

    availableQuestions.splice(questionIndex,1);
};

document.addEventListener("click", function(event) {
    if (timerCount === 0) {
        return;
    }
});

choices.forEach(choice => {
    choice.addEventListener("click", event => {
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset["number"];

        if (selectedAnswer == currentQuestion.answer) {
            error.innerHTML = "<span style ='color: purple;'>"+ "<hr>Correct!</hr></span>"
            score = score + 10;
            localStorage.setItem('mostRecentScore', score);
        } else {
            error.innerHTML = "<span style='color: purple;'>"+ "<hr>Incorrect!</hr></span>"
            timerCount = timerCount - 10;
            score = score - 10;
            localStorage.setItem('mostRecentScore', score);
        };

        getNewQuestion();
    });
});

startGame();
