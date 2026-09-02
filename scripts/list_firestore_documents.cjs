// Script to list all documents from a Firestore collection (prompts for collection name)
// Usage: node scripts/list_firestore_documents.cjs

const admin = require('firebase-admin');
const readline = require('readline');
const path = require('path');
const fs = require('fs');

// Path to your service account key JSON file
const serviceAccountPath = path.join(__dirname, './sigaibackend-firebase-adminsdk-fbsvc-afde8602c0.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('Service account key file not found at:', serviceAccountPath);
  process.exit(1);
}

let app;
try {
  app = admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
  });
} catch (e) {
  if (e.code === 'app/duplicate-app') {
    app = admin.app();
  } else {
    console.error('Failed to initialize Firebase Admin SDK:', e.message);
    process.exit(1);
  }
}

const db = admin.firestore();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter Firestore collection name: ', async (collectionName) => {
  try {
    const snapshot = await db.collection(collectionName).get();
    if (snapshot.empty) {
      console.log(`No documents found in collection "${collectionName}".`);
    } else {
      console.log(`Documents in collection "${collectionName}":`);
      snapshot.forEach(doc => {
        console.log(`- ${doc.id}:`, doc.data());
      });
    }
  } catch (err) {
    console.error('Error fetching documents:', err.message);
  }
  rl.close();
  process.exit(0);
});
