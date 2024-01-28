document.addEventListener("DOMContentLoaded", async function() {
    // Hide Sign In Button
    if (sessionStorage.getItem("userID")) {
        document.getElementById("sign-in-btn").classList.add("md:hidden")
    }

    // Query API and Update Data
    const urlParameters = new URLSearchParams(window.location.search)
    const productID = Number(urlParameters.get("id"))

    // Get Data from API
    const shopURL = "https://assets.ethanchew.com/main.json"
    const apiResponse = await fetch(shopURL)
    const apiData = await apiResponse.json()

    // Show All Categories [checkbox]
    const categoryContainer = document.getElementById("category-container")
        let categoryResults = []
        for (let i = 0; i < apiData.length; i++) {
            const category = apiData[i].category.name
            if (!categoryResults.includes(category)) {
                categoryResults.push(category)
                categoryContainer.innerHTML += `<div class="m-2">
                <input type="checkbox" id="${category}" name="${category}">
                <label for="${category}">${category}</label>
            </div>`
            }
    }

    // Show All Products
    const productContainer = document.getElementById("product-container")
        for (let i = 0; i < apiData.length; i++) {
            productContainer.innerHTML += `<a class="bg-lightblue shadow-md p-4 rounded text-center" href="/product.html?id=${apiData[i].id}">
            <div class="flex items-center">
                <img src="${apiData[i].images[0]}" alt="${apiData[i].title}" class="object-cove aspect-square w-[20rem] h-auto">
            </div>
            <div class="text-base">
                <p class="font-bold">${apiData[i].title}</p>
                <p class="text-gray-600">${apiData[i].category.name}</p>
            </div>
        </a>`
    }

    // Calculate total amount of products
    let totalProducts = apiData.length
    // Calculate the number of products per page
    const productsPerPage = 16
    // Calculate the total number of pages
    let totalPages = Math.ceil(totalProducts / productsPerPage)

    // Function to render products for the respective page
    function renderProductsForPage(pageNumber,filteredProducts) {
        // Calculate the start and end index for the current page
        const startIndex = (pageNumber - 1) * productsPerPage
        const endIndex = startIndex + productsPerPage
        // Clear existing content of product container
        productContainer.innerHTML = ""
        // Loop and render products
        for (let i = startIndex; i < endIndex && i < totalProducts; i++) {
            let product = apiData[i]
            if (filteredProducts != undefined){
                product = filteredProducts[i]
            }
            productContainer.innerHTML += `<a class="bg-lightblue shadow-md p-4 rounded text-center h-[25rem]" href="/product.html?id=${product.id}">
                <div class="flex items-center">
                    <img src="${product.images[0]}" alt="Product Image" class="object-cover aspect-square w-[20rem] h-auto">
                </div>
                <div class="text-base flex flex-col">
                    <p class="font-bold">${product.title}</p>
                    <p class="text-gray-600">${product.category.name}</p>
                </div>
            </a>`
        }
    }
    
    // Function to create page navigation container
    function createPageNavigation(filteredProducts) {
        // Create a new div to store page navigation
        const pageNavigationContainer = document.createElement("div")
        pageNavigationContainer.id = "page-nav-container"
        pageNavigationContainer.classList.add("w-screen","md:w-auto", "flex", "md:justify-content", "md:flex-wrap", "mt-4", "max-md:overflow-auto", "touch-pan-x")
      
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a")
            pageLink.classList.add(
                "mx-1", 
                "px-3", 
                "py-1", 
                "border", 
                "border-black", 
                "rounded-full", 
                "hover:bg-gray-200",
            );
            pageLink.textContent = i

            if (i === 1) {
                pageLink.classList.add("bg-gray-200")
            }

            pageLink.addEventListener("click", () => {
                for (let j = 0; j < pageNavigationContainer.children.length; j++) {
                    pageNavigationContainer.children[j].classList.remove("bg-gray-200")
                }
                pageLink.classList.add("bg-gray-200")
                if (filteredProducts != undefined){
                    renderProductsForPage(i,filteredProducts)
                } else {
                    renderProductsForPage(i)
                }
            })
            
            pageNavigationContainer.appendChild(pageLink)
        }
        // Insert page navigation container after the product container
        productContainer.parentNode.insertBefore(pageNavigationContainer, productContainer.nextSibling)
    }
    
    // Call the function to create the page navigation
    createPageNavigation()

    // Render the products for the first page
    renderProductsForPage(1)

    // Apply filter
    document.getElementById("apply").addEventListener("click", function() {
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked")
        const selectedCategories = Array.from(checkboxes).map(checkbox => checkbox.id)
        const filteredProducts = apiData.filter(product => selectedCategories.includes(product.category.name))

        if (filteredProducts.length != 0) {
            // Recalculate the total number of pages based on the filtered products
            totalProducts = filteredProducts.length
            totalPages = Math.ceil(totalProducts / productsPerPage)

            productContainer.innerHTML = ""
            const pageNavigationContainer = document.getElementById("page-nav-container")
            pageNavigationContainer.parentNode.removeChild(pageNavigationContainer);

            // Re-render the page navigation
            createPageNavigation(filteredProducts)

            // Render the products for the first page of filtered products
            renderProductsForPage(1,filteredProducts)
        }

    })

    // Select all checkboxes
    document.getElementById("select-all").addEventListener("click", function() {
        const checkboxes = document.querySelectorAll("input[type='checkbox']")
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = true
        })
    })

    // Clear all checkboxes
    document.getElementById("clear").addEventListener("click", function() {
        const checkboxes = document.querySelectorAll("input[type='checkbox']")
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false
        })
    })
})

