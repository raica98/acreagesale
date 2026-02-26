import React from 'react';
import { Link } from 'react-router-dom';

export function SubmitProperty() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Submit Your Property for Quick Sale
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Get a fair cash offer for your vacant land in 24-48 hours
            </p>
          </div>

          <div className="mb-12">
            <img
              src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Submit your vacant land property for sale"
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">How It Works</h2>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Submit Property Details</h3>
                  <p className="text-slate-700">
                    Fill out our simple form with basic information about your land including location,
                    size, and condition. Takes less than 5 minutes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Receive Cash Offer</h3>
                  <p className="text-slate-700">
                    Our team reviews your property and provides a fair, no-obligation cash offer
                    within 24-48 hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Close Quick & Easy</h3>
                  <p className="text-slate-700">
                    Accept the offer and close on your timeline. We handle all paperwork and can
                    close in as little as 7 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Why Submit Your Property?</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>No fees, commissions, or hidden costs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Fast cash offers within 24-48 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Close on your timeline - as fast as 7 days</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>We buy land in any condition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>No repairs or cleanup required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Professional, transparent process</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                to="/add-listing"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Submit Your Property Now
              </Link>
              <p className="text-slate-500 mt-4">No obligation. Get your offer in 24-48 hours.</p>
            </div>
          </div>

          <div className="bg-slate-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">How quickly can I get an offer?</h4>
                <p className="text-slate-700">Most property submissions receive an offer within 24-48 hours.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Are there any fees?</h4>
                <p className="text-slate-700">No fees, commissions, or hidden costs. The offer you receive is what you keep.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">What types of land do you buy?</h4>
                <p className="text-slate-700">We buy all types: residential lots, agricultural land, recreational property, commercial land, and more.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
