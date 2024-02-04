document.addEventListener("DOMContentLoaded", function() {
    function displaySignInAlert() {
        alert("Sign in, or Create an Account before continuing!");
    }

    if (sessionStorage.getItem("username")) {
        // Hide Sign In Button if user already signed in
        document.getElementById("sign-in-btn").classList.add("sm:hidden");
        document.getElementById("sign-in-btn-mobile").classList.add("hidden");
    } else {
        // Change Redirects if user isn't signed in
        document.getElementById("nav-dt-rewards").href = "/signin.html";
        document.getElementById("nav-dt-profile").href = "/signin.html";
        document.getElementById("nav-mobile-rewards").href = "/signin.html";
        document.getElementById("nav-mobile-profile").href = "/signin.html";

        document.getElementById("nav-dt-rewards").addEventListener("click", () => displaySignInAlert());
        document.getElementById("nav-dt-profile").addEventListener("click", () => displaySignInAlert());
        document.getElementById("nav-mobile-rewards").addEventListener("click", () => displaySignInAlert());
        document.getElementById("nav-mobile-profile").addEventListener("click", () => displaySignInAlert());
    }

    // Show Mobile Tabs
    const mobileTabs = document.getElementById("mobile-nav");
    const mobileHamburger = document.getElementById("mobile-nav-icon");
    mobileHamburger.addEventListener("pointerdown", (e) => {
        if (mobileTabs.classList.contains("hidden")) {
            // Display the mobile tabs, and change the icon to an 'x'
            mobileTabs.classList.remove("hidden");
            mobileHamburger.innerHTML = feather.icons.x.toSvg();
        } else {
            // Hide the mobile tabs and change the icon back to the hamburger menu
            mobileTabs.classList.add("hidden");
            mobileHamburger.innerHTML = feather.icons.menu.toSvg();
        }
    });
});