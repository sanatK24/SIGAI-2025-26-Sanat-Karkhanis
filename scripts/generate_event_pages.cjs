// Script to generate static event pages from Firestore event_list
// Usage: node scripts/generate_event_pages.cjs

const fs = require('fs');
const path = require('path');
const { initializeApp, getApps, getApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Firebase config (replace with actual credentials)
const firebaseConfig = {
  apiKey: "AIzaSyD71xxKma112v9XYlbcrIHn-t50jZ3YbmI",
  authDomain: "sigaibackend.firebaseapp.com",
  projectId: "sigaibackend",
  storageBucket: "sigaibackend.firebasestorage.app",
  messagingSenderId: "817943217733",
  appId: "1:817943217733:web:30fc298499cbe64b54052c"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Helper: Convert event object to TypeScript object string
function eventToTSObject(event) {
  // Handles nested objects/arrays, outputs valid TypeScript
  return JSON.stringify(event, null, 2);
}


// Generate minimal event page that imports EventTemplate and injects event data
const eventPageTemplate = (event) => `
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = ${eventToTSObject(event)};

export default function Page() {
  return <EventTemplate event={event} />;
}
`;

async function main() {
  const eventsCollectionRef = collection(db, 'event_list');
  const querySnapshot = await getDocs(eventsCollectionRef);
  const events = querySnapshot.docs.map(doc => doc.data());

  const outDir = path.join(__dirname, '../src/app/events');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  let filled = 0;
  for (const event of events) {
    const filePath = path.join(outDir, `${event.idx}`, 'page.tsx');
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(filePath, eventPageTemplate(event), 'utf8');
    filled++;
  }
  console.log(`fetched ${events.length}, filled ${filled}, generation complete of ${filled} with its data`);
}

main().catch(console.error);
