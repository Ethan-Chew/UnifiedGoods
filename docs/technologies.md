# Technologies
When creating this website, we used multiple APIs and libraries in order to add more functionality to our project.
1. [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) -- NoSQL Database for storing user data
2. [Tailwind CSS](https://tailwindcss.com/) -- Chosen CSS Framework
3. [Feather Icons](https://feathericons.com/) -- Open Sourced Icons
4. [JSHint](https://jshint.com/), [W3C HTML Validator](https://validator.w3.org/), [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) -- Validating our codebase to reduce errors
5. [Normalize.css](https://necolas.github.io/normalize.css/) -- Allows consistent rendering of HTML elements
6. [Figma](https://www.figma.com/) -- Wireframe Design
7. HTML, CSS and JavaScript -- Languages used to build, style and adding functionality into our website

Originally, we started this project using [RestDB](https://restdb.io/) as our main database for storing user data. However, due to API Rate Limit constrains, we eventually moved over to using Firebase's Cloud Firestore instead.

To ensure reliability in our products database, we created our own database of products, with data and images taken from the web. This 'database' is essentially a huge JSON file containing about 250 unique products. You can access this JSON file [here](https://assets.ethanchew.com/main.json).

## Running the Project Locally
Since this project was created as part of a school assignment, after submission and grading of this project, the Firebase Database will be restricted for both read and write operations.

In order to run this project on your own device, the following steps are required:
1. Sign in to [Firebase](https://console.firebase.google.com), and create a new Firebase Project
2. Enable Firebase Cloud Firestore, and start it in Test mode
3. Retrieve the relevant firebase config keys, and paste it into ```./js/api/firebase.js```