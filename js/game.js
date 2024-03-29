import { db } from "./api/firebase.js";
import { getDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

document.addEventListener("DOMContentLoaded", async function () {
    // Redirect User to Sign In if not logged in
    if (!sessionStorage.getItem("username")) {
        window.location.href = "signin.html";
    }

    // HTML Elements
    const itemTitle = document.getElementById("item-title");
    const itemDescDT = document.getElementById("item-desc-dt");
    const itemDescMobile = document.getElementById("item-desc-mobile");
    const itemImg = document.getElementById("product-img");

    // Get Query Parameters (Product ID)
    const urlParameters = new URLSearchParams(window.location.search);
    const productID = Number(urlParameters.get("id"));
    const username = sessionStorage.getItem("username");

    // Fetch Data and Update Screen
    const shopURL = "https://assets.ethanchew.com/main.json";
    const fetchProductsResponse = await fetch(shopURL);
    const products = await fetchProductsResponse.json();

    /// Find Product in List of Products
    let product;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productID) {
            product = products[i];
            break;
        }
    }

    /// Update Screen with Data
    itemTitle.innerText = product.title;
    itemDescDT.innerText = product.description;
    itemDescMobile.innerText = product.description;
    itemImg.src = product.images[0];

    // Get Tries Indicator
    let triesRemaining = 3;
    let triesDisplay = [];
    for (let i = 1; i < 4; i++) {
        triesDisplay.push(document.getElementById(`try-${i}`));
    }

    let discount = 0;
    let highestDiscount = 0;
    let markup = false;
    let finalPrice = 0;
    let stopGame = false;

    // Read the User Input
    document.getElementById("submit-guess-btn").addEventListener("click", async function (e) {
        e.preventDefault();
        document.getElementById("err-msg").innerText = ""; // Reset Error Message

        // Verify User Answer
        const userGuess = parseFloat(document.getElementById("guess-price").value);

        // Calculate Price Difference and Percentage Difference between User Guess and Product Price (± 20%, ± 50%, > 50%)
        const priceDifference = Math.abs(userGuess - product.price);
        const priceDifferencePercentage = priceDifference / product.price * 100;
        // Check if user entered a valid guess (not a number, not negative, not 0)
        if (isNaN(userGuess)) {
            document.getElementById("err-msg").innerText = "Enter a valid guess!";
        } else if (userGuess <= 0) {
            document.getElementById("err-msg").innerText = "Enter a positive price guess!";
        } else {
            // Guessed price is not the product price
            if (userGuess != product.price) {
                if (priceDifferencePercentage <= 20) {
                    // Gussed price ± 20% of Product Price
                    document.getElementById("err-msg").innerText = "You're close!";
                    discount = 5 + (priceDifferencePercentage * 0.5);
                } else if (priceDifferencePercentage <= 50) {
                    // Gussed price ± 50% of Product Price
                    document.getElementById("err-msg").innerText = "You're close!";
                    discount =  priceDifferencePercentage * 0.1;
                } else {
                    // Gussed price > 50% of Product Price
                    document.getElementById("err-msg").innerText = "You're way off!";
                    const randomNumber = Math.floor(Math.random() * 100);
                    if (randomNumber <= 20) {
                        markup = true;
                    }
                }
                // Edit Tries Remaining
                triesRemaining -= 1; // Remove one try
                triesDisplay[triesRemaining].classList.remove("bg-blue-300");
                triesDisplay[triesRemaining].classList.add("bg-gray-600");
                triesDisplay[triesRemaining].classList.add("text-white");
            }else{
                // User Gussed Correct Price
                discount = 40;
                document.getElementById("err-msg").innerText = "Congratulations! You have gussed the correct price tag!";
                document.getElementById("timer").innerHTML = `<p class='font-semibold'>Congratulations!</p>`;
                stopGame = true;
            }

            if (triesRemaining == 0) {
                // User ran out of tries
                document.getElementById("err-msg").innerText += "\tYou ran out of tries!";
                document.getElementById("timer").innerHTML = `<p class='font-semibold'>Ran out of tries!</p>`;
                stopGame = true;
            }

            // Store user's closest guessed price
            if (discount > highestDiscount) {
                highestDiscount = discount;
            }
        }

        // Check for user's closest guess discount or markup
        if (highestDiscount > 0){
            // Calculate discount according user's closest gussed price
            finalPrice = product.price - (product.price * (highestDiscount / 100));
            finalPrice = Math.round(finalPrice * 10) / 10;
        } else if (highestDiscount == 0 && markup == true) {
            // Calculate final price with markup
            finalPrice = product.price * 1.1;
            finalPrice = Math.round(finalPrice * 10) / 10;
            discount = -10;
        } else if (highestDiscount == 0 && markup == false) {
            // Calculate final price without markup
            finalPrice = product.price;
            discount = 0;
        }

        if (stopGame == true) {
            // Stop the game
            endGame();
        }
    });

    // Set the initial time to 100 seconds
    let timeRemaining = 100;

    // Update the countdown timer every second
    const countdownTimer = setInterval(() => {
        timeRemaining -= 1;
        document.getElementById("countdown").innerText = timeRemaining + "s";

        // Check if the time has run out
        if (timeRemaining <= 0) {
            clearInterval(countdownTimer);
            document.getElementById("countdown").innerText = "Time's Up!";
            endGame();
        }
    }, 1000);

    // Function to stop the game
    async function endGame() {
        // Stop the countdown timer
        clearInterval(countdownTimer);
        // Disable the guess button
        document.getElementById("submit-guess-btn").disabled = true;
        document.getElementById("submit-guess-btn").classList.remove("bg-btnblue");
        document.getElementById("submit-guess-btn").classList.remove("hover:bg-btn2blue");
        document.getElementById("submit-guess-btn").classList.add("bg-gray-600");
        // Disable the textbox
        document.getElementById("guess-price").disabled = true;
    
        // Get user's existing cart
        let userCart = [];
        let userCartHistory = [];
        const getUserResponse = await getDoc(doc(db, "users", username));
        if (!getUserResponse.exists()) {
            alert("User does not exist!");
            window.location.href = "signin.html";
        } else {
            const userObj = getUserResponse.data();
            userCart = userObj.cart;
            userCartHistory = userObj.currentCartHistory;
        }
        if (discount != null && discount > 0) {
            discount = highestDiscount;
        }
        // Add chosen product to user's cart
        const item = {
            "itemid": productID,
            "quantity": null,
            "discount": discount,
            "pricePerQuantity": 0
        };
    
        // Check if Item already exists in the cart
        const existingCartIndex = userCart.findIndex(item => item.itemid == productID);
        if (existingCartIndex === -1) {
            // Item does not exist in cart
            userCart.push(item);
            userCartHistory.push(item.itemid);
        }
    
        // Update user's cart
        try {
            const discountAmt = product.price * (item.discount / 100);
            item.pricePerQuantity = product.price - discountAmt;
            await updateDoc(doc(db, "users", username), {
                cart: userCart,
                currentCartHistory: userCartHistory
            });
        } catch (err) {
            console.error(err);
        }

        // Update the end screen with the final price
        const newHtml = `<p class="text-bold text-3xl md:text-4xl">End Of Game</p>
        <br>
        <p class="text-sm">The final price of the item is: $<span class="underline">${item.pricePerQuantity.toFixed(2)}</span></p>
        <br>
        <p class="text-sm">Click the <span class="italic">continue</span> button to go back to product page</p>
        <br>`;


        setTimeout(() => {
            // Wait 2 seconds before showing end screen
            document.getElementById("end-info").insertAdjacentHTML("afterbegin", newHtml);
            document.getElementById("end-screen").classList.remove("hidden");
        }, 2000);
    }
    
    document.getElementById("end-btn").addEventListener("click", function(){
        // Redirect to product page with final price as a query parameter
        window.location.href = `/product.html?id=${productID}`;
    });
});