document.addEventListener("DOMContentLoaded", function() {
    // Hide Sign In Button
    if (sessionStorage.getItem("username")) {
        document.getElementById("sign-in-btn").classList.add("sm:hidden")
        document.getElementById("sign-in-btn-mobile").classList.add("hidden")
    }

    // Show Mobile Tabs
    const mobileTabs = document.getElementById("mobile-nav")
    const mobileHamburger = document.getElementById("mobile-nav-icon")
    mobileHamburger.addEventListener("pointerdown", (e) => {
        if (mobileTabs.classList.contains("hidden")) {
            // Display the mobile tabs, and change the icon to an 'x'
            mobileTabs.classList.remove("hidden")
            mobileHamburger.innerHTML = feather.icons['x'].toSvg()
        } else {
            // Hide the mobile tabs and change the icon back to the hamburger menu
            mobileTabs.classList.add("hidden")
            mobileHamburger.innerHTML = feather.icons['menu'].toSvg()
        }
    })
})