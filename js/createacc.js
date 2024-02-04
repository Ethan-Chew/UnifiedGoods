import { db } from "./api/firebase.js";
import { getDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

document.addEventListener("DOMContentLoaded", async function () {  
    // If user is already signed in, just redirect to index.html
    if (sessionStorage.getItem("username")) {
        window.location.href = "index.html";
    }

    // Wait for Form Creation onSubmit
    document.getElementById("create-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const errorField = document.getElementById("err-msg");

        // Get data from form
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        
        if (password !== confirmPassword) {
            errorField.innerText = "Error: Passwords must match!";
        } else {
            // Disable resubmit of create account
            document.getElementById("submit-create").disabled = true;

            // Check if Username already exists in the database
            const checkResponse = await getDoc(doc(db, "users", username));

            if (checkResponse.exists()) {
                errorField.innerText = "Error: An account with the same username already exists";
            } else {
                // Username doesn't exist, create user
                try {
                    await setDoc(doc(db, "users", username), {
                        name: firstName + lastName,
                        username: username,
                        email: email,
                        password: password,
                        cart: [],
                        currentCartHistory: [],
                        points: 0
                    });

                    sessionStorage.setItem("username", username);
                    window.location.href = "/";
                } catch (err) {
                    errorField.innerText = `Unknown Error! Error: ${err}`;
                }
            }
        }
    });
});