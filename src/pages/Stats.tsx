import React from 'react';
import { Link } from 'react-router-dom';

export function Stats() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Land Sales Statistics & Market Data
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Real-time insights into the vacant land market across America
            </p>
          </div>

          <div className="mb-12">
            <img
              src="https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Vacant land statistics and market data"
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Market Overview</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl font-bold text-blue-600 mb-2">$5.2B</div>
                <div className="text-slate-600">Total Market Value</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-slate-600">Success Rate</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">45K+</div>
                <div className="text-slate-600">Properties Sold</div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Statistics</h3>
              <ul className="space-y-3 text-slate-700">
                <li>Average time to close: 14-21 days</li>
                <li>Most popular land types: Residential development, recreational, agricultural</li>
                <li>Top selling states: Texas, Florida, California, Arizona, Colorado</li>
                <li>Average property size: 5-20 acres</li>
                <li>Cash buyers: 85% of all transactions</li>
              </ul>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">2025 Market Trends</h3>
              <p className="text-slate-700 mb-4">
                The vacant land market continues to show strong growth in 2025, with increasing demand
                for rural properties, recreational land, and development opportunities. Remote work trends
                have driven interest in larger parcels outside major metro areas.
              </p>
              <p className="text-slate-700">
                Investment in raw land remains attractive due to low maintenance costs, tax advantages,
                and potential for long-term appreciation. Development pressure in suburban areas continues
                to create opportunities for land sellers.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/properties"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Browse Available Properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
