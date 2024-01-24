document.addEventListener("DOMContentLoaded", function() {
    if (!sessionStorage.getItem("userID")) {
        window.location.href = "index.html"
        alert("You are not signed in! Sign in before visiting your rewards.")
    }

    
})