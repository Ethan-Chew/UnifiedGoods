document.addEventListener("DOMContentLoaded", function() {
    // Hide Sign In Button
    if (sessionStorage.getItem("username")) {
        document.getElementById("sign-in-btn").classList.add("md:hidden")
    }

    // Show Mobile Tabs
    const mobileTabs = document.getElementById("mobile-nav")
    const mobileHamburger = document.getElementById("mobile-nav-icon")
    mobileHamburger.addEventListener("pointerdown", (e) => {
        if (mobileTabs.style.display !== "flex") {
            // Display the mobile tabs, and change the icon to an 'x'
            mobileTabs.style.display = "flex"
            mobileHamburger.innerHTML = feather.icons['x'].toSvg()
        } else {
            // Hide the mobile tabs and change the icon back to the hamburger menu
            mobileTabs.style.display = "none"
            mobileHamburger.innerHTML = feather.icons['menu'].toSvg()
        }
    })
})