document.addEventListener("DOMContentLoaded", function() {
    // Hide Sign In button if logged in
    if (sessionStorage.getItem("userID")) {
        document.getElementById("sign-in-btn").classList.add("md:hidden")
    }

    // Get Data from API
    const getSettings = {
        method: "GET"
    }
    const shopURL = "https://assets.ethanchew.com/main.json"
    let ids = []
    fetch(shopURL, getSettings)
        .then(response => response.json())
        .then(data => {
            // Generate the Trending Products
            for (let i = 0; i < 4; i++) {
                let id = Math.floor(Math.random() * (data.length))
                if (ids.includes(id)) {
                    id = Math.floor(Math.random() * (data.length))
                } else { ids.push(id) }
                const card = `<a class="w-80 bg-lightblue/[0.3] p-3 rounded-lg flex flex-col align-center items-center" href="/product.html?id=${data[id].id}">
                    <div>
                        <img class="aspect-square rounded-lg" src="${data[id].images[0]}" alt="${data[id].title}">
                        <p class="font-bold text-center text-lg my-3">${data[id].title}</p>
                    </div>
                </a>`
                document.getElementById("carousel").innerHTML += card
            }

        })
})