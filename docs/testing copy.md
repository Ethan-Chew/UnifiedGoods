# Testing
How the UnifiedGoods site can be tested, to ensure that all implimented features work as expected.

## Preparations
1. Verify that you have created an account with UnifiedGoods.
    - When creating an account, **please DO NOT enter a real password.** Passwords stored in our database are not encrypted, and only sample passwords should be used.
2. Once you have an account, simply log in.

## Navigation Bar
1. Mobile Responsiveness
    - On smaller screens, the *secondary* navbar is collapsed into a Hamburger Menu. By clicking the Hamburger Icon on the top left hand side of the screen, the user would be able to toggle between showing and hidding the mobile navigation tabs
2. Account Requirement
    - Some pages require users to sign in before interacting with it, for example, the cart, rewards and profile screen.
    - If the user clicks on the Rewards and Profile Screens and they are not logged in, an alert would prompt them to sign in, then redirect them to the sign in page.

## Home Screen
1. Trending Products
    - For the demostration purposes, the trending products are generated randomly every time the page is refreshed
    - Clicking on a product will bring you to its respective product detail page
2. Categories
    - On every page load, two random categories would be chosen and displayed to the user.
    - The relevant products in these categories would be shown as well.

## Product Screen
1. Verify that all relevant product details are displayed, including the product name, price, description, and any other applicable information.
2. Ensure that the product image is clear and properly displayed, able to switch between the provided images
3. Check that the "Add to Cart" button and quantity is functional and adds the correct amount of the product to the cart.
4. Check that the "Guess the Price" button will link to the game page.

## Product List Screen
1. Categories Sidebar
    - On page load, fetch every available categories from the database to create the categories checkboxes.
    - Apply button shows the products from selected/checked categories.
    - Clear button unchecks all checkboxes and shows products from all categories.
    - Select all button checks all the checkboxes.
2. Products List
    - On page load, a maximum of 16 products should be loaded on screen and page navigation is generated.
    - Page navigation works and shows different products for all the pages.
    - Clicking on the product will open the link to the product page for purchasing.
  
## Game Screen
1. Ensure the game loads the correct product information for guessing the price.
2. Test that the countdown timer works.
3. Test the amount of times the user is able to guess the price. (tries)
4. Test the calculation for the discount is working properly.
5. Check if results are stored in the database correctly.
6. Check if the end screen results price is shown correctly
7. Test if the continue button will return to the correct product page.

## Search Screen
1. Confirm that the search bar is responsive and allows users to enter search queries
2. Check that the relevant products are displayed based on the search query
3. Verify that the search results are filtered properly.

## Rewards Screen
1. Ensures that the user's loyalty rewards, points and tier is correctly displayed

## Cart Screen
1. Cart Functionality
    - Products added from various sections of the site is stored and shown correctly
    - Check that if the product can be viewed, removed or edited in the cart
    - Test the checkout process and ensure it shows a confirmation popup

## Profile Screen
1. Confirm that the user is able to edit their profile information.

## General Testing
1. Test the sites on different browsers and ensure functionality
2. Test on various devices (mobile,tablet,desktop) to ensure reposnsiveness and functionality
3. Ensure the performance of the website is optimized and working well.
4. Check if user is able to register and login to their accounts.