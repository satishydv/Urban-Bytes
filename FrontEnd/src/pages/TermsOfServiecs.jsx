import React from "react";

const TermsOfServices = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="h-60 flex items-center justify-center bg-black/70 text-center">
        <h1 className="text-5xl font-bold">Terms of Service</h1>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-300 space-y-8">
        <p>
          By using our platform, you agree to follow these terms. We are here to
          provide quality food and a smooth ordering experience.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Orders & Service
          </h2>
          <p>
            All orders depend on availability. Once confirmed, we begin
            preparation immediately to deliver fresh food.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Order Status
          </h2>
          <p>
            Orders go through stages: placed, confirmed, preparation, on the
            way, and delivered. Status updates are provided for transparency.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Cancellation
          </h2>
          <p>
            Orders can only be canceled before preparation starts. Once food is
            being prepared, cancellation may not be possible.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Delivery
          </h2>
          <p>
            Delivery times are estimated. Delays may occur due to traffic,
            weather, or high demand.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            User Responsibility
          </h2>
          <p>
            Provide correct address and contact details. Failure to receive an
            order may still be charged.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Food Quality
          </h2>
          <p>
            We focus on fresh and quality food. If there is any issue, report it
            promptly for resolution.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TermsOfServices;