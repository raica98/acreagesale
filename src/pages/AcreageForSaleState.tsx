import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SharedNavigation } from '../components/ui/SharedNavigation';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';
import { MapPin, DollarSign, Maximize2 } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

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

interface StatePageProps {
  state: string;
  stateName: string;
  description: string;
}

export function AcreageForSaleState({ state, stateName, description }: StatePageProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('id, title, price, size, city, state, county, images')
          .eq('status', 'active')
          .eq('state', state)
          .order('created_at', { ascending: false })
          .limit(24);

        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [state]);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Acreage for Sale', path: '/acreage-for-sale' },
    { label: stateName, path: `/acreage-for-sale/${stateName.toLowerCase().replace(/ /g, '-')}` }
  ];

  return (
    <>
      <SEO
        title={`Acreage for Sale in ${stateName} | Buy Land in ${state} – Acreage Sale`}
        description={`Find acreage for sale in ${stateName}. Browse verified land listings from private owners across ${state}. Search by county, price, and size.`}
        keywords={`acreage for sale in ${stateName}, ${state} land for sale, buy land in ${state}, ${stateName} acreage, ${state} property`}
        canonical={`https://acreagesale.com/acreage-for-sale/${stateName.toLowerCase().replace(/ /g, '-')}`}
      />
      <div className="bg-white min-h-screen">
        <SharedNavigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={breadcrumbItems} />

          <article className="mt-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Acreage for Sale in {stateName}
            </h1>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {description}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Buy Acreage in {stateName}?</h2>
                <p className="text-gray-700 mb-4">
                  {stateName} offers diverse opportunities for land buyers, from residential acreage to agricultural land, recreational properties, and investment opportunities. Whether you're looking to build your dream home, start a farm, or invest in land for future development, {stateName} provides options across various price points and locations.
                </p>
                <p className="text-gray-700 mb-4">
                  The state's landscape varies from region to region, offering everything from wooded properties to open plains, waterfront acreage to mountain land. This diversity makes {stateName} an attractive destination for buyers with different goals and preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Land Available in {stateName}</h2>
                <p className="text-gray-700 mb-4">
                  Acreage for sale in {stateName} includes various property types suited for different purposes. Residential acreage typically ranges from 1 to 10 acres and is ideal for custom home building with space for privacy and outdoor activities.
                </p>
                <p className="text-gray-700 mb-4">
                  Agricultural land in {stateName} supports farming and ranching operations, with properties featuring fertile soil, water access, and suitable climate conditions. Many agricultural parcels come with existing infrastructure like barns, fencing, and irrigation systems.
                </p>
                <p className="text-gray-700">
                  Recreational acreage attracts hunters, outdoor enthusiasts, and those seeking a private retreat. Investment properties in growth areas offer potential for future appreciation and development opportunities.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Buying Acreage in {stateName}: What to Consider</h2>
                <p className="text-gray-700 mb-4">
                  When searching for acreage for sale in {stateName}, consider factors beyond just price and size. Research local zoning regulations, which vary by county and can affect how you use the property. Verify access to utilities or budget for alternatives like wells and septic systems.
                </p>
                <p className="text-gray-700 mb-4">
                  Water rights and availability are particularly important in some regions of {stateName}. Investigate whether the property has adequate water sources for your intended use, whether that's residential, agricultural, or recreational.
                </p>
                <p className="text-gray-700">
                  Road access is another critical consideration. Ensure the property has legal access via public roads or recorded easements. Properties with year-round road access are generally more valuable and easier to develop than those with seasonal or limited access.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Financing Land in {stateName}</h2>
                <p className="text-gray-700 mb-4">
                  Financing acreage for sale in {stateName} typically differs from traditional home mortgages. Many sellers on Acreage Sale offer owner financing, which can provide more flexible terms and easier qualification than conventional bank loans.
                </p>
                <p className="text-gray-700">
                  Other financing options include land loans from specialized lenders, USDA loans for rural properties, and cash purchases. Each option has different requirements, down payments, and interest rates, so research which works best for your situation.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Search for {stateName} Acreage</h2>
                <p className="text-gray-700">
                  Browse current acreage for sale in {stateName} below. Each listing includes detailed property information, photos, and direct contact with the seller. Use our search filters to narrow results by county, price range, acreage size, and features to find the perfect land for your needs.
                </p>
              </section>
            </div>
          </article>

          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Acreage in {stateName}
              </h2>
              <p className="text-gray-600">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
                ))}
              </div>
            ) : properties.length > 0 ? (
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
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-lg mb-4">
                  No properties currently available in {stateName}.
                </p>
                <p className="text-gray-500 mb-6">
                  Check back soon or browse acreage for sale in other states.
                </p>
                <Link
                  to="/acreage-for-sale"
                  className="inline-block bg-[#329cf9] hover:bg-[#2563eb] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Browse All States
                </Link>
              </div>
            )}
          </section>

          <section className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Explore Acreage for Sale in Other States
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link to="/acreage-for-sale/texas" className="text-[#329cf9] hover:underline">Texas</Link>
              <Link to="/acreage-for-sale/california" className="text-[#329cf9] hover:underline">California</Link>
              <Link to="/acreage-for-sale/florida" className="text-[#329cf9] hover:underline">Florida</Link>
              <Link to="/acreage-for-sale/colorado" className="text-[#329cf9] hover:underline">Colorado</Link>
              <Link to="/acreage-for-sale/tennessee" className="text-[#329cf9] hover:underline">Tennessee</Link>
              <Link to="/acreage-for-sale/arizona" className="text-[#329cf9] hover:underline">Arizona</Link>
              <Link to="/acreage-for-sale/north-carolina" className="text-[#329cf9] hover:underline">North Carolina</Link>
              <Link to="/acreage-for-sale/georgia" className="text-[#329cf9] hover:underline">Georgia</Link>
              <Link to="/acreage-for-sale/oregon" className="text-[#329cf9] hover:underline">Oregon</Link>
              <Link to="/acreage-for-sale/washington" className="text-[#329cf9] hover:underline">Washington</Link>
              <Link to="/acreage-for-sale/new-mexico" className="text-[#329cf9] hover:underline">New Mexico</Link>
              <Link to="/acreage-for-sale/montana" className="text-[#329cf9] hover:underline">Montana</Link>
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/acreage-for-sale"
                className="text-[#329cf9] hover:underline font-semibold"
              >
                View All States →
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
