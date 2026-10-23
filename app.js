
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyC0Iv-1cht36WBsOr9JTmHk_X7luMMsyqk",
    authDomain: "quiz-app23.firebaseapp.com",
    projectId: "quiz-app23",
    storageBucket: "quiz-app23.firebasestorage.app",
    messagingSenderId: "894235984274",
    appId: "1:894235984274:web:5731893d68eabaa712814b",
    measurementId: "G-W130473EH7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log("User already logged in:", user.email);

        window.location.href = "startQuiz.html";
    }

});

// SIGN UP

const signUpBtn = document.getElementById("signUpBtn");

if (signUpBtn) {

    signUpBtn.addEventListener("click", function () {

        const email = document.getElementById("email").value;
        const password = document.getElementById("pswd").value;

        console.log("Signup button clicked");

        createUserWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {

                console.log("USER CREATED:", userCredential.user);

                alert("Account Created Successfully!");
                
                window.location.href = "startQuiz.html";

            })

            .catch((error) => {

                console.log("ERROR:", error.code);
                console.log("MESSAGE:", error.message);

                alert(error.message);

            });

    });

}


//  LOGIN 

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        const email = document.getElementById("email").value;
        const password = document.getElementById("pswd").value;

        signInWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {

                console.log("LOGIN SUCCESS:", userCredential.user);

                alert("Login Successfully!");

                window.location.href = "startQuiz.html";

            })

            .catch((error) => {

                console.log("ERROR:", error.code);
                console.log("MESSAGE:", error.message);

                alert(error.message);

            });

    });

}







