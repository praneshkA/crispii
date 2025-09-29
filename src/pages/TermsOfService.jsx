import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-lg mb-2">
        By accessing and using the Crispii website, you agree to comply with our Terms of Service.
      </p>
      <ul className="list-disc list-inside text-lg">
        <li>All content on this website is for personal use only and cannot be reproduced without permission.</li>
        <li>Prices, product availability, and promotions are subject to change without notice.</li>
        <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
        <li>Any disputes will be governed by the laws of India.</li>
      </ul>
      <p className="text-lg mt-2">For any questions regarding these terms, please contact us at <a href="mailto:crispii_snacks@yahoo.com" className="underline">crispii_snacks@yahoo.com</a>.</p>
    </div>
  );
};

export default TermsOfService;
