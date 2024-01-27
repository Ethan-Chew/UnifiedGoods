import { db } from "./api/firebase.js"
import { getDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js'

document.addEventListener("DOMContentLoaded", async function() {
    // Query API and Update Data
    const urlParameters = new URLSearchParams(window.location.search)
    const productID = Number(urlParameters.get("id"))
    const goBack = urlParameters.get("from")

    // HTML Elements
    const smallImgsDiv = document.getElementById("small-imgs")
    const productImage = document.getElementById("product-img")
    const addCartBtn = document.getElementById("add-cart-btn")
    const addCartLabel = document.getElementById("add-cart-lbl")
    const loaderAnim = document.getElementById("loader")

    const backBtn = document.getElementById("back-btn")

    // Update Back Button Redirect
    if (goBack == "search") {
        backBtn.src = "/search.html"
        backBtn.innerText = "< Back to Search"
    }

    // Get Data from API
    const shopURL = "https://assets.ethanchew.com/main.json"
    loaderAnim.classList.remove("hidden")
    const apiResponse = await fetch(shopURL)
    loaderAnim.classList.add("hidden")
    const apiData = await apiResponse.json()
    
    // Filter to only show chosen product
    let chosenProduct
    for (let i = 0; i < apiData.length; i++) {
        if (apiData[i].id === productID) {
            chosenProduct = apiData[i]
        }
    }

    // Update Data in HTML
    productImage.src = chosenProduct.images[0]
    for (let i = 0; i < chosenProduct.images.length; i++) {
        smallImgsDiv.innerHTML += `<img id="simg${i}" class="w-1/6 hover:opacity-85 cursor-pointer" alt="img${i+1}" src="${chosenProduct.images[i]}">`
    }
    document.getElementById("product-title").innerText = chosenProduct.title
    document.getElementById("product-desc").innerText = chosenProduct.description
    
    // Switch Images
    for (let i = 0; i < chosenProduct.images.length; i++) {
        document.getElementById(`simg${i}`).addEventListener("click", function () {
            productImage.src = document.getElementById(`simg${i}`).src
        })
    }

    // Check Sign In on Add to Cart
    addCartBtn.addEventListener("click", async function () {
        const username = sessionStorage.getItem("username")

        // Show Sign In overlay if user not signed in
        if (!username) {
            document.getElementById("overlay").classList.remove("hidden")
        } else {
            // Disable Add to Cart Button, start loading
            addCartBtn.disabled = true
            loaderAnim.classList.remove("hidden")

            const quantity = document.getElementById("quantity-entry").value
            const item = {
                "itemid": productID,
                "quantity": quantity,
                "discount": 0 // To upadte
            }

            // Get user's existing cart
            let userCart = []
            const getUserResponse = await getDoc(doc(db, "users", username))
            if (!getUserResponse.exists()) {
                alert("User does not exist!")
                window.location.href = "signin.html"
            } else {
                const userObj = getUserResponse.data()
                userCart = userObj.cart
            }
            
            // Check if Item already exists in the cart
            const existingCartIndex = userCart.findIndex(item => item.itemid == productID);
            if (existingCartIndex === -1) {
                // Item does not exist in cart
                userCart.push(item)
            } else {
                // Item exists in the cart
                userCart[existingCartIndex].quantity = quantity
            }

            // Update user's cart
            try {
                const updateCartResponse = await updateDoc(doc(db, "users", username), {
                    cart: userCart
                })

                // Stop Loading
                loaderAnim.classList.add("hidden")

                // Show Lottie Animation (hide after 1s)
                const lottieSuccess = document.getElementById("add-success")
                addCartLabel.classList.add("hidden")
                lottieSuccess.classList.remove("hidden")
                lottieSuccess.play()
                setTimeout(() => {
                    addCartLabel.classList.remove("hidden")
                    lottieSuccess.classList.add("hidden")
                }, 2000)
            } catch (err) {
                console.error(err)
            }

            // Enable Add to Cart button
            addCartBtn.disabled = false
        }
    })
})