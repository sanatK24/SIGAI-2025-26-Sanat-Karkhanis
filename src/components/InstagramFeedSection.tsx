"use client";
import { useEffect, useState, useRef } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD71xxKma112v9XYlbcrIHn-t50jZ3YbmI",
  authDomain: "sigaibackend.firebaseapp.com",
  projectId: "sigaibackend",
  storageBucket: "sigaibackend.firebasestorage.app",
  messagingSenderId: "817943217733",
  appId: "1:817943217733:web:30fc298499cbe64b54052c"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const db = getFirestore(app);

export default function InstagramFeedSection() {
  const [embedHtml, setEmbedHtml] = useState<string | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    async function fetchEmbed() {
      const querySnapshot = await getDocs(collection(db, "instagram_posts"));
      const posts = querySnapshot.docs.map(doc => doc.data());
      // Sort by 'number' field descending to get latest first
      posts.sort((a, b) => (b.number ?? 0) - (a.number ?? 0));
      setEmbedHtml(posts.length > 0 ? posts[0].embedHtml : null);
    }
    fetchEmbed();
  }, []);

  // Ensure Instagram embed.js script runs after every update
  useEffect(() => {
    if (!embedHtml) return;
    // Remove previous script if exists
    if (scriptRef.current) {
      document.body.removeChild(scriptRef.current);
      scriptRef.current = null;
    }
    // If embed.js is already loaded, reprocess embeds
    if ((window as any).instgrm && typeof (window as any).instgrm.Embeds.process === 'function') {
      (window as any).instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if ((window as any).instgrm && typeof (window as any).instgrm.Embeds.process === 'function') {
          (window as any).instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
      scriptRef.current = script;
    }
    // Cleanup on unmount
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [embedHtml]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black/80 to-black text-white">
      <div className="container mx-auto px-4 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Instagram Section */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-pink-400">Follow Us On Instagram</h2>
            <p className="text-lg text-center text-gray-300 mb-2 max-w-md">
              Want more AI inspiration, event updates, and behind-the-scenes fun?<br />
              <span className="font-semibold text-pink-400">Tap follow and never miss a moment!</span>
            </p>
            <a
              href="https://www.instagram.com/raitacm.sigai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg transition-colors duration-200 text-lg mt-2"
            >
              <span role="img" aria-label="Instagram" className="mr-2">📸</span> Follow @raitacm.sigai
            </a>
          </div>
          {/* LinkedIn Section */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-blue-400">Connect With Us On LinkedIn</h2>
            <p className="text-lg text-center text-gray-300 mb-2 max-w-md">
              Grow your network, discover opportunities, and stay updated with RAIT ACM SIGAI on LinkedIn!<br />
              <span className="font-semibold text-blue-400">Expand your professional circle and join the conversation.</span>
            </p>
            <a
              href="https://www.linkedin.com/in/rait-acm-sigai-student-chapter-96a248322/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-colors duration-200 text-lg mt-2"
            >
              <span role="img" aria-label="LinkedIn" className="mr-2">💼</span> Connect on LinkedIn
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {!embedHtml ? (
            <div className="col-span-full text-center text-lg text-gray-400 py-12">
              No Instagram posts yet. Stay tuned!
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden shadow-lg bg-white/5 border border-white/10 p-4 flex items-center justify-center"
              style={{ maxWidth: 350, margin: '0 auto', height: 'auto' }}
            >
              <div
                style={{ width: '100%', maxWidth: 320, margin: '0 auto', height: 'auto' }}
                dangerouslySetInnerHTML={{ __html: embedHtml }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}