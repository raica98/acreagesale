import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <SEO
        title="Page Not Found | AcreageSale"
        description="The page you're looking for doesn't exist."
        noindex={true}
      />

      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>

          <Link to="/properties">
            <Button variant="outline" className="px-8 py-6 text-lg">
              <Search className="w-5 h-5 mr-2" />
              Browse Properties
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Looking for something specific?
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link to="/sell-land-fast" className="text-blue-600 hover:underline">
                Sell Your Land Fast
              </Link>
            </li>
            <li>
              <Link to="/properties" className="text-blue-600 hover:underline">
                Browse All Properties
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-600 hover:underline">
                Learn About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-600 hover:underline">
                Contact Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
