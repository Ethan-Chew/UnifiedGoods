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

            const categories = {}
            data.forEach(item =>{
                if (!categories[item.category.id]){
                    categories[item.category.id] = {
                        id: item.category.id,
                        name: item.category.name
                    }
                }
            })

            const categoriesArray = Object.values(categories)
            // Shuffle the categories array randomly
            categoriesArray.sort(() => Math.random() - 0.5)

            
            for (let x = 0; x < 2; x++){
                document.getElementById("cat-text-"+x).innerText = categoriesArray[x].name
                const productContainer = document.getElementById("cat-product-"+x)
                console.log(productContainer)
                productContainer.innerHTML = ""
                data.forEach(item => {
                    if (item.category.id == categoriesArray[x].id){
                        productContainer.innerHTML += `<a class="bg-white shadow-md hover:shadow-xl p-4 rounded-lg text-center align-center h-full min-w-60 max-w-60" href="/product.html?id=${data.id}&from=index">
                        <div class="flex justify-center">
                            <img src="${item.images[0]}" alt="${item.title}" class="object-cover aspect-square min-w-200">
                        </div>
                        <div class="mt-2">
                            <p class="font-bold text-lg md:text-xl truncate hover:underline" title="${item.title}">${item.title}</p>
                        </div>
                    </a>`
                    }
                })
            }

        })
})