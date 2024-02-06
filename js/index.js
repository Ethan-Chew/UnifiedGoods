document.addEventListener("DOMContentLoaded", function() {
    // Get Data from API
    const shopURL = "https://assets.ethanchew.com/main.json";
    let ids = [];
    fetch(shopURL)
        .then(response => response.json())
        .then(data => {
            // Generate the Trending Products
            for (let i = 0; i < 4; i++) {
                // Store 4 random products to be generate the carousel
                let id = Math.floor(Math.random() * (data.length));
                if (ids.includes(id)) {
                    id = Math.floor(Math.random() * (data.length));
                } else { ids.push(id); }
                const card = `<a class="w-3/4 min-[500px]:w-1/3 sm:w-1/3 md:w-80 bg-lightblue/[0.3] p-3 rounded-lg flex flex-col align-center items-center" href="/product.html?id=${data[id].id}&from=index">
                    <div>
                        <img class="aspect-square rounded-lg" src="${data[id].images[0]}" alt="${data[id].title}">
                        <p class="font-bold text-center text-lg my-3">${data[id].title}</p>
                    </div>
                </a>`;
                document.getElementById("carousel").innerHTML += card;
            }

            const categories = {};
            data.forEach(item =>{
                if (!categories[item.category.id]){
                    // Add the category to the categories object if it doesn't exist yet.
                    categories[item.category.id] = {
                        id: item.category.id,
                        name: item.category.name,
                        description: item.category.description
                    };
                }
            });

            const categoriesArray = Object.values(categories);
            // Shuffle the categories array randomly
            categoriesArray.sort(() => Math.random() - 0.5);
            
            for (let x = 0; x < 2; x++) {
                const categoryContainer = document.getElementById("cat-text-"+x);
                // Generate the category name and description
                categoryContainer.insertAdjacentHTML(
                    'afterbegin',
                    `<p class="font-semibold text-3xl xl:text-4xl w-full text-left mb-3">${categoriesArray[x].name}</p>
                    <p class="font-light text-lg w-full text-left">
                        ${categoriesArray[x].description}
                    </p>`
                );
                const productContainer = document.getElementById("cat-product-"+x);
                productContainer.innerHTML = "";
                data.forEach(item => {
                    if (item.category.id == categoriesArray[x].id){
                        // Generate the products for the category
                        productContainer.innerHTML += `<a class="bg-lightblue/[0.4] shadow-md hover:shadow-xl p-4 rounded-lg text-center align-center h-full min-w-60 max-w-60" href="/product.html?id=${item.id}&from=index">
                            <div class="flex justify-center">
                                <img src="${item.images[0]}" alt="${item.title}" class="object-cover aspect-square">
                            </div>
                            <div class="mt-2">
                                <p class="font-bold text-lg truncate hover:underline" title="${item.title}">${item.title}</p>
                            </div>
                        </a>`;
                    }
                });
            }
        });
});