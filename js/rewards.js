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
    const userTierLbl = document.getElementById("user-tier")
    const tierProgressBar = document.getElementById("tier-progress")

    // Get User data from Firebase
    const getUserResponse = await getDoc(doc(db, "users", username))
    let user
    if (!getUserResponse.exists()) {
        alert("User does not exist!")
        window.location.href = "signin.html"
    } else {
        user = getUserResponse.data()
    }

    // Get User's Tier
    let tier = ""
    let nextTier = null
    const tiers = [
        { tier: "Ordinary", minPts: 0 },
        { tier: "Bronze", minPts: 30 },
        { tier: "Silver", minPts: 100 },
        { tier: "Gold", minPts: 400 },
        { tier: "Platinum", minPts: 1000 }
    ]
    for (let i = tiers.length - 1; i >= 0; i--) {
        if (user.points >= tiers[i].minPts) {
          tier = tiers[i].tier
          
          if (i + 1 != tiers.length) {
              nextTier = tiers[i + 1]
          }
          break
        }
    }

    // Update HTML Elements based on User Data
    pointsLbl.innerText = user.points
    userTierLbl.innerText = tier
    tierProgressBar.style.width = `${(user.points / nextTier.minPts) * 100}%`
    if (nextTier == null) {
        nextTierLbl.innerText = "You are at the maximum tier!"
    } else {
        nextTierLbl.innerHTML = `Earn another <span class="text-black font-semibold">${nextTier.minPts - user.points} Points</span> to be <span class="text-black font-semibold">${nextTier.tier}</span> Member`
    }
})