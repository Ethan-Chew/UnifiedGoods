document.addEventListener("DOMContentLoaded", function() {
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
                const card = `<a class="w-2/3 sm:w-1/3 md:w-80 bg-lightblue/[0.3] p-3 rounded-lg flex flex-col align-center items-center" href="/product.html?id=${data[id].id}&from=index">
                    <div>
                        <img class="aspect-square rounded-lg" src="${data[id].images[0]}" alt="${data[id].title}">
                        <p class="font-bold text-center text-lg my-3">${data[id].title}</p>
                    </div>
                </a>`
                document.getElementById("carousel").innerHTML += card
            }

        })
    fetch(shopURL, getSettings)
        .then(response => response.json())
        .then(data => {
            const categories = {}
            data.forEach(item =>{
                if (!categories[item.category.id]){
                    categories[item.category.id] = {
                        id: item.category.id,
                        name: item.category.name,
                        image: item.category.image,
                    }
                }
            })

            for (let x = 1; x < 6; x++){
                const banner = `<a href="/products.html?category=${categories[x].name}&from=index" class="m-5 text-center relative">
                    <img class="object-fill w-screen sm:w-2/3 md:w-[50rem] mx-auto h-[18rem] hover:opacity-50 hover:blur-sm duration-200" src="${categories[x].image}" alt="${categories[x].name}">
                    <div class="absolute inset-0 flex items-center justify-center z-[-5]">
                        <p class="text-2xl lg:text-4xl font-bold w-full text-center">${categories[x].name}</p>
                    </div>
                </a>`
                if (x < 3){
                    document.getElementById("cat-container-1").innerHTML += banner
                } else {
                    document.getElementById("cat-container-2").innerHTML += banner
                }
            }
        })

    document.getElementById("show-more").addEventListener("click", function() {
        document.getElementById("show-more").classList.add("hidden")
        document.getElementById("txt-container").classList.remove("max-sm:hidden")
    })

    document.getElementById("show-less").addEventListener("click", function() {
        document.getElementById("txt-container").classList.add("max-sm:hidden")
        document.getElementById("show-more").classList.remove("hidden")
    })
})