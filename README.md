# UnifiedGoods - A eCommerce Platform
**UnifiedGoods** was created by [Ethan Chew](https://github.com/Ethan-Chew) and [Jefferson Low](https://github.com/Jefflyl98).  

UnifiedGoods is a fictional eCommerce platform, allowing users to 'purchase' items of various categories (for example, clothes, electronics, furniture, etc). Users can play a game in order to gain discounts on their purchases. More information about this game is located [below](###Guessing-the-Product's-Price). In addition, they will earn points as they purchase items from our store.  

**Disclaimer:** This website is solely created for a school assignment, and all information and names mentioned are entirely fictional, any resemblence to real-life entities is purely a coincidence. All content in this site does not act as real-world information.

### Links
- Our [Introductory Video](https://drive.google.com/file/d/1zKLrLhBqWnx7C7t3TTJs4_KOHtYGXa9l/view?usp=sharing) was also created to facilitate a better understanding of our project
- The [Powerpoint Deck](https://drive.google.com/file/d/17fwgVTuHHbt1W_bWluT1_ivIvhIvBCDK/view?usp=sharing) used in the video
- [GitHub Repository](https://github.com/Ethan-Chew/UnifiedGoods) for this project
- UnifiedGoods is hosted at: [fed-unifiedgoods.ethanchew.com](https://fed-unifiedgoods.ethanchew.com)

## Key Features
### Working E-Commerce Website
UnifiedGoods closely mimics a fully-functional e-commerce website, allowing users to search, view, sort and buy products. After searching for products they want to purchase, a game can be played to potentially earn a discount. Users can view the products they have added in the cart screen, reviewing them before checking out. A final receipt would be provided, confirming their purchase. After purchasing from our site, users would earn points which would be credited to their account.


### Guessing the Product's Price
Before purchasing a product, the user can guess the price of the product in order to earn a discount. The table below outlines how the product discounts are calculated  
| Guessed Price | Discount given |
| --- | --- |
| **Equals** to Product Price | 40% discount |
| **Close** to Product Price (± 20% of Product Price) | Up to *15% discount*, minimum *5% discount* |
| **Far** from Product Price (± 50% of Product Price) | Up to *5% discount* |
| **More than 50%** Product Price Away | *0% discount*, 20% chance of getting a *10% MARKUP* |

*All discounts are rounded up to the nearest 10-cents.*

However, if the user is *lazy* and chooses not to play the game, a random **markup** of *20 - 30%* will be added to their product cost.

When playing the game, users have **3 tries** to guess the price of the product. At the end of the game, the highest discount amount will be chosen. In addition, the user has only *100 seconds (1 minute and 40 seconds)* to complete the game.

### User Tiers
Users can earn points depending on how much they spend on the website. As the number of points increases, they may be *promoted* to a different Tier. Currently, the tiers do not have any significance, as no rewards are given depending on the user's tier. 
| Tier | (Minimum) Points |
| --- | --- |
| Platinum | 1000 |
| Gold | 400 |
| Silver | 100 |
| Bronze | 30 |
| Ordinary | 0 |

For every **$5 spent**, **1 point** will be awarded.

## Full List of Implimented Features
1. Account System. Allowing users to create and sign in to an account to manage their interactions with our site.
2. Product List. Our site has a wide array of sample products for users to take a look at.
3. Robust Search. Allows users to search for any product on our website, either using the product's name or category.
4. Cart System. If the user is interested in purchasing any product, they can add it to their cart, where they are able to 'purchase' it.
5. Points and Tiers System. By 'purchasing' products, users are able to earn points which they can reach different tiers.
6. Mobile Responsive Site. Allowing users to access our site from anywhere, using any device available to them.
7. Price Guessing Minigame. Users area able to earn discounts on products, allowing them to have fun while shopping.

## Potential Future Improvements
Due to time constrains, we are not able to fully impliment some features that we had in mind. These features are listed below:
1. Depending on the user's tier, certain rewards can be awarded to them. For example, vouchers on their birthday month.
2. Other gamemodes to allow users to earn discounts/vouchers with, increasing our selection of interactive games.
3. Functional vouchers, allowing users to claim rewards, for example, certain discounts off products, 1 for 1 deals, 1 free shirt, etc.

## Further Documentation
We have split the documentation for this project into other parts, which can be accessed using the links below.
1. [Design Process](./docs/designprocess.md) -- The idea behind the website and design choices
2. [Testing](./docs/testing.md) -- How the website can be tested
3. [Technologies Used](./docs/technologies.md) -- Outline of the various technologies used while creating the site

## Credits
Data from our website was collated from different sources, notably, [SHEIN](https://shein.com/) and [Platzi Fake Store API](https://fakeapi.platzi.com/), and can be viewed at this [link](https://assets.ethanchew.com/main.json). **NOTE: This JSON file is  very large, and may cause lag when opening it in a web browser**

**Images Used**  
- Home Page: Header Image from [Techwear UK](https://techwear-uk.com/)
- Profile Page: Profile picture from [FreeRange](https://freerangestock.com/photos/120579/business-man-profile-vector.html)