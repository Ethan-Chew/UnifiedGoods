document.addEventListener("DOMContentLoaded", function() {
    // Hide Sign In button if logged in
    if (sessionStorage.getItem("userID")) {
        document.getElementById("sign-in-btn").classList.add("hidden")
    }
})