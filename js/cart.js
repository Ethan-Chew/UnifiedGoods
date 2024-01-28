import { db } from "./api/firebase.js"
import { getDoc, updateDoc, arrayRemove, doc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js'

document.addEventListener("DOMContentLoaded", async function() {
    if (!sessionStorage.getItem("username")) {
        window.location.href = "index.html"
        alert("You are not signed in! Sign in before visiting your rewards.")
    }
    const username = sessionStorage.getItem("username")

    // URLs
    const shopDBURL = "https://assets.ethanchew.com/main.json"

    // HTML Elements
    const noItemsContainer = document.getElementById("no-items-container")
    const container = document.getElementById("items-container")
    const checkoutTitle = document.getElementById("checkout-title")
    
    // Retrieve User's Cart from Database
    const getUserResponse = await getDoc(doc(db, "users", username))
    if (!getUserResponse.exists()) {
        alert("User does not exist!")
        window.location.href = "signin.html"
    }
    let cart = getUserResponse.data().cart
    
    /// Display Items in the Cart
    if (cart.length > 0) {
        noItemsContainer.classList.add("hidden") // Hide section displaying no items

        // Grab Cart Items from API
        let cartItems = []
        /// Query API for Items
        const getItemsResponse = await fetch(shopDBURL)
        const shopItems = await getItemsResponse.json()

        for (let i = 0; i < cart.length; i++) {
            if (!cartItems.find((item) => item.id == cart[i].itemid)) {
                cartItems.push(shopItems.find((item) => item.id == cart[i].itemid))
            }
        }

        
        /// Display Cart on Screen
        for (let i = 0; i < cartItems.length; i++) {
            /// Get the price based on discount
            let itemPrice = ""
            for (let j = 0; j < cart.length; j++) {
                if (cart[j].itemid == cartItems[i].id) {
                    // Product is in the cart, check discount
                    if (cart[j].discount == null) {
                        // Null discount, display '???'
                        itemPrice = "S$???"
                    } else {
                        // Set price based on price - discount
                        const discountAmt = cartItems[i].price * (cart[j].discount / 100)
                        itemPrice = `S$${cartItems[i].price - discountAmt} (${cart[j].discount >= 0 ? "discounted" : "marked-up"})`
                    }
                    break
                }
            }
            container.innerHTML += `<div id="${`container-${i}`}" class="bg-offwhite w-full p-5 flex flex-row gap-10">
                <img src="${cartItems[i].images[0]}" alt=${cartItems[i].title} class="w-1/5" />
                <div class="flex flex-col">
                    <p class="font-semibold text-3xl">${cartItems[i].title}</p>
                    <p class="text-2xl">${itemPrice}</p>
                    <div class="mt-auto flex flex-row gap-5">
                        <label class="px-5 py-2 bg-black text-white">
                            Quantity: 
                            <input 
                                id="quantity-${i}"
                                type="number" value="${cart.find((item) => item.itemid == cartItems[i].id).quantity}" min="1" max="50"
                                class="ml-2 bg-black text-white w-1/3"
                            >
                        </label>
                        <button id="remove-${i}" class="px-5 py-2 bg-red-700 hover:bg-red-800 text-white">Remove</button>
                    </div>
                </div>
            </div>`
        }

        // Check for Updates to Item
        for (let i = 0; i< cartItems.length; i++) {
            // Check for Remove
            document.getElementById(`remove-${i}`).addEventListener("click", async function () {
                document.getElementById(`container-${i}`).classList.add("hidden")

                // Remove Item from Cart in Database
                try {
                    const removeItemResponse = await updateDoc(doc(db, "users", username), {
                        cart: arrayRemove(cart[i])
                    })
                } catch (err) {
                    console.error(err)
                }
            })

            // Check for Quantity Changes
            document.getElementById(`quantity-${i}`).addEventListener("input", async function () {
                const newQuantity = document.getElementById(`quantity-${i}`).value

                // Check if Item already exists in the cart
                const existingCartIndex = cart.findIndex(item => item.itemid == cart[i].itemid);
                if (existingCartIndex !== -1 && newQuantity != "") {
                    cart[existingCartIndex].quantity = newQuantity

                    // Update Database
                    try {
                        const updateCartResponse = await updateDoc(doc(db, "users", username), {
                            cart: cart
                        })
                    } catch (err) {
                        console.error(err)
                    }
                }
            })
        }
    }

    /// Update Checkout Details
    checkoutTitle.innerText = `Checkout (${cart.length ? cart.length : 0} item${cart.length == 1 ? "" : "s"})`
})