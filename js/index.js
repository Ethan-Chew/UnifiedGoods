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
            
            const categoriesArray = Object.values(categories)
            // Shuffle the categories array randomly
            categoriesArray.sort(() => Math.random() - 0.5)

            for (let x = 0; x < 5; x++){
                const banner = `<a href="/products.html?category=${categoriesArray[x].name}&from=index" class="m-5 text-center relative">
                    <img class="object-fill w-screen sm:w-2/3 md:w-[50rem] mx-auto h-[10rem] xl:h-[18rem] hover:opacity-50 hover:blur-sm duration-200" src="${categoriesArray[x].image}" alt="${categoriesArray[x].name}">
                    <div class="absolute inset-0 flex items-center justify-center z-[-5] m-5">
                        <p class="text-2xl lg:text-4xl font-bold w-full text-center text-pretty">${categoriesArray[x].name}</p>
                    </div>
                </a>`
                if (x < 2){
                    document.getElementById("cat-container-1").innerHTML += banner
                } else {
                    document.getElementById("cat-container-2").innerHTML += banner
                }
            }
        })
})