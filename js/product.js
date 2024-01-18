document.addEventListener("DOMContentLoaded", function() {
    const urlParameters = new URLSearchParams(window.location.search)
    const productID = Number(urlParameters.get("id"))

    // HTML Elements
    const smallImgsDiv = document.getElementById("small-imgs")
    const productImage = document.getElementById("product-img")

    const shopURL = "https://assets.ethanchew.com/main.json"
    fetch(shopURL)
        .then(response => response.json())
        .then(data => {
            let chosenProduct;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === productID) {
                    chosenProduct = data[i]
                }
            }

            // Update Data in HTML
            productImage.src = chosenProduct.images[0]
            for (let i = 0; i < chosenProduct.images.length; i++) {
                smallImgsDiv.innerHTML += `<img class="w-1/6 hover:opacity-85 cursor-pointer" alt="img${i+1}" src="${chosenProduct.images[i]}">`
            }
            document.getElementById("product-title").innerText = chosenProduct.title
            document.getElementById("product-desc").innerText = chosenProduct.description
        })
    
    // Check Sign In on Add to Cart
    const addToCart = document.getElementById("add-cart-btn")
    addToCart.addEventListener("click", function () {
        if (!sessionStorage.getItem("userID")) {
            document.getElementById("overlay").classList.remove("hidden")
        }
    })
})