import { db } from "./api/firebase.js";
import { getDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

document.addEventListener("DOMContentLoaded", async function () {
    // Redirect User to Sign In if not logged in
    if (!sessionStorage.getItem("username")) {
        window.location.href = "signin.html";
    }
    const username = sessionStorage.getItem("username");

    // Get User Data from Database
    const getUserResponse = await getDoc(doc(db, "users", username));
    const user = getUserResponse.data();

    // Update Profile HTML
    document.getElementById("users-name-lbl").innerText = user.name;
    document.getElementById("username").innerText = user.username;
    document.getElementById("email").innerText = user.email;

    // Sign Out Button
    document.getElementById("signout-btn").addEventListener("click", function (e) {
        e.preventDefault();
        
        sessionStorage.removeItem("username");
        window.location.href = "index.html";
    });

    // Un-Hide the Profile Screen
    document.getElementById("profile-container").classList.remove("hidden");
});