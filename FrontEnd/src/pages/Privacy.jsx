import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="h-60 flex items-center justify-center bg-black/70 text-center">
        <h1 className="text-5xl font-bold">Privacy Policy</h1>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-300 space-y-8">
        <p>
          Your privacy matters to us. This policy explains how we collect and
          use your information.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Information We Collect
          </h2>
          <p>
            We collect basic details such as name, phone number, address, and
            order history to process your orders.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            How We Use Data
          </h2>
          <p>
            Your data is used to manage orders, improve service, and ensure
            smooth delivery.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Data Protection
          </h2>
          <p>
            We take reasonable steps to protect your data and prevent
            unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Sharing Information
          </h2>
          <p>
            We do not sell your data. Information may only be shared with riders
            for delivery purposes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Cookies
          </h2>
          <p>
            We may use cookies to improve user experience and performance of the
            platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            User Rights
          </h2>
          <p>
            You can request to update or delete your information by contacting
            us.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;