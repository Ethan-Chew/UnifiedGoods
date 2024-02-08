# Testing
How the UnifiedGoods site can be tested, to ensure that all implimented features work as expected.

## Preparations
1. **Account Creation**: Test account creation with various scenarios, including valid inputs, invalid inputs.
    - Invalid inputs: Duplicate username
    - Check if user is able to succesfully create their account.
    - **WARNING - DO NOT enter a real password**. Passwords stored in our database are not encrypted, and only sample passwords should be used.
2. **Login**: Test login functionality with correct details and incorrect password.
    - Check if user is able to login to their account.

## Navigation Bar
1. **Mobile Responsiveness**: Test the appearance and the functionality of the navigation menu when on different devices and screen sizes.
2. **Authentication**: Verify that users attempts to access restricted pages prompts the user to log in and will redirect them to the log in page succesfully.

## Home Screen
1. **Trending Products**: Continuously refresh the home page and ensure that the trending products is consistently changing and not fixed on a particular sets of products. Clicking on a product will bring you to its respective product detail page.
    - For demonstration purposes the trending products are generated reandomly every time the page is refreshed.
2. **Categories Display**: Confirm that the products in the categories section displayed are relevant and match the category the should belong in. Clicking on a product will bring you to its respective product detail page.
    - On every page load, two random categories should be choosen and displayed to the user.

## Product Screen
1. **Product Details**: Verify that all the product details, including product name, pricing, descriptions and any other applicable information are displayed and accurate.
2. **Images Quality**: Check the image resolution and ensure that images loaded is clear and properly displayed across all different devices and browsers.
3. **Game Link Button**: Check that the "Guess the Price" button will link to the game page correctly.

## Product List Screen
1. **Category Sidebar**: On page load, fetch every categories available from the database and create their respective checkboxes. Ensure that the respective buttons are executing the functions appropriately.
    - Clear button unchecks all checkboxes and display all available products
    - Select all button will check all the checkboxes
    - Apply button will display products from the selected respective categories.
2. **Category Filtering**: Ensure that selecting/deselecting categories correctly filters the displayed products.
3. **Pagination Functionality**: Test the pagination by navigating through the various pages and verifying that the products are displayed and not duplicated.
4. **Products List**: Clicking on a product will bring you to its respective product detail page.
  
## Game Screen
1. **Game Stability**: Test the game under various scenarios
    - Products and its details are shown correctly
    - Countdown timer works and starts ticking down
    - Test the amount of times that the user is able to guess the price
    - Test that the calculation for the discounts are working properly
    - End screen shows the correct price
    - Continue button in the end screen will bring the user back to the product page
2. **Results Storage**: Verify that the game results such as the discounts and item price are stored securely in the datbase and associated with the correct user and product.

## Search Screen
1. **Search Query Handling**: Test the search bar with various queries, including misspelled words, partial matches and special characters.
    - Check that the correct products are displayed based on the query.
    - Verify that the products are filtered appropriately.

## Rewards Screen
1. **Tier Calculation**: Ensure that the user tiers is calculated accurately based on their points earned. Information on how each tier can be attained is documented in the main [README file](../README.md).
2. **Details**: Ensures that the user's points and tiers are displayed correctly.

## Cart Screen
1. **Cart Functionality**: Products added to carts are stored and shown correctly. Check if the product can be viewed, removed or edit the quantity in the cart.
2. **Checkout Functionality**: Check that a confirmation page is shown with all the correct details and a receipt is shown in the end.
    - When checked out fully the appropriate amount of points should be added to the user profile.

## Profile Screen
1. **Details**: Confirm that the user's username and email information is correctly displayed on the screen
2. **Functionality**: Ensure that the sign out button, succesfully sign out from their account and bring them back to the home page. 

## General Testing
1. **Performance Testing**: Perform various testing to measure the website load times, server response times, and overal responsiveness under various traffic loads should be optimized and working well.
2. **Accessibility Testing**: Perform testing of all functions and visuals in different browsers and devices for responsiveness.

## User Experience Testing
1. Conduct usability testing to test the intuitiveness and ease of use of the website interface.
2. Test common user interaction, such as browsing of products, adding items to cart, completing purchase and playing the game to ensure a smooth experience.

## Session Management
1. Test session handling mechanisms, such as session expiration and session persistence across page reloads, to ensure a seamless user experience without unexpected logouts.