import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCv3I6FoW2fqU4wVw5uTr6St3xjmy-lAT8",
    authDomain: "fed-assignment-2.firebaseapp.com",
    projectId: "fed-assignment-2",
    storageBucket: "fed-assignment-2.appspot.com",
    messagingSenderId: "425459656834",
    appId: "1:425459656834:web:54cc033528b875dcd16c9b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);