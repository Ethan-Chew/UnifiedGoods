import { db } from "./api/firebase.js";
import { getDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

document.addEventListener("DOMContentLoaded", async function() {
    // Query API and Update Data
    const urlParameters = new URLSearchParams(window.location.search);
    const productID = Number(urlParameters.get("id"));
    const goBack = urlParameters.get("from");
    const username = sessionStorage.getItem("username");

    // HTML Elements
    const mainContent = document.getElementById("main-container");
    const smallImgsDiv = document.getElementById("small-imgs");
    const productImage = document.getElementById("product-img");
    const addCartBtn = document.getElementById("add-cart-btn");
    const addCartLabel = document.getElementById("add-cart-lbl");
    const loaderAnim = document.getElementById("loader");
    const backBtn = document.getElementById("back-btn");
    const productPriceLbl = document.getElementById("prod-price");

    // Update Back Button Redirect
    if (goBack == "search") {
        backBtn.href = "/search.html";
        backBtn.innerText = "< Back to Search";
    }
    if (goBack == "products") {
        backBtn.href = "/products.html";
        backBtn.innerText = "< Back to Product List";
    }


    // Get Data from API
    const shopURL = "https://assets.ethanchew.com/main.json";
    loaderAnim.classList.remove("hidden");
    const apiResponse = await fetch(shopURL);
    loaderAnim.classList.add("hidden");
    const apiData = await apiResponse.json();
    
    // Filter to only show chosen product
    let chosenProduct;
    for (let i = 0; i < apiData.length; i++) {
        if (apiData[i].id === productID) {
            chosenProduct = apiData[i];
        }
    }

    // Update Data in HTML
    productImage.src = chosenProduct.images[0];
    for (let i = 0; i < chosenProduct.images.length; i++) {
        smallImgsDiv.innerHTML += `<img id="simg${i}" class="w-1/6 hover:opacity-85 cursor-pointer" alt="img${i+1}" src="${chosenProduct.images[i]}">`;
    }
    document.getElementById("product-title").innerText = chosenProduct.title;
    document.getElementById("product-desc").innerText = chosenProduct.description;
    
    // Switch Images
    for (let i = 0; i < chosenProduct.images.length; i++) {
        document.getElementById(`simg${i}`).addEventListener("click", function () {
            productImage.src = document.getElementById(`simg${i}`).src;
        });
    }

    // Start Game Button
    document.getElementById("guess-price-btn").addEventListener("click", function () {
        if (!sessionStorage.getItem("username")) {
            document.getElementById("nsi-overlay").classList.remove("hidden");
        } else {
            window.location.href = `game.html?id=${productID}`;
        }
    });

    // Display the Product
    mainContent.classList.remove("hidden");

    // Get user's existing cart
    let userCart = [];
    let userCartHistory = [];
    try {
        const getUserResponse = await getDoc(doc(db, "users", username));
        if (!getUserResponse.exists()) {
            alert("User does not exist!");
            window.location.href = "signin.html";
        } else {
            const userObj = getUserResponse.data();
            userCart = userObj.cart;
            userCartHistory = userObj.currentCartHistory;
        }
    } catch (err) {
        console.log(err);
    }

    // Update the price based on discount
    let cartSelectedItem = {};
    for (let i = 0; i < userCart.length; i++) {
        if (userCart[i].itemid == productID) {
            // Product is in the cart, check discount
            cartSelectedItem = userCart[i];
            if (cartSelectedItem.discount == null) {
                console.log(cartSelectedItem)
                // Null discount, display '???'
                productPriceLbl.innerText = "S$???";
            } else {
                // Set price based on price - discount
                productPriceLbl.innerText = `S$${cartSelectedItem.pricePerQuantity.toFixed(2)} (${cartSelectedItem.discount >= 0 ? "discounted" : "marked-up"})`;
            }
            break;
        }
    }

    // Hide Play Game button if user has added/removed the product from current cart
    for (let i = 0; i < userCartHistory.length; i++) {
        if (userCartHistory[i] == productID) {
            document.getElementById("guess-price-btn").disabled = true;
            document.getElementById("guess-price-btn").innerText = "You've guessed before!";
            break;
        }
    }

    // Show the Content
    mainContent.classList.remove("hidden");

    // Function to add Item to Cart
    async function addToCart(discount) {
        // Disable Add to Cart Button, start loading
        addCartBtn.disabled = true;
        loaderAnim.classList.remove("hidden");

        const quantity = document.getElementById("quantity-entry").value;
        const item = {
            "itemid": productID,
            "quantity": quantity,
            "discount": discount,
            "pricePerQuantity": 0
        };

        // Add the Price to the Item Object
        const discountAmt = chosenProduct.price * (item.discount / 100);
        const pricePerQuantity = (chosenProduct.price - discountAmt).toFixed(2);
        item.pricePerQuantity = pricePerQuantity;

        // Check if Item already exists in the cart
        const existingCartIndex = userCart.findIndex(item => item.itemid == productID);
        if (existingCartIndex === -1) {
            // Item does not exist in cart
            userCart.push(item);
        } else {
            // Item exists in the cart
            userCart[existingCartIndex].quantity = quantity;
        }
        
        // Check if Item exists in cart history
        const checkCartHistoryIndex = userCartHistory.findIndex(itemid => itemid == productID)
        if (checkCartHistoryIndex === -1) {
            // Item does not exist in cart history
            userCartHistory.push(item.itemid);
        }

        // Update user's cart
        try {
            await updateDoc(doc(db, "users", username), {
                cart: userCart,
                currentCartHistory: userCartHistory
            });

            // Stop Loading
            loaderAnim.classList.add("hidden");
        } catch (err) {
            console.error(err);
        }

        // Enable Add to Cart button
        addCartBtn.disabled = false;

        return item;
    }

    // Helper Function to update the product cost information
    function updateProductCostInfo(item) {
        document.getElementById("prod-price").innerText = `S$${item.pricePerQuantity} (${item.discount >= 0 ? "discounted" : "marked-up"})`;
        document.getElementById("guess-price-btn").disabled = true;
        document.getElementById("guess-price-btn").innerText = "You've guessed before!";
    }

    // Helper Function to display successful add to cart lottie
    function displayLottie() {
        // Show Lottie Animation (hide after 1s)
        const lottieSuccess = document.getElementById("add-success");
        addCartLabel.classList.add("hidden");
        lottieSuccess.classList.remove("hidden");
        lottieSuccess.play();
        setTimeout(() => {
            addCartLabel.classList.remove("hidden");
            lottieSuccess.classList.add("hidden");
        }, 2000);
    }

    // Add Item to Cart if Signed In and Has Played Game/Accept Markup
    addCartBtn.addEventListener("click", async function () {
        const username = sessionStorage.getItem("username");

        // Show Sign In overlay if user not signed in
        if (!username) {
            document.getElementById("nsi-overlay").classList.remove("hidden");
        } else {
            // Check if the user has played the game (if not, discount == null)
            let gamePlayed = false;
            if (cartSelectedItem.discount != null) {
                // Not NULL discount, game has been played
                gamePlayed = true;
            }

            // Display Popup if game not played
            if (!gamePlayed) {
                document.getElementById("nogame-overlay").classList.remove("hidden");

                // User accepts markup
                document.getElementById("overlay-accept-markup").addEventListener("click", async function () {
                    const randomMarkup = -(Math.floor(Math.random() * (31 - 20)) + 20);
                    const updatedItem = await addToCart(randomMarkup);
                    document.getElementById("nsi-overlay").classList.add("hidden");
                    document.getElementById("nogame-overlay").classList.add("hidden");

                    // Show Lottie Animation (hide after 1s)
                    displayLottie();

                    // Update Product Information
                    updateProductCostInfo(updatedItem);
                });

                // User Starts Game
                document.getElementById("overlay-guess-price").addEventListener("click", function () {
                    if (!sessionStorage.getItem("username")) {
                        document.getElementById("nsi-overlay").classList.remove("hidden");
                    } else {
                        window.location.href = `game.html?id=${productID}`;
                    }
                });
            } else {
                // Game as been played before
                const updatedItem = await addToCart(cartSelectedItem.discount);

                // Show Lottie Animation (hide after 1s)
                displayLottie();

                // Update Product Information
                updateProductCostInfo(updatedItem);
            }
        }
    });
});