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
                const card = `<div class="w-80 bg-lightblue/[0.3] p-3 rounded-lg flex flex-col align-center items-center">
                    <img class="aspect-square rounded-lg" src="${data[id].images[0]}" alt="${data[id].title}">
                    <p class="font-bold text-center text-lg my-3">${data[id].title}</p>
                    <div class="mt-auto flex flex-col md:flex-row items-center gap-10">
                        <p class="text-lg">$${data[id].price}</p>
                        <button class="px-5 py-2 bg-red-300 rounded-lg">
                            <a href="/product.html?id=${data[id].id}">View More</a>
                        </button>
                    </div>
                </div>`
                document.getElementById("carousel").innerHTML += card
            }

        })
})