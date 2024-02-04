import { db } from "./api/firebase.js";
import { getDoc, updateDoc, arrayRemove, doc, increment } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

document.addEventListener("DOMContentLoaded", async function() {
    if (!sessionStorage.getItem("username")) {
        window.location.href = "index.html";
        alert("You are not signed in! Sign in before visiting your rewards.");
    }
    const username = sessionStorage.getItem("username");

    // URLs
    const shopDBURL = "https://assets.ethanchew.com/main.json";

    // HTML Elements
    const noItemsContainer = document.getElementById("no-items-container");
    const container = document.getElementById("items-container");
    const checkoutTitle = document.getElementById("checkout-title");
    const checkoutTotal = document.getElementById("checkout-total");
    const checkoutButton = document.getElementById("checkout-btn");
    
    // Helper Function to update final checkout price
    function updateCheckoutInfo(userCart) {
        /// Update Total Cost
        let total = 0.0;
        let totalQuantity = 0;
        for (let i = 0; i < userCart.length; i++) {
            total += Number(userCart[i].quantity) * userCart[i].pricePerQuantity;
            totalQuantity += Number(userCart[i].quantity);
        }
        checkoutTotal.innerText = `S$${parseFloat(total).toFixed(2)}`;

        // Update Checkout TItle
        checkoutTitle.innerText = `Checkout (${totalQuantity ? totalQuantity : 0} item${totalQuantity == 1 ? "" : "s"})`;
    }

    // Retrieve User's Cart from Database
    const getUserResponse = await getDoc(doc(db, "users", username));
    if (!getUserResponse.exists()) {
        alert("User does not exist!");
        window.location.href = "signin.html";
    }
    let userData = getUserResponse.data();
    let userCart = userData.cart;

    // Check if there are items with Quantity > 0 in the Cart
    let numOfValidItems = 0;
    for (let i = 0; i < userCart.length; i++) {
        if (parseInt(userCart[i].quantity) > 0) {
            numOfValidItems += 1;
        }
    }
    if (numOfValidItems > 0) {
        noItemsContainer.classList.add("hidden"); // Hide section displaying no items
        checkoutButton.disabled = false;
    }
    
    /// Display Items in the Cart
    let cartItems = [];
    if (userCart.length > 0) {
        // Grab Cart Items from API
        /// Query API for Items
        const getItemsResponse = await fetch(shopDBURL);
        const shopItems = await getItemsResponse.json();

        for (let i = 0; i < userCart.length; i++) {
            if (!cartItems.find((item) => item.id == userCart[i].itemid)) {
                cartItems.push(shopItems.find((item) => item.id == userCart[i].itemid));
            }
        }
        
        /// Display Cart on Screen
        for (let i = 0; i < cartItems.length; i++) {
            /// Get the price based on discount
            let itemPrice = "";
            for (let j = 0; j < userCart.length; j++) {
                if (userCart[j].itemid == cartItems[i].id) {
                    // Product is in the cart, check discount
                    if (userCart[j].discount == null) {
                        // Null discount, display '???'
                        itemPrice = "S$???";
                    } else {
                        // Set price based on price - discount
                        itemPrice = `S$${userCart[j].pricePerQuantity} (${userCart[j].discount >= 0 ? "discounted" : "marked-up"})`;
                    }
                    break;
                }
            }

            if (!(userCart[i].quantity == 0 || userCart[i].quantity == null)) {
                container.innerHTML += `<div id="${`container-${i}`}" class="bg-offwhite w-full p-5 flex flex-col md:flex-row gap-5 md:gap-10">
                    <img src="${cartItems[i].images[0]}" alt=${cartItems[i].title} class="w-1/3 md:w-1/5" />
                    <div class="flex flex-col">
                        <p class="font-semibold text-2xl md:text-3xl">${cartItems[i].title}</p>
                        <p class="text-xl md:text-2xl mb-2 md:mb-0">${itemPrice}</p>
                        <div class="mt-auto flex flex-row gap-5">
                            <label class="px-3 md:px-5 py-2 bg-black text-white">
                                Quantity: 
                                <input 
                                    id="quantity-${i}"
                                    type="number" value="${userCart.find((item) => item.itemid == cartItems[i].id).quantity}" min="1" max="50"
                                    class="ml-2 bg-black text-white w-1/3"
                                >
                            </label>
                            <button id="remove-${i}" class="px-3 md:px-5 py-2 bg-red-700 hover:bg-red-800 text-white">Remove</button>
                        </div>
                    </div>
                </div>`;
            }
        }

        // Check for Updates to Item
        for (let i = 0; i< cartItems.length; i++) {
            // Check for Remove
            document.getElementById(`remove-${i}`).addEventListener("click", async function () {
                document.getElementById(`container-${i}`).classList.add("hidden");

                // Remove Item from Cart in Database
                try {
                    await updateDoc(doc(db, "users", username), {
                        cart: arrayRemove(userCart[i])
                    });
                } catch (err) {
                    console.error(err);
                }
            });

            // Check for Quantity Changes
            document.getElementById(`quantity-${i}`).addEventListener("input", async function () {
                const newQuantity = document.getElementById(`quantity-${i}`).value;

                // Check if Item already exists in the cart
                const existingCartIndex = userCart.findIndex(item => item.itemid == userCart[i].itemid);
                if (existingCartIndex !== -1 && newQuantity != "") {
                    userCart[existingCartIndex].quantity = newQuantity;

                    // Update Database
                    try {
                        await updateDoc(doc(db, "users", username), {
                            cart: userCart
                        });
                    } catch (err) {
                        console.error(err);
                    }

                    updateCheckoutInfo(userCart);
                }
            });
        }

        updateCheckoutInfo(userCart);
    }

    // Allow User to Checkout
    checkoutButton.addEventListener("click", async function () {
        // Populate Checkout Popup with Data
        document.getElementById("receipt-user").innerText = userData.name;
        /// Get and Formate Date
        const formattedCurrentDate = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          }).format(new Date());
        document.getElementById("receipt-date").innerText = formattedCurrentDate;
        /// Display the Products in the Cart
        let totalCost = 0;
        let userPoints = 0;
        document.getElementById("receipt-prodcontainer").innerHTML = "";
        for (let i = 0; i < userCart.length; i++) {
            if (!(userCart[i].quantity == 0 || userCart[i].quantity == null)) {
                let prodQuantity = userCart.find((item) => item.itemid == cartItems[i].id).quantity;
                totalCost += userCart[i].pricePerQuantity * parseInt(prodQuantity);
                document.getElementById("receipt-prodcontainer").innerHTML += `<div class="flex flex-row items-center gap-6">
                    <p class="text-4xl">${i + 1}</p>
                    <div class="truncate">
                        <p class="font-semibold text-2xl truncate">${cartItems[i].title}</p>
                        <p><span class="font-semibold">Quantity:</span> <span id="receipt-prod1-quantity">${prodQuantity}</span></p>
                        <p><span class="font-semibold">Subtotal:</span> $<span id="receipt-prod1-price">${userCart[i].pricePerQuantity * parseInt(prodQuantity)}</span></p>
                    </div>
                </div>`;
            }
        }
        document.getElementById("receipt-finalcost").innerText = totalCost;
        /// Calculate and Display Points
        userPoints = Math.floor(totalCost / 5);
        document.getElementById("receipt-points").innerText = userPoints;

        // Finalise Payment Button
        document.getElementById("confirm-payment-btn").addEventListener("click", async function () {
            // Clear Cart, Update Database
            await updateDoc(doc(db, "users", username), {
                cart: [],
                currentCartHistory: [],
                points: increment(userPoints)
            });

            alert("Order Placed! Thank you for shopping with UnifiedGoods!");
            document.getElementById("checkout-receipt").classList.add("hidden");
        });

        // Close Receipt Button
        document.getElementById("close-receipt-btn").addEventListener("click", async function () {
            document.getElementById("checkout-receipt").classList.add("hidden");
        });

        // Show Receipt
        document.getElementById("checkout-receipt").classList.remove("hidden");
    });
});