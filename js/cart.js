import { db } from "./api/firebase.js";
import { getDoc, updateDoc, doc, increment } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

document.addEventListener("DOMContentLoaded", async function() {
    if (!sessionStorage.getItem("username")) {
        window.location.href = "index.html";
        alert("You are not signed in! Sign in before visiting your rewards.");
    }
    const username = sessionStorage.getItem("username");

    // URLs
    const shopDBURL = "https://assets.ethanchew.com/main.json";

    // HTML Elements
    const container = document.getElementById("items-container");
    const checkoutTitle = document.getElementById("checkout-title");
    const checkoutTotal = document.getElementById("checkout-total");
    const checkoutButton = document.getElementById("checkout-btn");
    
    // Helper Function to update final checkout price
    function updateCheckoutInfo(cartFromDatabase) {
        /// Update Total Cost
        let total = 0.0;
        let totalQuantity = 0;
        for (let i = 0; i < cartFromDatabase.length; i++) {
            total += Number(cartFromDatabase[i].quantity) * cartFromDatabase[i].pricePerQuantity;
            totalQuantity += Number(cartFromDatabase[i].quantity);
        }
        checkoutTotal.innerText = `S$${parseFloat(total).toFixed(2)}`;

        // Update Checkout TItle
        checkoutTitle.innerText = `Checkout (${totalQuantity ? totalQuantity : 0} item${totalQuantity == 1 ? "" : "s"})`;
    }

    // Helper Function to Disable Checkout
    function checkDisableCheckout(numOfValidItems) {
        if (numOfValidItems > 0) {
            document.getElementById("no-items-container").classList.add("hidden"); // Hide section displaying no items
            document.getElementById("checkout-btn").disabled = false;
        } else {
            document.getElementById("no-items-container").classList.remove("hidden"); // Hide section displaying no items
            document.getElementById("checkout-btn").disabled = true;
        }
    }

    // Retrieve User's Cart from Database
    const getUserResponse = await getDoc(doc(db, "users", username));
    if (!getUserResponse.exists()) {
        alert("User does not exist!");
        window.location.href = "signin.html";
    }
    let userData = getUserResponse.data();
    let cartFromDatabase = userData.cart;

    // Check if there are items with Quantity > 0 in the Cart
    let numOfValidItems = 0;
    for (let i = 0; i < cartFromDatabase.length; i++) {
        if (parseInt(cartFromDatabase[i].quantity) > 0) {
            numOfValidItems += 1;
        }
    }
    
    // Check if checkout is disabled
    checkDisableCheckout(numOfValidItems);
    
    /// Display Items in the Cart
    let cartItemsDetail = [];
    if (cartFromDatabase.length > 0) {
        // Grab Cart Items from API
        /// Query API for Items
        const getItemsResponse = await fetch(shopDBURL);
        const shopItems = await getItemsResponse.json();

        for (let i = 0; i < cartFromDatabase.length; i++) {
            if (!cartItemsDetail.find((item) => item.id == cartFromDatabase[i].itemid)) {
                cartItemsDetail.push(shopItems.find((item) => item.id == cartFromDatabase[i].itemid));
            }
        }
        
        /// Display Cart on Screen
        for (let i = 0; i < cartItemsDetail.length; i++) {
            /// Get the price based on discount
            let itemPrice = "";
            for (let j = 0; j < cartFromDatabase.length; j++) {
                if (cartFromDatabase[j].itemid == cartItemsDetail[i].id) {
                    // Product is in the cart, check discount
                    if (cartFromDatabase[j].discount == null) {
                        // Null discount, display '???'
                        itemPrice = "S$???";
                    } else {
                        // Set price based on price - discount
                        itemPrice = `S$${cartFromDatabase[j].pricePerQuantity.toFixed(2)} (${cartFromDatabase[j].discount >= 0 ? "discounted" : "marked-up"})`;
                    }
                    break;
                }
            }

            if (!(cartFromDatabase[i].quantity == 0 || cartFromDatabase[i].quantity == null)) {
                container.innerHTML += `<div id="${`container-${cartFromDatabase[i].itemid}`}" class="bg-offwhite w-full p-5 flex flex-col md:flex-row gap-5 md:gap-10">
                    <img src="${cartItemsDetail[i].images[0]}" alt=${cartItemsDetail[i].title} class="w-1/3 md:w-1/5 object-contain" />
                    <div class="flex flex-col">
                        <p class="font-semibold text-2xl md:text-2xl xl:text-3xl">${cartItemsDetail[i].title}</p>
                        <p class="text-xl md:text-xl xl:text-2xl mb-2">${itemPrice}</p>
                        <div class="mt-auto flex flex-row gap-5">
                            <label class="px-3 md:px-5 py-2 bg-black text-white">
                                Quantity: 
                                <input 
                                    id="quantity-${cartFromDatabase[i].itemid}"
                                    type="number" value="${cartFromDatabase.find((item) => item.itemid == cartItemsDetail[i].id).quantity}" min="1" max="50"
                                    class="ml-2 bg-black text-white w-1/3"
                                >
                            </label>
                            <button id="remove-${cartFromDatabase[i].itemid}" class="px-3 md:px-5 py-2 bg-red-700 hover:bg-red-800 text-white">Remove</button>
                        </div>
                    </div>
                </div>`;
            }
        }

        // Check for Updates to Item
        for (let i = 0; i < cartFromDatabase.length; i++) {
            if (cartFromDatabase[i].quantity !== null) {
                // Currently Being Displayed
                /// Check for Remove
                document.getElementById(`remove-${cartFromDatabase[i].itemid}`).addEventListener("click", async function () {
                    document.getElementById(`container-${cartFromDatabase[i].itemid}`).remove();
                    // Remove Item from Cart in Database
                    try {
                        cartFromDatabase[i].quantity = null;
                        await updateDoc(doc(db, "users", username), {
                            cart: cartFromDatabase
                        });

                        numOfValidItems -= 1;

                        // Update Checkout Section Information
                        updateCheckoutInfo(cartFromDatabase);
                        checkDisableCheckout(numOfValidItems);
                    } catch (err) {
                        console.error(err);
                    }
                });
    
                /// Check for Quantity Changes
                document.getElementById(`quantity-${cartFromDatabase[i].itemid}`).addEventListener("input", async function () {
                    const newQuantity = document.getElementById(`quantity-${cartFromDatabase[i].itemid}`).value;
    
                    // Check if Item already exists in the cart
                    const existingCartIndex = cartFromDatabase.findIndex(item => item.itemid == cartFromDatabase[i].itemid);
                    if (existingCartIndex !== -1 && newQuantity != "") {
                        cartFromDatabase[existingCartIndex].quantity = newQuantity;
    
                        // Update Database
                        try {
                            await updateDoc(doc(db, "users", username), {
                                cart: cartFromDatabase
                            });
                        } catch (err) {
                            console.error(err);
                        }
    
                        updateCheckoutInfo(cartFromDatabase);
                    }
                });
            }
        }

        updateCheckoutInfo(cartFromDatabase);
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
        let itemIndex = 1;
        for (let i = 0; i < cartFromDatabase.length; i++) {
            if (!(cartFromDatabase[i].quantity == 0 || cartFromDatabase[i].quantity == null)) {
                let prodQuantity = cartFromDatabase.find((item) => item.itemid == cartItemsDetail[i].id).quantity;
                totalCost += cartFromDatabase[i].pricePerQuantity * parseInt(prodQuantity);
                document.getElementById("receipt-prodcontainer").innerHTML += `<div class="flex flex-row items-center gap-6">
                    <p class="text-4xl">${itemIndex}</p>
                    <div class="truncate">
                        <p class="font-semibold text-2xl truncate">${cartItemsDetail[i].title}</p>
                        <p><span class="font-semibold">Quantity:</span> <span id="receipt-prod1-quantity">${prodQuantity}</span></p>
                        <p><span class="font-semibold">Subtotal:</span> $<span id="receipt-prod1-price">${parseFloat(cartFromDatabase[i].pricePerQuantity * parseInt(prodQuantity)).toFixed(2)}</span></p>
                    </div>
                </div>`;
                itemIndex += 1;
            }
        }
        document.getElementById("receipt-finalcost").innerText = parseFloat(totalCost).toFixed(2);
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
            location.reload()
        });

        // Close Receipt Button
        document.getElementById("close-receipt-btn").addEventListener("click", async function () {
            document.getElementById("checkout-receipt").classList.add("hidden");
        });

        // Show Receipt
        document.getElementById("checkout-receipt").classList.remove("hidden");
    });
});