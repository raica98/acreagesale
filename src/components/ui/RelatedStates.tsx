import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

interface StateCardProps {
  name: string;
  slug: string;
  description?: string;
}

interface RelatedStatesProps {
  currentState: string;
  states: StateCardProps[];
  title?: string;
  className?: string;
}

const stateNeighbors: Record<string, StateCardProps[]> = {
  texas: [
    { name: 'Oklahoma', slug: 'oklahoma', description: 'Diverse landscapes and affordable land' },
    { name: 'Louisiana', slug: 'louisiana', description: 'Bayou country with unique opportunities' },
    { name: 'New Mexico', slug: 'new-mexico', description: 'Desert beauty and open spaces' },
    { name: 'Arkansas', slug: 'arkansas', description: 'Natural state with scenic properties' }
  ],
  california: [
    { name: 'Nevada', slug: 'nevada', description: 'Tax-friendly state with diverse terrain' },
    { name: 'Oregon', slug: 'oregon', description: 'Pacific Northwest beauty' },
    { name: 'Arizona', slug: 'arizona', description: 'Desert landscapes and investment opportunities' }
  ],
  florida: [
    { name: 'Georgia', slug: 'georgia', description: 'Southern charm and growing markets' },
    { name: 'Alabama', slug: 'alabama', description: 'Affordable land in the heart of the South' }
  ],
  newyork: [
    { name: 'Pennsylvania', slug: 'pennsylvania', description: 'Historic state with diverse properties' },
    { name: 'New Jersey', slug: 'new-jersey', description: 'Dense markets near major cities' },
    { name: 'Connecticut', slug: 'connecticut', description: 'New England charm' },
    { name: 'Vermont', slug: 'vermont', description: 'Mountain beauty and rural land' }
  ],
  washington: [
    { name: 'Oregon', slug: 'oregon', description: 'Pacific Northwest neighbor' },
    { name: 'Idaho', slug: 'idaho', description: 'Mountain state with great values' }
  ],
  colorado: [
    { name: 'Wyoming', slug: 'wyoming', description: 'Wide open spaces and mountain views' },
    { name: 'New Mexico', slug: 'new-mexico', description: 'Southwest beauty' },
    { name: 'Utah', slug: 'utah', description: 'Desert and mountain landscapes' },
    { name: 'Kansas', slug: 'kansas', description: 'Heartland affordability' }
  ],
  arizona: [
    { name: 'New Mexico', slug: 'new-mexico', description: 'Southwest neighbor' },
    { name: 'Nevada', slug: 'nevada', description: 'Desert opportunities' },
    { name: 'Utah', slug: 'utah', description: 'National park access' },
    { name: 'California', slug: 'california', description: 'Major market next door' }
  ],
  georgia: [
    { name: 'Florida', slug: 'florida', description: 'Coastal opportunities' },
    { name: 'South Carolina', slug: 'south-carolina', description: 'Coastal and inland properties' },
    { name: 'North Carolina', slug: 'north-carolina', description: 'Mountain to coast diversity' },
    { name: 'Tennessee', slug: 'tennessee', description: 'Growing markets' },
    { name: 'Alabama', slug: 'alabama', description: 'Affordable Southern land' }
  ]
};

const RelatedStates: React.FC<RelatedStatesProps> = ({
  currentState,
  states,
  title = 'Explore Nearby States',
  className = ''
}) => {
  const stateKey = currentState.toLowerCase().replace(/\s+/g, '');
  const relatedStates = states.length > 0 ? states : (stateNeighbors[stateKey] || []);

  if (relatedStates.length === 0) {
    return null;
  }

  return (
    <section className={`bg-gray-50 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">
            Discover land opportunities in neighboring states
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedStates.map((state) => (
            <Link
              key={state.slug}
              to={`/sell-land-fast-in-${state.slug}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-6 group border border-gray-200 hover:border-[#329cf9]"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-[#329cf9] transition-colors">
                  <MapPin className="w-5 h-5 text-[#329cf9] group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#329cf9] transition-colors mb-1">
                    {state.name}
                  </h3>
                  {state.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {state.description}
                    </p>
                  )}
                  <span className="text-sm text-[#329cf9] font-medium mt-2 inline-block">
                    View Properties →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedStates;
