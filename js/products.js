document.addEventListener("DOMContentLoaded", async function() {
    // Hide Sign In Button
    if (sessionStorage.getItem("userID")) {
        document.getElementById("sign-in-btn").classList.add("md:hidden")
    }

    // Query API and Update Data
    const urlParameters = new URLSearchParams(window.location.search)
    const productID = Number(urlParameters.get("id"))
    const goBack = urlParameters.get("from")

    // Get Data from API
    const shopURL = "https://assets.ethanchew.com/main.json"
    const apiResponse = await fetch(shopURL)
    const apiData = await apiResponse.json()
})