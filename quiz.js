console.log("file connected!");

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getDatabase, ref, set, push} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC0Iv-1cht36WBsOr9JTmHk_X7luMMsyqk",
    authDomain: "quiz-app23.firebaseapp.com",
    databaseURL: "https://quiz-app23-default-rtdb.firebaseio.com/",
    projectId: "quiz-app23",
    storageBucket: "quiz-app23.firebasestorage.app",
    messagingSenderId: "894235984274",
    appId: "1:894235984274:web:5731893d68eabaa712814b",
    measurementId: "G-W130473EH7"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// QUESTIONS 

var arr = [
    {
        Question1: "What does HTML stand for?",
        Option1: "Hyper Text Markup Language",
        Option2: "High Text Machine Language",
        Option3: "Hyperlink Text Language",
        Option4: "Home Tool Markup Language",
        correct: "Hyper Text Markup Language",
    },

    {
        Question1: "Who is the father of HTML?",
        Option1: "Rasmus Lerdorf",
        Option2: "Tim Berners-Lee",
        Option3: "Brendan Eich",
        Option4: "Sergey Brin",
        correct: "Tim Berners-Lee",
    },

    {
        Question1: "Which tag is used to create the largest heading?",
        Option1: "h6",
        Option2: "head",
        Option3: "h1",
        Option4: "heading",
        correct: "h1",
    },

    {
        Question1: "Which tag is used to create a paragraph in HTML?",
        Option1: "h1",
        Option2: "p",
        Option3: "br",
        Option4: "div",
        correct: "p",
    },

    {
        Question1: "Which tag is used to insert an image in HTML?",
        Option1: "image",
        Option2: "img",
        Option3: "pic",
        Option4: "src",
        correct: "img",
    },

    {
        Question1: "Which HTML element is used to define independent, self-contained content?",
        Option1: "div",
        Option2: "section",
        Option3: "article",
        Option4: "span",
        correct: "article",
    },

    {
        Question1: "Which HTML element is used to define the main content of a document?",
        Option1: "section",
        Option2: "main",
        Option3: "content",
        Option4: "body",
        correct: "main",
    },

    {
        Question1: "Which HTML element is used to define navigation links?",
        Option1: "navigate",
        Option2: "navigation",
        Option3: "nav",
        Option4: "links",
        correct: "nav",
    },

    {
        Question1: "Which attribute provides alternative text for an image?",
        Option1: "title",
        Option2: "alt",
        Option3: "src",
        Option4: "description",
        correct: "alt",
    },

    {
        Question1: "Which input type allows users to select multiple options?",
        Option1: "radio",
        Option2: "text",
        Option3: "checkbox",
        Option4: "select",
        correct: "checkbox",
    }
];


// VARIABLES

var count = 0;
var score = 0;
var answered = false;


// SAVE QUESTIONS

function saveData() {

    var questionsRef = ref(database, "Questions");

    set(questionsRef, arr)

        .then(() => {
            console.log("Questions saved successfully!");
        })

        .catch((error) => {
            console.log(error);
        });
}

saveData();


// SAVE SCORE 

function saveScore(score) {

    var user = auth.currentUser;

    if (user) {

        var scoreRef = push(ref(database, "Scores"));

        set(scoreRef, {
            email: user.email,
            score: score,
            totalQuestions: arr.length
        })
        .then(() => {
            console.log("Score saved successfully!");
        })
        .catch((error) => {
            console.log("Score save error:", error);
        });

    } else {

        console.log("User is not logged in");

    }
}

// START QUIZ 

function startQuiz() {

    var card = document.getElementById("QuizApp");

    card.className = "result-page";

    var quesNo = count + 1;

    var progress = (quesNo / arr.length) * 100;

    card.innerHTML = `
    
    <div class="container home d-flex justify-content-center align-items-center">

        <div class="card text-start bg-transparent border-0 p-4 quiz-card2">

            <div class="card-body">

                <div class="d-flex justify-content-between align-items-center">

                    <h5 class="card-title fw-bold">
                        QUIZ MASTER
                    </h5>

                    <h6 class="card-title score" id="quizScore">
                        Score : ${score}
                    </h6>

                </div>           
              
                <h4 class="card-title head mt-5 mb-4" id="quizQuestion">
                    Question ${quesNo} of ${arr.length}
                </h4>

                <div class="progress mt-3" style="height: 8px;">

                    <div 
                        class="progress-bar bg-primary" 
                        style="width: ${progress}%;"
                    ></div>

                </div>

                <p class="card-text mt-4 text-dark ques">

                    <em>
                        <i class="fa-solid fa-circle dots me-3"></i>

                        <b>${arr[count].Question1}</b>
                    </em>

                </p>

                <div 
                    class="answer-option mt-3" 
                    onclick="checkAnswer('${arr[count].Option1}')"
                >
                    <span>A</span>
                    <p>${arr[count].Option1}</p>
                </div>

                <div 
                    class="answer-option" 
                    onclick="checkAnswer('${arr[count].Option2}')"
                >
                    <span>B</span>
                    <p>${arr[count].Option2}</p>
                </div>

                <div 
                    class="answer-option" 
                    onclick="checkAnswer('${arr[count].Option3}')"
                >
                    <span>C</span>
                    <p>${arr[count].Option3}</p>
                </div>

                <div 
                    class="answer-option" 
                    onclick="checkAnswer('${arr[count].Option4}')"
                >
                    <span>D</span>
                    <p>${arr[count].Option4}</p>
                </div>

                <a 
                    href="#" 
                    class="btn btn-primary mt-3 start-btn" 
                    onclick="OnNext()" 
                    id="quizSubmit"
                >
                    Next Question

                    <i class="fa-solid fa-arrow-right ms-2"></i>
                </a>

            </div>

        </div>

    </div>
    `;
}


startQuiz();


// NEXT QUESTION 

function OnNext() {

    if (!answered) {
        return;
    }

    count++;

    if (count < arr.length) {

        answered = false;

        startQuiz();

    } 
    else {

        showResult();

    }
}


// CHECK ANSWER 

function checkAnswer(selectAns) {

    if (answered) {
        return;
    }

    answered = true;

    if (selectAns === arr[count].correct) {

        score++;

    }

    document.querySelector(".score").innerHTML =
        `Score : ${score}`;
}


// SHOW RESULT 

function showResult() {

    var card = document.getElementById("QuizApp");

    card.className = "result-page";


    var message;
    var messageColor;


    if (score === 0) {

        message = "Fail";
        messageColor = "red";

    }

    else if (score >= 8) {

        message = "Excellent!";
        messageColor = "green";

    }

    else if (score >= 5) {

        message = "Good Job!";
        messageColor = "blue";

    }

    else {

        message = "Need more learn";
        messageColor = "orange";

    }


    card.innerHTML = `
    
    <div class="container home d-flex justify-content-center align-items-center">

        <div class="card text-center bg-transparent border-0 p-4 quiz-card">

            <div class="card-body">

                <div class="quiz-icon mb-3">

                    <i class="fa-solid fa-brain"></i>

                </div>

                <h2 class="card-title head">
                    YOUR SCORE
                </h2>

                <p class="card-text mt-3 text-dark score result">

                    <b>${score} / ${arr.length}</b>

                </p>

                <p class="card-text mt-3 text-dark result2">

                    <em style="color: ${messageColor};">
                        ${message}
                    </em>

                </p>

                <a 
                    href="index.html" 
                    class="btn btn-primary mt-3 start-btn"
                >

                    Back to Home

                    <i class="fa-solid fa-arrow-right ms-2"></i>

                </a>

            </div>

        </div>

    </div>
    `

        saveScore(score);

}


// MAKE FUNCTIONS AVAILABLE TO HTML 

window.checkAnswer = checkAnswer;
window.OnNext = OnNext;
