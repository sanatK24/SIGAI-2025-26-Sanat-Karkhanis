import React from "react";

export const metadata = {
  title: "Terms & Conditions | RAIT ACM SIGAI",
  description: "Read the terms and conditions for using the RAIT ACM SIGAI Student Chapter website."
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-text-secondary">
      <h1 className="text-3xl font-bold text-white mb-6">Terms &amp; Conditions</h1>
      <p className="mb-4">By accessing or using the RAIT ACM SIGAI Student Chapter website ("Site"), you agree to comply with and be bound by these Terms &amp; Conditions. Please read them carefully.</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Use of Site</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You agree to use the Site for lawful purposes only.</li>
        <li>You must not misuse, disrupt, or attempt to gain unauthorized access to the Site or its services.</li>
      </ul>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Intellectual Property</h2>
      <p className="mb-4">All content on this Site, including text, images, logos, and graphics, is the property of RAIT ACM SIGAI Student Chapter or its licensors and is protected by applicable copyright laws.</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Event Registration</h2>
      <p className="mb-4">By registering for events, you agree to provide accurate information and abide by event-specific rules and guidelines.</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Limitation of Liability</h2>
      <p className="mb-4">We are not liable for any damages or losses resulting from your use of the Site or participation in our events.</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Changes to Terms</h2>
      <p className="mb-4">We may update these Terms &amp; Conditions at any time. Continued use of the Site constitutes acceptance of the revised terms.</p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">Contact Us</h2>
      <p>If you have any questions about these Terms &amp; Conditions, please contact us at <a href="mailto:raitacmsigai@gmail.com" className="text-primary underline">raitacmsigai@gmail.com</a>.</p>
    </div>
  );
}
