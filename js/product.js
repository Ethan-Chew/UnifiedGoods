document.addEventListener("DOMContentLoaded", async function() {
    // Hide Sign In Button
    if (sessionStorage.getItem("userID")) {
        document.getElementById("sign-in-btn").classList.add("md:hidden")
    }

    // Query API and Update Data
    const urlParameters = new URLSearchParams(window.location.search)
    const productID = Number(urlParameters.get("id"))
    const goBack = urlParameters.get("from")

    // HTML Elements
    const smallImgsDiv = document.getElementById("small-imgs")
    const productImage = document.getElementById("product-img")
    const backBtn = document.getElementById("back-btn")

    // Update Back Button Redirect
    if (goBack == "search") {
        backBtn.src = "/search.html"
        backBtn.innerText = "< Back to Search"
    }

    // Get Data from API
    const shopURL = "https://assets.ethanchew.com/main.json"
    const apiResponse = await fetch(shopURL)
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
    const addToCart = document.getElementById("add-cart-btn")
    addToCart.addEventListener("click", function () {
        // Show Sign In overlay if user not signed in
        if (!sessionStorage.getItem("userID")) {
            document.getElementById("overlay").classList.remove("hidden")
        } else {
            // Add to Local Storage
    
    
            // Show Lottie Animation (hide after 1s)
            const lottieSuccess = document.getElementById("add-success")
            const addCartLabel = document.getElementById("add-cart-lbl")
            addCartLabel.classList.add("hidden")
            lottieSuccess.classList.remove("hidden")
            lottieSuccess.goToAndStop(0, true);
            lottieSuccess.play()
            setTimeout(() => {
                addCartLabel.classList.remove("hidden")
                lottieSuccess.classList.add("hidden")
            }, 2000)
        }
    })
})