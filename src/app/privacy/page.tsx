import React from "react";

export const metadata = {
  title: "Privacy Policy | RAIT ACM SIGAI",
  description: "Read the privacy policy for the RAIT ACM SIGAI Student Chapter website."
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-text-secondary">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <p className="mb-4">This Privacy Policy describes how RAIT ACM SIGAI Student Chapter ("we", "us", or "our") collects, uses, and protects your information when you use our website.</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Personal information you provide (such as name, email, phone) when registering for events or contacting us.</li>
        <li>Usage data such as pages visited, browser type, and device information.</li>
      </ul>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To provide and improve our services and events.</li>
        <li>To communicate with you regarding updates, events, or inquiries.</li>
        <li>To analyze website usage and enhance user experience.</li>
      </ul>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Information Sharing</h2>
      <p className="mb-4">We do not sell or share your personal information with third parties except as required by law or to facilitate our services (such as event registration platforms).</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Data Security</h2>
      <p className="mb-4">We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Your Rights</h2>
      <p className="mb-4">You may request to access, update, or delete your personal information by contacting us at <a href="mailto:raitacmsigai@gmail.com" className="text-primary underline">raitacmsigai@gmail.com</a>.</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Changes to This Policy</h2>
      <p className="mb-4">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:raitacmsigai@gmail.com" className="text-primary underline">raitacmsigai@gmail.com</a>.</p>
    </div>
  );
}
