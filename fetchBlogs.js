// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Firebase configuration
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
// Fetch and Display Blogs
async function fetchAndDisplayBlogs() {
    const blogContainer = document.getElementById('blog-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block'; // Show loading spinner

    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));

        // Clear container before appending new content
        blogContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const blog = doc.data();

            // Use a default image if imageUrl is missing or empty
            const imageUrl = blog.imageUrl && blog.imageUrl.trim() !== ''
                ? blog.imageUrl
                : 'Images/Disena Digitals .png';

            const blogCard = document.createElement('div');
            blogCard.className = 'col-md-6 col-lg-4';

            blogCard.innerHTML = `
                <div class="blog-card mb-4 shadow-sm">
                    <img src="${imageUrl}" class="card-img-top" alt="${blog.title || 'Blog Image'}">
                    <div class="card-body">
                        <h4 class="card-title">${blog.title || 'Untitled Blog'}</h4>
                        <p class="card-text">${blog.content ? blog.content.substring(0, 100) + '...' : 'No content available.'}</p>
                        <a href="FullBlog.html?id=${doc.id}" class="btn btn-outline-primary">Read More</a>
                    </div>
                </div>
            `;
            blogContainer.appendChild(blogCard);
        });

    } catch (error) {
        console.error("Error fetching blogs: ", error);
        blogContainer.innerHTML = `<p class="text-danger">Failed to load blogs. Please try again later.</p>`;
    } finally {
        loadingSpinner.style.display = 'none'; // Hide loading spinner
    }
}

// Call the function to load blogs
fetchAndDisplayBlogs();
