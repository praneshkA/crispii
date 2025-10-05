import React from "react";

const ReturnExchange = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Return & Exchange Policy
      </h1>
      <p className="text-lg mb-4 text-gray-700 leading-relaxed">
        At <strong>Crispii</strong>, we take great care to ensure that every product
        reaches you in perfect condition. Due to the nature of our food products,
        we do not accept returns, replacements, or exchanges once an order has been
        delivered.
      </p>
      <p className="text-lg mb-4 text-gray-700 leading-relaxed">
        We encourage customers to review their orders carefully before confirming
        the purchase. All sales are final.
      </p>
      <p className="text-lg mb-4 text-gray-700 leading-relaxed">
        However, if you receive a damaged, defective, or incorrect item, please
        contact us within <strong>24 hours of delivery</strong> with relevant
        details and supporting photos. Our team will review the issue and assist
        you promptly.
      </p>
      <p className="text-lg mb-4 text-gray-700 leading-relaxed">
        You can reach us at{" "}
        <a
          href="mailto:crispii_snacks@yahoo.com"
          className="underline text-blue-600 hover:text-blue-800"
        >
          crispii_snacks@yahoo.com
        </a>{" "}
        or call us at{" "}
        <span className="font-semibold">8248928998 / 9976121007</span> for
        assistance.
      </p>
      <p className="text-sm text-gray-500 italic mt-6">
        Thank you for your understanding and for choosing Crispii.
      </p>
    </div>
  );
};

export default ReturnExchange;
