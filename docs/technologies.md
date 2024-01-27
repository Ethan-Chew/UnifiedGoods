# Technologies
When creating this website, we used multiple APIs and libraries in order to add more functionality to our project.
1. [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) -- NoSQL Database for storing user data
2. [Tailwind CSS](https://tailwindcss.com/) -- Chosen CSS Framework
3. [Feather Icons](https://feathericons.com/) -- Open Sourced Icons

Originally, we started this project using [RestDB](https://restdb.io/) as our database for storing user data. However, due to API Call Limit constrains, we eventually moved over to using Firebase's Cloud Firestore instead.

To ensure reliability in our products database, we created our own database of products, with data and images taken from the web. This 'database' is essentially a huge JSON file containing about 250 unique products. You can access this JSON file [here](https://assets.ethanchew.com/main.json).