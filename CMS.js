// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyAQXWhEuSn6pXb9dNo72D8_if8ggdX7XL8",
  
    authDomain: "disenadigitals.firebaseapp.com",
  
    projectId: "disenadigitals",
  
    storageBucket: "disenadigitals.firebasestorage.app",
  
    messagingSenderId: "446106948060",
  
    appId: "1:446106948060:web:94afd8f98bfc40ded8ff19",
  
    measurementId: "G-3H06QS4RPG"
  
  };
  
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to save the blog to Firebase
async function saveBlog(title, author, content, imageUrl, category) {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            title: title,
            author: author,
            content: content,
            imageUrl: imageUrl,
            category: category,
            createdAt: new Date().toISOString() // Save timestamp
        });
        console.log("Blog saved with ID: ", docRef.id);
        alert("Blog saved successfully!");
    } catch (error) {
        console.error("Error saving blog: ", error);
        alert("Failed to save blog. Please try again.");
    }
}

// Handle form submission
const blogForm = document.getElementById("blog-form");
blogForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form data
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const category = document.getElementById("category").value;

    // Save blog to Firebase
    await saveBlog(title, author, content, imageUrl, category);

    // Reset the form after submission
    blogForm.reset();
});
