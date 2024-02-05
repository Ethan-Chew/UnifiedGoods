document.addEventListener("DOMContentLoaded", async function() {
    const shopURL = "https://assets.ethanchew.com/main.json";
    const apiResponse = await fetch(shopURL);
    const apiData = await apiResponse.json();

    // Elements for Text Search and Category Search
    const textField = document.getElementById("search-field");
    const catField = document.getElementById("category-field");

    // Listen to the Search Button
    document.getElementById("search-submit").addEventListener("click", function () {
        // Check if the user has searched for anything
        if (textField.value === "" && catField.value == 0) {
            alert("You haven't searched for anything!");
            return;
        }

        // Process Search
        const productCategories = ['Clothes', 'Electronics', 'Furniture', 'Shoes', 'Miscellaneous', "Men's Top", "Men's Bottom", "Women's Dress", "Women's Top", "Women's Bottom"];
        const searchCat = productCategories[catField.value - 1];

        // Filter and Search the database for data (by Text)
        let results = [];
        for (let i = 0; i < apiData.length; i++) {
            if (apiData[i].title.toLowerCase().includes(textField.value.toLowerCase())) {
                results.push(apiData[i]);
            }
        }
        // Filter and Search the database for data (by Category)
        if (catField.value != 0) {
            if (results.length == 0) {
                // User did not give a text input
                for (let i = 0; i < apiData.length; i++) {
                    if (apiData[i].category.name == searchCat) {
                        results.push(apiData[i]);
                    }
                }
            } else {
                const tempResults = results;
                results = []; // Reset Results
                for (let i = 0; i < tempResults.length; i++) {
                    if (tempResults[i].category.name == searchCat) {
                        results.push(tempResults[i]);
                    }
                }
            }
        }
        
        // Display to Screen
        /// Remove spacer
        const spacer = document.getElementById("spacer");
        if (spacer) {
            spacer.remove();
        }

        /// Update Search Details
        document.getElementById("search-desc").innerText = `Search for ${textField.value != "" ? `"${textField.value}"` : ""}${textField.value != "" && catField.value != 0 ? " and " : ""}${catField.value != 0 ? searchCat : ""}`;
        document.getElementById("search-count").innerHTML = `We found <span class="font-semibold">${results.length}</span> result${results.length == 1 ? "" : "s"}.`;

        /// Display the Search Results on the Screen
        let resultsContainer = document.getElementById("results-container");
        if (resultsContainer) {
            resultsContainer.remove();
        }
        resultsContainer = document.createElement("div");
        resultsContainer.id = "results-container";
        resultsContainer.className = "flex flex-row flex-wrap gap-x-8 gap-y-10 px-10 py-5";
        for (let i = 0; i < results.length; i++) {
            resultsContainer.innerHTML += `<a class="w-80 bg-lightblue/[0.3] p-3 rounded-lg flex flex-col align-center items-center" href="/product.html?id=${results[i].id}&from=search">
                <div>
                    <img class="aspect-square rounded-lg" src="${results[i].images[0]}" alt="${results[i].title}">
                    <p class="font-bold text-center text-lg my-3">${results[i].title}</p>
                </div>
            </a>`;
        }
        document.getElementById("page-content").insertBefore(resultsContainer, document.getElementsByTagName("footer")[0]);

        /// Show the Search Info Container
        document.getElementById("searchinfo-container").classList.remove("hidden");
    });
});