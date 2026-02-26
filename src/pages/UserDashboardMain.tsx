import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function UserDashboardMain() {
    <SEO slug="user-dashboard-main" />
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Manage Your Land Portfolio
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Track your properties, offers, and sales all in one place
            </p>
          </div>

          <div className="mb-12">
            <img
              src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="User dashboard for land property management"
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Dashboard Features</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="text-blue-600 mb-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Property Listings</h3>
                <p className="text-slate-700">
                  View and manage all your listed properties in one central location
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="text-green-600 mb-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Offers & Sales</h3>
                <p className="text-slate-700">
                  Track incoming offers and manage your sales pipeline
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-purple-600 mb-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Analytics</h3>
                <p className="text-slate-700">
                  View detailed statistics and insights about your properties
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <div className="text-orange-600 mb-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Messages</h3>
                <p className="text-slate-700">
                  Communicate with buyers and manage all inquiries
                </p>
              </div>
            </div>

            <div className="bg-slate-100 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/add-listing"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Add New Property
                </Link>
                <Link
                  to="/properties"
                  className="bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  Browse Properties
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  View Full Dashboard
                </Link>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Getting Started</h3>
              <p className="text-slate-700 mb-4">
                Your dashboard is your central hub for managing your land sales. Here you can:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>Add new property listings with photos and details</li>
                <li>Track views, inquiries, and interest in your properties</li>
                <li>Review and respond to offers from buyers</li>
                <li>Manage your sales pipeline from listing to closing</li>
                <li>Access market data and pricing insights</li>
                <li>Communicate with interested buyers</li>
                <li>Update property information and pricing</li>
              </ul>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Need Help?</h3>
              <p className="text-slate-700">
                Our support team is available to help you make the most of your dashboard. Whether you're
                listing your first property or managing multiple sales, we're here to ensure your success.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">14-21</div>
              <div className="text-slate-600">Days to Close</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">45K+</div>
              <div className="text-slate-600">Properties Sold</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
