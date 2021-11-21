const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);


let currentQuestion = {};
let acceptingAnswers = false;
// starting score at 0
let score = 0;
// what question are you on
let questionCounter = 0;
// taking questions out of array
let availableQuestions = [];

let questions = [

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
        choice4:"display: grid;",
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


//contants
const correctPoints = 10;

var startGame = function() {
    // making sure counter is 0
    questionCounter = 0;
    score = 0;
    // copying in all questions from Q array - new array using spread operator
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();

};

var getNewQuestion = function() {

    if(availableQuestions.length === 0) {
        // once questions are 0 or max questions
        return window.location.assign("/end.html");
    }
    // when starting game will increment to 1
    questionCounter++;
    // basing on length of array
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach (function (choice) {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });
    // take avail questions array and getting rid of questions we already used
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach (function (choice){
    choice.addEventListener('click', function(event) {
        // click and get references to choice num
        console.log(event.target);

        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer);
        getNewQuestion();
    });
});

startGame();