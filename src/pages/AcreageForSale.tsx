import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SharedNavigation } from '../components/ui/SharedNavigation';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';
import { MapPin, DollarSign, Maximize2 } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  size: number;
  city: string;
  state: string;
  county: string;
  images: string[];
}

export function AcreageForSale() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('id, title, price, size, city, state, county, images')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(12);

        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <SEO
        title="Acreage for Sale | Buy Land Nationwide – Acreage Sale"
        description="Find acreage for sale across the United States. Browse thousands of verified land listings from private owners. Search by location, price, size, and features."
        keywords="acreage for sale, buy acreage, land for sale, acreage listings, buy land, rural property, vacant land for sale"
        canonical="https://acreagesale.com/acreage-for-sale"
      />
      <div className="bg-white min-h-screen">
        <SharedNavigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-lg max-w-none">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Acreage for Sale Across America
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Whether you're looking to build your dream home, start a farm, invest in land, or simply own a piece of America, finding the right acreage for sale is the first step. Acreage Sale connects you with verified land listings from private owners across all 50 states.
            </p>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Buy Acreage?</h2>
              <p className="text-gray-700 mb-4">
                Purchasing acreage offers unique opportunities that traditional real estate cannot provide. Land ownership gives you complete freedom to design your ideal lifestyle, whether that means building a custom home, starting an agricultural business, or holding the property as a long-term investment.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike developed properties, raw acreage for sale allows you to create exactly what you envision. You're not limited by existing structures or previous owners' choices. From small hobby farms to large ranches, the possibilities are endless when you buy acreage.
              </p>
              <p className="text-gray-700 mb-6">
                Land has historically been one of the most stable investments. As Mark Twain famously said, "Buy land, they're not making it anymore." Whether you're looking for recreational land, agricultural acreage, or development opportunities, owning land provides tangible value that appreciates over time.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Acreage for Sale</h2>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Residential Acreage</h3>
              <p className="text-gray-700 mb-4">
                Residential acreage typically ranges from 1 to 10 acres and is perfect for building a custom home with plenty of space. These properties often come with road access, utilities nearby, and are located in areas zoned for residential development. Buyers looking for acreage for sale in this category want privacy, room for gardens, space for children to play, or areas for hobbies like raising chickens or horses.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Agricultural Land</h3>
              <p className="text-gray-700 mb-4">
                Agricultural acreage for sale includes farms, ranches, and cropland. These properties range from small hobby farms of 5-20 acres to large commercial operations spanning hundreds or thousands of acres. Agricultural land buyers look for fertile soil, water rights, existing infrastructure like barns and fencing, and suitable climate conditions for their intended crops or livestock.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Recreational Land</h3>
              <p className="text-gray-700 mb-4">
                Recreational acreage is purchased for hunting, fishing, camping, or outdoor activities. These properties may be raw, undeveloped land in scenic locations. Buyers of recreational acreage for sale prioritize features like wooded areas, water frontage, wildlife populations, and scenic views rather than development potential.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Investment and Development Land</h3>
              <p className="text-gray-700 mb-6">
                Investment acreage is purchased with the intention of future development or resale at a profit. This includes land in the path of growth, properties suitable for subdivision, or acreage with commercial potential. Savvy investors look for acreage for sale in areas with strong population growth, planned infrastructure improvements, or changing zoning regulations.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Find Acreage for Sale</h2>
              <p className="text-gray-700 mb-4">
                Finding the right acreage requires research and patience. Start by determining your budget, intended use, and preferred location. Consider factors like climate, proximity to cities, school districts, and local regulations.
              </p>
              <p className="text-gray-700 mb-4">
                Acreage Sale makes the search process simple by providing detailed listings with photos, property descriptions, and direct contact with sellers. Our platform features acreage for sale across all states, from coastal properties to mountain land, desert acreage to fertile farmland.
              </p>
              <p className="text-gray-700 mb-6">
                Use our advanced search filters to narrow down options by price, size, location, and features. Each listing includes comprehensive information about the property, allowing you to make informed decisions before reaching out to sellers.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What to Look for When Buying Acreage</h2>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Access and Roads</h3>
                <p className="text-gray-700">
                  Verify that the acreage for sale has legal access via public roads or recorded easements. Landlocked properties without access rights can be difficult or impossible to develop. Check road conditions and whether they're maintained year-round.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Utilities</h3>
                <p className="text-gray-700">
                  Determine what utilities are available. Are electric, water, and sewer services already on the property or nearby? If not, factor in the cost of drilling wells, installing septic systems, or running power lines when evaluating acreage for sale.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Zoning and Restrictions</h3>
                <p className="text-gray-700">
                  Research local zoning laws and any deed restrictions. Confirm that your intended use is permitted. Some acreage for sale may be restricted to agricultural use only, while other properties allow residential or commercial development.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Water Rights and Resources</h3>
                <p className="text-gray-700">
                  Water availability is crucial, especially for agricultural acreage. Investigate water rights, well productivity, surface water sources, and annual rainfall. In some western states, water rights are separate from land ownership and must be purchased separately.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Soil Quality and Topography</h3>
                <p className="text-gray-700">
                  For agricultural or residential development, soil quality matters. Get a soil test to assess suitability for septic systems or farming. Review topography for drainage issues, flood zones, and buildable areas.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Financing Acreage Purchases</h2>
              <p className="text-gray-700 mb-4">
                Financing raw land differs from traditional home mortgages. Many conventional lenders are hesitant to finance undeveloped acreage for sale. However, several options exist for buyers:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Land loans from specialized lenders who focus on rural and agricultural properties</li>
                <li>USDA loans for qualified buyers in rural areas</li>
                <li>Owner financing, where the seller provides the loan directly</li>
                <li>Home equity loans or lines of credit for buyers with existing property equity</li>
                <li>Cash purchases, which offer negotiating power and simpler transactions</li>
              </ul>
              <p className="text-gray-700">
                Many sellers of acreage for sale on our platform offer owner financing, which can provide more flexible terms and easier qualification compared to traditional bank loans.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular States for Acreage</h2>
              <p className="text-gray-700 mb-4">
                Every state offers unique advantages for land buyers. Here are some of the most popular destinations for those searching for acreage for sale:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Texas</h3>
                  <p className="text-gray-700">
                    Affordable land, diverse landscapes, no state income tax, and strong property rights make Texas a top choice for acreage buyers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Florida</h3>
                  <p className="text-gray-700">
                    Year-round warm weather, growing population, and opportunities for agricultural or recreational use attract buyers to Florida acreage.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">California</h3>
                  <p className="text-gray-700">
                    Despite higher prices, California offers incredible diversity from coastal properties to mountain land and desert acreage.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Tennessee</h3>
                  <p className="text-gray-700">
                    Beautiful scenery, affordable prices, low taxes, and a growing economy make Tennessee popular for acreage for sale.
                  </p>
                </div>
              </div>

              <p className="text-gray-700">
                Browse our state-specific pages to find acreage for sale in your preferred location, from coast to coast.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Acreage Sale?</h2>
              <p className="text-gray-700 mb-4">
                Acreage Sale connects buyers directly with property owners, eliminating middlemen and reducing costs. Our platform features verified listings with detailed information, high-quality photos, and direct seller contact.
              </p>
              <p className="text-gray-700 mb-4">
                We use advanced AI tools to help buyers analyze properties, understand market trends, and make informed decisions. Our marketplace is designed for serious land buyers and sellers who want transparency, efficiency, and fair pricing.
              </p>
              <p className="text-gray-700">
                Start your search today and discover acreage for sale that matches your vision for land ownership.
              </p>
            </section>
          </article>

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Acreage for Sale</h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Link
                    key={property.id}
                    to={`/property/${property.id}`}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-200">
                      {property.images?.[0] && (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {property.title}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{property.city}, {property.state}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize2 className="w-4 h-4" />
                          <span>{property.size} acres</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold text-gray-900">
                            ${property.price?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <Link
                to="/properties"
                className="inline-block bg-[#329cf9] hover:bg-[#2563eb] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View All Acreage Listings
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
