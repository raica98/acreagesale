import React from "react";
import { Shield, CheckCircle, UserCheck, Award } from "lucide-react";

export const VerifiedSellersSubsection = (): JSX.Element => {
  const verificationSteps = [
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "We verify each seller's identity through secure documentation to ensure legitimacy."
    },
    {
      icon: Shield,
      title: "Property Ownership",
      description: "All listings are checked against public records to confirm ownership rights."
    },
    {
      icon: CheckCircle,
      title: "Background Screening",
      description: "We conduct thorough background checks to protect buyers from fraudulent activity."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Each property listing undergoes review to ensure accuracy and completeness."
    }
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-[#329cf9]" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Verified Sellers You Can Trust
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            We take extra steps to verify buyers and sellers, ensuring a safe and secure transaction for everyone involved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {verificationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#329cf9] group"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#329cf9] to-[#1e40af] rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 lg:mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Join Our Network of Verified Sellers
              </h3>
              <p className="text-gray-600 text-lg">
                Get verified today and gain access to serious buyers who value transparency and trust
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Verified Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
