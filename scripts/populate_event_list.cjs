// Script to populate Firestore event_list from events_local.json
// Usage: node scripts/populate_event_list.cjs

const fs = require('fs');
const path = require('path');
const { initializeApp, getApps, getApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, updateDoc, doc, setDoc } = require('firebase/firestore');

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

async function main() {
  const jsonPath = path.join(__dirname, '../public/data/events_local.json');
  const raw = fs.readFileSync(jsonPath, 'utf8');
  const events = JSON.parse(raw);

  const eventsCollectionRef = collection(db, 'event_list');

  // Fetch all existing events and map by idx
  const existingDocs = await getDocs(eventsCollectionRef);
  const existingByIdx = {};
  existingDocs.docs.forEach(docSnap => {
    const data = docSnap.data();
    if (data.idx !== undefined) {
      existingByIdx[data.idx] = { id: docSnap.id, data };
    }
  });

  let added = 0, updated = 0;
  for (const event of events) {
    const found = existingByIdx[event.idx];
    if (found) {
      // Compare fields
      const isChanged = Object.keys(event).some(key => event[key] !== found.data[key]) ||
        Object.keys(found.data).some(key => event[key] !== found.data[key]);
      if (isChanged) {
        await setDoc(doc(db, 'event_list', found.id), event, { merge: false });
        console.log(`Updated idx=${event.idx}: ${event.title}`);
        updated++;
      } else {
        console.log(`No change for idx=${event.idx}`);
      }
    } else {
      await addDoc(eventsCollectionRef, event);
      console.log(`Added idx=${event.idx}: ${event.title}`);
      added++;
    }
  }
  // Delete any docs in Firestore not present in local events
  const localIdxSet = new Set(events.map(e => e.idx));
  for (const idx in existingByIdx) {
    if (!localIdxSet.has(Number(idx))) {
      await setDoc(doc(db, 'event_list', existingByIdx[idx].id), {}, { merge: false }); // Overwrite with empty
      console.log(`Deleted idx=${idx} (not in local events)`);
    }
  }
  console.log(`Done. ${added} added, ${updated} updated, ${Object.keys(existingByIdx).length - localIdxSet.size} deleted.`);
}

main().catch(console.error);
