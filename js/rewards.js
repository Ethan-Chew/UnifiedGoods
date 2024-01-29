import { db } from "./api/firebase.js"
import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js'

document.addEventListener("DOMContentLoaded", async function() {
    if (!sessionStorage.getItem("username")) {
        window.location.href = "index.html"
        alert("You are not signed in! Sign in before visiting your rewards.")
    }
    const username = sessionStorage.getItem("username")

    // HTML Elements
    const pointsLbl = document.getElementById("points-label")
    const nextTierLbl = document.getElementById("points-next-label")

    // Get User data from Firebase
    const getUserResponse = await getDoc(doc(db, "users", username))
    let user
    if (!getUserResponse.exists()) {
        alert("User does not exist!")
        window.location.href = "signin.html"
    } else {
        user = getUserResponse.data()
    }

    // Update HTML Elements based on User Data
    pointsLbl.innerText = user.points
})