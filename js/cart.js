document.addEventListener("DOMContentLoaded", async function() {
    if (!sessionStorage.getItem("userID")) {
        window.location.href = "index.html"
        alert("You are not signed in! Sign in before visiting your rewards.")
    }

    // URLs
    const userDBURL = "https://fedassignment-6326.restdb.io/rest/shopusers"
    const APIKEY = "65a398e2c69bc871e5f5e224"
    const shopDBURL = "https://assets.ethanchew.com/main.json"

    // HTML Elements
    const noItemsContainer = document.getElementById("no-items-container")
    const container = document.getElementById("items-container")
    
    // Retrieve User's Cart from Database
    const getUserSettings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
        },
    }
    const getUserResponse = await fetch(`${userDBURL}?q={"username":"${username}"}`, getUserSettings)
    const getUserData = await getUserResponse.json()
    const cart = getUserData[0].cart
    
    /// Display Items in the Cart
    if (cart.length > 0) {
        noItemsContainer.classList.add("hidden") // Hide section displaying no items

        // Grab Cart Items from API
        let cartItems = []
        /// Query API for Items
        const getItemsResponse = await fetch(shopDBURL)

        for (let i = 0; i < getItemsResponse.length; i++) {
            if (cart.includes(getItemsResponse[i].id)) {
                cartItems.push(getItemsResponse[i].id)
            }
        }

        /// Display Cart on Screen
        for (let i = 0; i < cart.length; i++) {
            container.innerHTML += `<div class="bg-offwhite w-full p-5 flex flex-row gap-10">
                <img src="${cart[i].images[0]}" alt=${cart[i].title} class="w-1/5" />
                <div class="flex flex-col">
                    <p class="font-semibold text-3xl">${cart[i].title}</p>
                    <p class="text-2xl">$0.00</p>
                    <div class="mt-auto flex flex-row gap-5">
                        <label class="px-5 py-2 bg-black text-white">
                            Quantity: 
                            <input 
                                id="quantity"
                                type="number" value="1" min="1" max="50"
                                class="ml-2 bg-black text-white w-1/3"
                            >
                        </label>
                        <button id="remove" class="px-5 py-2 bg-red-700 hover:bg-red-800 text-white">Remove</button>
                    </div>
                </div>
            </div>`
        }
    }
})