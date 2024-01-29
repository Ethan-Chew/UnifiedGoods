import { db } from "./api/firebase.js"
import { getDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js'

document.addEventListener("DOMContentLoaded", async function () {
    // Redirect User to Sign In if not logged in
    if (!sessionStorage.getItem("username")) {
        window.location.href = "signin.html"
    }

    // HTML Elements
    const itemTitle = document.getElementById("item-title")
    const itemDescDT = document.getElementById("item-desc-dt")
    const itemDescMobile = document.getElementById("item-desc-mobile")
    const itemImg = document.getElementById("product-img")

    // Get Query Parameters (Product ID)
    const urlParameters = new URLSearchParams(window.location.search)
    const productID = Number(urlParameters.get("id"))

    // Fetch Data and Update Screen
    const shopURL = "https://assets.ethanchew.com/main.json"
    const fetchProductsResponse = await fetch(shopURL)
    const products = await fetchProductsResponse.json()

    /// Find Product in List of Products
    let product
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productID) {
            product = products[i]
            break
        }
    }

    /// Update Screen with Data
    itemTitle.innerText = product.title
    itemDescDT.innerText = product.description
    itemDescMobile.innerText = product.description
    itemImg.src = product.images[0]

    // Get Tries Indicator
    let triesRemaining = 3
    let triesDisplay = []
    for (let i = 1; i < 4; i++) {
        triesDisplay.push(document.getElementById(`try-${i}`))
    }

    // Read the User Input
    document.getElementById("submit-guess-btn").addEventListener("click", async function (e) {
        e.preventDefault()
        document.getElementById("err-msg").innerText = "" // Reset Error Message

        // Verify User Answer
        const userGuess = document.getElementById("guess-price").value
        if (userGuess == "") {
            document.getElementById("err-msg").innerText = "Enter a valid guess!"
        } else {
            

            // Edit Tries Remaining
            triesRemaining -= 1 // Remove one try
            triesDisplay[triesRemaining].classList.remove("bg-blue-300")
            triesDisplay[triesRemaining].classList.add("bg-gray-600")
            triesDisplay[triesRemaining].classList.add("text-white")
        }
    })
})