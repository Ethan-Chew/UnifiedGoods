# UnifiedGoods - A eCommerce Platform
**UnifiedGoods** was created by [Ethan Chew](https://github.com/Ethan-Chew) and [Jefferson Low](https://github.com/Jefflyl98).  
<br>
**Disclaimer:** This website is solely created for a school assignment, and all information and names mentioned are entirely fictional, any resemblence to real-life entities is purely a coincidence. All content in this site does not act as real-world information.

## Features
### Working E-Commerce Website
UnifiedGoods closely mimics a fully-functional e-commerce website, allowing users to search, view, sort and buy products. 


### Guessing the Product's Price
Before purchasing a product, the user can guess the price of the product in order to earn a discount. The table below outlines how the product discounts are calculated  
| Guessed Price | Discount given |
| --- | --- |
| **Equals** to Product Price | 40% discount |
| **Close** to Product Price (± 20% of Product Price) | Up to *15% discount*, minimum *5% discount* |
| **Far** from Product Price (± 50% of Product Price) | Up to *5% discount* |
| **More than 50%** Product Price Away | *0% discount*, 20% chance of getting a *10% MARKUP* |

<sup><sub>*All discounts are rounded up to the nearest 10-cents.*</sub></sup>

However, if the user is *lazy* and chooses not to play the game, a random **markup** of *20 - 30%* will be added to their product cost.

### User Tiers
Users can earn points depending on how much they spend on the website. As the number of points increases, they may be *promoted* to a different Tier. 
| Tier | (Minimum) Points |
| --- | --- |
| Platinum | 1000 |
| Gold | 400 |
| Silver | 100 |
| Bronze | 30 |
| Ordinary | 0 |

For every **$5 spent**, **1 point** will be awarded.

## Full List of Implimented Features
1. Functional Login and Create Account Pages
2. Search for products by name and category
3. 

## Potential Future Improvements
1. Depending on the user's tier, certain rewards can be awarded to them. For example, vouchers on their birthday month.

## Further Documentation
We have split the documentation for this project into other parts, which can be accessed using the links below.
1. [Design Process](./docs/designprocess.md) -- The idea behind the website and design choices
2. [Testing](./docs/testing.md) -- How the website can be tested
3. [Technologies Used](./docs/testing.md) -- Outline of the various technologies used while creating the site

## Credits
The [data](https://assets.ethanchew.com/main.json) used in this website has been taken from various sources, such as the SHEIN website. 
On our Profile Page, we have taken the profile picture from [FreeRange](https://freerangestock.com/photos/120579/business-man-profile-vector.html).