import { SearchIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const GroupSubsection = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    "AI Auto-Listing saves hours to days of work",
    "Market Analyzer shows hottest investment areas",
    "Buyer Backtesting reveals 10-year ROI potential",
    "Custom Land Consulting for development scenarios"
  ];

  // Rotate features every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to properties page with search term as URL parameter
      navigate(`/properties?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // Navigate to properties page without search term
      navigate('/properties');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as any);
    }
  };

  return (
    <section className="w-full pb-16 sm:pb-20 lg:pb-28 flex flex-col items-center relative bg-gray-50 min-h-screen">
      {/* Content Container - overlaps image */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* H1 Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-6 px-4 mt-12">
          Acreage for Sale – Buy & Sell Land Nationwide
        </h1>

        {/* Subheading */}
        <div className="relative mb-8">
          <p className="text-xl sm:text-2xl text-gray-600 text-center font-medium">
            The #1 AI-Powered Marketplace for Acreage Buyers & Sellers
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl px-4 mb-8">
          <form onSubmit={handleSearch} className="flex items-center shadow-lg rounded-lg overflow-hidden bg-white border border-gray-200">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pl-12 h-12 bg-white border-0 font-medium text-base focus:ring-0 focus:outline-none placeholder:text-gray-400 rounded-l-lg"
                placeholder="Search by location"
                autoComplete="off"
              />
            </div>
            <Button
              type="submit"
              className="h-12 px-8 bg-[#329cf9] hover:bg-[#2563eb] text-white font-semibold text-base border-0 transition-all duration-300 hover:shadow-lg rounded-r-lg"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Description */}
        <div className="text-center mb-12 px-4">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Acreage Sale is a dedicated marketplace for acreage for sale across the United States. Browse verified land listings, buy acreage directly from owners, or list your land for sale using powerful AI tools designed for serious buyers and sellers.
          </p>
        </div>
      </div>

      {/* Center Image - Full Screen Width - positioned to overlap with content above */}
      <div className="w-screen mb-8 -mt-20 sm:-mt-56">
        <div className="relative w-full overflow-hidden bg-gray-200 animate-pulse">
          <img
            src="https://pub-5b25e147b3d84e5d8425fe1c3e787cd8.r2.dev/image%20copy.png"
            alt="Acreage sale - buy off-market acreages for sale by owner"
            className="w-full h-auto object-contain sm:object-cover min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
            onLoad={(e) => {
              e.currentTarget.parentElement?.classList.remove('animate-pulse', 'bg-gray-200');
            }}
          />
        </div>
      </div>
    </section>
  );
};