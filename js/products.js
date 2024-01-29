document.addEventListener("DOMContentLoaded", async function() {
    // Hide Sign In Button
    if (sessionStorage.getItem("userID")) {
        document.getElementById("sign-in-btn").classList.add("md:hidden")
    }

    // Query API and Update Data
    const urlParameters = new URLSearchParams(window.location.search)
    const categoryName = urlParameters.get("category")
    

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
                categoryContainer.innerHTML += `<div class="m-1">
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
            // Check if filteredProducts is defined and the product is in the filteredProducts array
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
        // Loop through the total number of pages and create page links
        for (let i = 1; i <= totalPages; i++) {
            // Create a new link for each page and add it to the page navigation container
            const pageLink = document.createElement("a")
            pageLink.classList.add(
                "mx-1", 
                "px-3", 
                "py-1", 
                "border", 
                "border-black", 
                "rounded-full", 
                "hover:bg-gray-200",
            )
            pageLink.textContent = i
            // Check if the current page is the first page and add class if so
            if (i === 1) {
                pageLink.classList.add("bg-gray-200")
            }
            // Add event listener to page link to render products for the current page
            pageLink.addEventListener("click", () => {
                for (let j = 0; j < pageNavigationContainer.children.length; j++) {
                    pageNavigationContainer.children[j].classList.remove("bg-gray-200")
                }
                pageLink.classList.add("bg-gray-200")
                // Check if filteredProducts is not undefined and render filteredProducts for the current page
                if (filteredProducts != undefined){
                    renderProductsForPage(i,filteredProducts)
                } else {
                    renderProductsForPage(i)
                }
            })
            // Add page link to page navigation container
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
        // Filter the categories based on if they are selected/checked
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked")
        // Get the selected categories as an array of IDs 
        const selectedCategories = Array.from(checkboxes).map(checkbox => checkbox.id)
        // Filter the products based on the selected categories
        const filteredProducts = apiData.filter(product => selectedCategories.includes(product.category.name))

        // Check if filteredProducts is not empty and render filteredProducts for the first page
        if (filteredProducts.length != 0) {
            // Recalculate the total number of pages based on the filtered products
            totalProducts = filteredProducts.length
            totalPages = Math.ceil(totalProducts / productsPerPage)
            // Clear existing content of product container
            productContainer.innerHTML = ""
            const pageNavigationContainer = document.getElementById("page-nav-container")
            pageNavigationContainer.parentNode.removeChild(pageNavigationContainer)

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
            // Check the checkbox
            checkbox.checked = true
        })
    })

    // Clear all checkboxes
    document.getElementById("clear").addEventListener("click", function() {
        const checkboxes = document.querySelectorAll("input[type='checkbox']")
        checkboxes.forEach(function(checkbox) {
            // Uncheck the checkbox
            checkbox.checked = false
        })
        // Clear existing content of product container
        document.getElementById("page-nav-container").parentNode.removeChild(document.getElementById("page-nav-container"))
        // Render all the products
        totalProducts = apiData.length
        totalPages = Math.ceil(totalProducts / productsPerPage)
        createPageNavigation(apiData)
        renderProductsForPage(1, apiData)
    })

    // If accessed from categories section in index/home page
    if (categoryName != undefined){
        filteredProducts = apiData.filter(product => product.category.name === categoryName)
        totalProducts = filteredProducts.length
        totalPages = Math.ceil(totalProducts / productsPerPage)
        // Clear existing content of product container
        productContainer.innerHTML = ""
        pageNavigationContainer = document.getElementById("page-nav-container")
        pageNavigationContainer.parentNode.removeChild(pageNavigationContainer)
        createPageNavigation(filteredProducts)
        renderProductsForPage(1, filteredProducts)
    }

    document.getElementById('hidden-1').classList.remove('hidden');
    document.getElementById('hidden-2').classList.remove('hidden');
})

