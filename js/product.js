document.addEventListener("DOMContentLoaded", function() {
    const urlParameters = new URLSearchParams(window.location.search)
    const productID = Number(urlParameters.get("id"))

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
        })
})