import { db } from "./api/firebase.js"
import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js'

document.addEventListener("DOMContentLoaded", function() {
    const loaderAnim = document.getElementById("loader")

    // If user is already signed in, just redirect to index.html
    if (sessionStorage.getItem("username")) {
        window.location.href = "index.html"
    }

    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault()

        const errorField = document.getElementById("err-msg")

        // Get User Input
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        // Disable Login Button, start loader while getting data
        document.getElementById("submit-login").disabled = true;
        loaderAnim.classList.remove("hidden")
        
        // Query Firebase Database to get data
        getDoc(doc(db, "users", username))    
            .then((response) => {
                if (response.exists()) {
                    const userObj = response.data()

                    if (userObj.password === password) {
                        sessionStorage.setItem("username", username)
                        window.location.href = "/"
                    } else {
                        errorField.innerText = "Incorrect Password!"
                    }
                } else {
                    errorField.innerText = "Error: No Account with username found!"
                }
            })
        
        // Enable Login Button, start loader while getting data
        document.getElementById("submit-login").disabled = false;
        loaderAnim.classList.add("hidden")

    })
})