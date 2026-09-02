
// Script to create Firestore collection 'instagram_posts' and add posts from JSON
// Run this with Node.js after setting up Firebase client SDK

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const fs = require('fs');

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD71xxKma112v9XYlbcrIHn-t50jZ3YbmI",
  authDomain: "sigaibackend.firebaseapp.com",
  projectId: "sigaibackend",
  storageBucket: "sigaibackend.firebasestorage.app",
  messagingSenderId: "817943217733",
  appId: "1:817943217733:web:30fc298499cbe64b54052c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read JSON file
const posts = JSON.parse(fs.readFileSync('./public/data/instagram_posts.json', 'utf8'));

async function addInstagramPosts() {
  for (const post of posts) {
    await addDoc(collection(db, 'instagram_posts'), post);
    console.log('Added:', post);
  }
  console.log('All posts added!');
}

addInstagramPosts();
