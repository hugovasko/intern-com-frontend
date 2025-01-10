import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to Intern.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. 
        Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
      <p className="mb-4">
        We may collect information about you in a variety of ways. The information we may collect via the website includes:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Personal Data: Name, email address, and similar contact details.</li>
        <li>Usage Data: Details about how you use our website.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Provide, operate, and maintain our website.</li>
        <li>Communicate with you, including customer service.</li>
        <li>Improve user experience and website performance.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or share your personal information with third parties except as necessary to provide the services you requested.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us at support@intern.com.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us at:
        <a href="mailto:support@intern.com" className="text-blue-500 underline"> support@intern.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
