import React from "react";

const ReturnExchange = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Return & Exchange Policy</h1>
      <p className="text-lg mb-2">
        Your satisfaction is our priority. If you are not completely happy with your purchase, we offer easy returns and exchanges.
      </p>
      <ul className="list-disc list-inside text-lg">
        <li>Returns/exchanges are accepted within 7 days of delivery.</li>
        <li>Products must be unopened, unused, and in original packaging.</li>
        <li>To initiate a return, please contact us at <a href="mailto:crispii_snacks@yahoo.com" className="underline">crispii_snacks@yahoo.com</a> or call 8248928998 / 9976121007.</li>
        <li>Refunds will be processed within 5 business days after we receive the returned items.</li>
      </ul>
    </div>
  );
};

export default ReturnExchange;
