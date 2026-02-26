import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, DollarSign, Loader as Loader2, CircleAlert as AlertCircle, CircleCheck as CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PropertyData {
  apn: string;
  county_fips: string;
  city: string;
  latitude: number;
  longitude: number;
  acreage: number;
}

interface PricingConfiguration {
  comp_weight: { '1': number; '2': number };
  minimum_parcels_for_model: number;
  iqr_low: number;
  iqr_high: number;
}

interface County {
  name: string;
  state: string;
  fips: string;
}

interface PropertyPricingStepProps {
  propertyData: {
    apn?: string;
    city?: string;
    state?: string;
    county?: string;
    latitude?: number;
    longitude?: number;
    size_acres?: number;
  };
  onNext: (pricingData: any) => void;
  onBack: () => void;
  className?: string;
}

export function PropertyPricingStep({ 
  propertyData, 
  onNext, 
  onBack, 
  className = '' 
}: PropertyPricingStepProps) {
  const [formData, setFormData] = useState<PropertyData>({
    apn: propertyData.apn || '',
    county_fips: '',
    city: propertyData.city || '',
    latitude: propertyData.latitude || 0,
    longitude: propertyData.longitude || 0,
    acreage: propertyData.size_acres || 0
  });

  const [pricingConfig, setPricingConfig] = useState<PricingConfiguration>({
    comp_weight: { '1': 0.8, '2': 1.2 },
    minimum_parcels_for_model: 12,
    iqr_low: 25,
    iqr_high: 75
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [counties, setCounties] = useState<County[]>([]);
  const [loadingCounties, setLoadingCounties] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [countySearch, setCountySearch] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState<'quick' | 'market' | 'premium' | 'custom'>('market');
  const [customPrice, setCustomPrice] = useState<string>('');

  // Auto-populate county search and FIPS when property data is available
  useEffect(() => {
    if (propertyData.county && propertyData.state && counties.length > 0 && !selectedCounty) {
      console.log('🔍 Auto-populating county from API data:', propertyData.county, propertyData.state);
      console.log('📊 Available counties:', counties.length);
      
      // Get state abbreviation and full state name
      const stateAbbr = propertyData.state?.length === 2 ? propertyData.state.toUpperCase() : propertyData.state;
      
      // Map state abbreviations to full names
      const stateNameMap: { [key: string]: string } = {
        'CA': 'California', 'TX': 'Texas', 'FL': 'Florida', 'NY': 'New York',
        'PA': 'Pennsylvania', 'IL': 'Illinois', 'OH': 'Ohio', 'GA': 'Georgia',
        'NC': 'North Carolina', 'MI': 'Michigan', 'NJ': 'New Jersey', 'VA': 'Virginia',
        'WA': 'Washington', 'AZ': 'Arizona', 'MA': 'Massachusetts', 'TN': 'Tennessee',
        'IN': 'Indiana', 'MO': 'Missouri', 'MD': 'Maryland', 'WI': 'Wisconsin',
        'CO': 'Colorado', 'MN': 'Minnesota', 'SC': 'South Carolina', 'AL': 'Alabama',
        'LA': 'Louisiana', 'KY': 'Kentucky', 'OR': 'Oregon', 'OK': 'Oklahoma',
        'CT': 'Connecticut', 'UT': 'Utah', 'IA': 'Iowa', 'NV': 'Nevada',
        'AR': 'Arkansas', 'MS': 'Mississippi', 'KS': 'Kansas', 'NM': 'New Mexico',
        'NE': 'Nebraska', 'WV': 'West Virginia', 'ID': 'Idaho', 'HI': 'Hawaii',
        'NH': 'New Hampshire', 'ME': 'Maine', 'MT': 'Montana', 'RI': 'Rhode Island',
        'DE': 'Delaware', 'SD': 'South Dakota', 'ND': 'North Dakota', 'AK': 'Alaska',
        'VT': 'Vermont', 'WY': 'Wyoming'
      };
      
      const fullStateName = stateNameMap[stateAbbr] || propertyData.state;
      
      // Clean county name - remove "County" suffix if present
      const cleanCountyName = propertyData.county.replace(/\s+County\s*$/i, '').trim();
      
      // Format as requested: "County Name County, Full State Name, Full State Name"
      const formattedCountySearch = `${cleanCountyName} County, ${fullStateName}, ${fullStateName}`;
      
      console.log('🎯 Formatted county search string:', formattedCountySearch);
      
      // Find matching county in the counties list
      const matchingCounty = counties.find(county => {
        const countyNameLower = cleanCountyName.toLowerCase();
        const stateNameLower = fullStateName.toLowerCase();
        const fullCountyName = county.name.toLowerCase();
        
        // Match both county name and state
        return fullCountyName.includes(countyNameLower) && 
               fullCountyName.includes(stateNameLower);
      });
      
      console.log('🔍 Searching for county:', cleanCountyName, 'in state:', fullStateName);
      console.log('✅ Found matching county:', matchingCounty);
      
      if (matchingCounty) {
        // Set the formatted search string and select the county
        setCountySearch(formattedCountySearch);
        setSelectedCounty(formattedCountySearch);
        setFormData(prev => ({ ...prev, county_fips: matchingCounty.fips }));
        console.log('✅ Auto-selected county with FIPS:', matchingCounty.fips);
      } else {
        console.warn('❌ No matching county found for:', cleanCountyName, fullStateName);
        // Set the formatted string anyway so user can see the expected format
        setCountySearch(formattedCountySearch);
        setSelectedCounty('');
        setFormData(prev => ({ ...prev, county_fips: '' }));
      }
    }
  }, [propertyData.county, propertyData.state, counties, selectedCounty]);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-populate form data when propertyData changes
  useEffect(() => {
    if (propertyData) {
      console.log('Auto-populating form with property data:', propertyData);
      setFormData(prev => ({
        ...prev,
        apn: propertyData.apn || '',
        city: propertyData.city || '',
        latitude: propertyData.latitude || 0,
        longitude: propertyData.longitude || 0,
        acreage: propertyData.size_acres || 0
      }));
    }
  }, [propertyData]);

  // Fetch counties on component mount
  useEffect(() => {
    fetchCountiesAndStates();
  }, []);

  const fetchCountiesAndStates = async () => {
    if (counties.length > 0) return;
    
    setLoadingCounties(true);
    try {
      const countiesResponse = await fetch('https://api.census.gov/data/2010/dec/sf1?get=NAME&for=county:*');
      const countiesData = await countiesResponse.json();
      
      const statesResponse = await fetch('https://api.census.gov/data/2010/dec/sf1?get=NAME&for=state:*');
      const statesData = await statesResponse.json();
      
      const stateLookup: { [key: string]: string } = {};
      statesData.slice(1).forEach((state: any) => {
        stateLookup[state[1]] = state[0];
      });
      
      const processedCounties: County[] = countiesData.slice(1).map((county: any) => {
        const countyName = county[0];
        const stateFips = county[1];
        const countyFips = county[2];
        const stateName = stateLookup[stateFips] || 'Unknown';
        
        return {
          name: `${countyName}, ${stateName}`,
          state: stateName,
          fips: `${stateFips}${countyFips.padStart(3, '0')}`
        };
      });
      
      processedCounties.sort((a, b) => a.name.localeCompare(b.name));
      setCounties(processedCounties);
    } catch (err) {
      console.error('Error fetching counties:', err);
    } finally {
      setLoadingCounties(false);
    }
  };

  const handleInputChange = (field: keyof PropertyData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfigChange = (field: keyof PricingConfiguration, value: any) => {
    setPricingConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCountySelect = (county: County) => {
    setSelectedCounty(county.name);
    setCountySearch(county.name);
    handleInputChange('county_fips', county.fips);
  };

  const filteredCounties = counties.filter(county =>
    county.name.toLowerCase().includes(countySearch.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    // Validate required fields before making API call
    if (!formData.apn || !formData.county_fips || !formData.city || !formData.latitude || !formData.longitude || !formData.acreage) {
      setError('Please fill in all required fields before getting property price');
      setLoading(false);
      return;
    }

    const url = 'https://prycd-pricing.p.rapidapi.com/priceProperty';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '658d0a7c16msh16736d87707b9bbp15b724jsna8ab00c1ecfa',
        'x-rapidapi-host': 'prycd-pricing.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apn: formData.apn,
        county_fips: formData.county_fips,
        city: formData.city,
        latitude: formData.latitude,
        longitude: formData.longitude,
        acreage: formData.acreage,
        pricing_configuration: pricingConfig
      })
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error(data.message || `API error: ${response.status} - ${data.error || 'Unknown error'}`);
      }
      
      setResult(data);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while fetching property pricing';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!result) return;

    // Validate custom price if selected
    if (selectedStrategy === 'custom') {
      const parsedCustomPrice = parseFloat(customPrice);
      if (!customPrice || isNaN(parsedCustomPrice) || parsedCustomPrice <= 0) {
        setError('Please enter a valid custom price');
        return;
      }
    }

    // Calculate selected price based on strategy
    let selectedPrice = result.pricing?.price || result.recommended_price || result.price || 0;

    switch (selectedStrategy) {
      case 'quick':
        selectedPrice = Math.round(selectedPrice * 0.85);
        break;
      case 'premium':
        selectedPrice = Math.round(selectedPrice * 1.1);
        break;
      case 'custom':
        selectedPrice = parseFloat(customPrice);
        break;
      default:
        // market price - no change
        break;
    }

    const pricingData = {
      ...result,
      selected_strategy: selectedStrategy,
      selected_price: selectedPrice,
      market_price: result.pricing?.price || result.recommended_price || result.price,
      pricing_analysis: {
        quick_sale: Math.round((result.pricing?.price || result.recommended_price || result.price || 0) * 0.85),
        market_price: result.pricing?.price || result.recommended_price || result.price,
        premium_price: Math.round((result.pricing?.price || result.recommended_price || result.price || 0) * 1.1),
        custom_price: selectedStrategy === 'custom' ? parseFloat(customPrice) : null,
        confidence: result.pricing?.confidence || result.confidence,
        comparable_sales: result.pricing?.meta?.total_comps || result.raw_response?.meta?.total_comps || 0
      }
    };

    onNext(pricingData);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="text-lg lg:text-2xl font-bold flex items-center gap-2 lg:gap-3">
              💰 Smart Property Price Generator
            </div>
          </div>
          <p className="text-white/90 mt-2 text-sm lg:text-base">
            Get accurate property valuations using market data and comparable sales
          </p>
        </div>

        <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
          {!result && (
            <>
              {/* Property Details Form */}
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Property Details</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                        APN (Assessor's Parcel Number) *
                      </label>
                      <input
                        type="text"
                        value={formData.apn}
                        onChange={(e) => handleInputChange('apn', e.target.value)}
                        placeholder="104-080-027-000"
                        className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                        County FIPS Code *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={countySearch}
                          onChange={(e) => {
                            setCountySearch(e.target.value);
                            if (e.target.value === '') {
                              handleInputChange('county_fips', '');
                              setSelectedCounty('');
                            }
                          }}
                          onFocus={fetchCountiesAndStates}
                          placeholder="Search for county (e.g., San Bernardino County, California)"
                          className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                        
                        {countySearch && filteredCounties.length > 0 && !selectedCounty && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {loadingCounties ? (
                              <div className="p-4 text-center text-gray-500">
                                <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
                                Loading counties...
                              </div>
                            ) : (
                              filteredCounties.slice(0, 10).map((county, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => handleCountySelect(county)}
                                  className="w-full text-left px-4 py-2 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none transition-colors duration-150"
                                >
                                  <div className="font-medium text-gray-900">{county.name}</div>
                                  <div className="text-sm text-gray-500">FIPS: {county.fips}</div>
                                </button>
                              ))
                            )}
                          </div>
                        )}
                        
                        {formData.county_fips && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Selected FIPS:</span> {formData.county_fips}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Phelan"
                        className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                        Acreage *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.acreage || ''}
                        onChange={(e) => handleInputChange('acreage', parseFloat(e.target.value) || 0)}
                        placeholder="2.28"
                        className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                        Latitude *
                      </label>
                      <input
                        type="number"
                        step="0.000001"
                        value={formData.latitude || ''}
                        onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value) || 0)}
                        placeholder="34.480999827296"
                        className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                        Longitude *
                      </label>
                      <input
                        type="number"
                        step="0.000001"
                        value={formData.longitude || ''}
                        onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value) || 0)}
                        placeholder="-117.499010217135"
                        className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>


                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full lg:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 lg:px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm lg:text-base"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" />
                          <span>Getting Property Price...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 lg:w-5 lg:h-5" />
                          <span>Get Property Price</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-800 font-medium">We couldn't price this property right now.</p>
              </div>
              <p className="text-red-700 mt-1">{error}</p>
              <Button
                onClick={() => {
                  setError('');
                  setResult(null);
                }}
                variant="outline"
                className="mt-3 border-red-200 text-red-600 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div ref={resultsRef} className="space-y-6">
              {/* Property Overview */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center mb-4 lg:mb-6">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 mr-2" />
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Property Valuation Complete</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 lg:p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs lg:text-sm font-medium text-blue-700">Market Value</span>
                      <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                    </div>
                    <p className="text-xl lg:text-2xl font-bold text-blue-900">
                      {result.pricing?.price_formatted || `$${(result.pricing?.price || result.recommended_price || result.price || 0).toLocaleString()}`}
                    </p>
                    <p className="text-xs lg:text-sm text-blue-600 mt-1">
                      ${Math.round((result.pricing?.price || result.recommended_price || result.price || 0) / formData.acreage).toLocaleString()} per acre
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 lg:p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs lg:text-sm font-medium text-green-700">Confidence</span>
                      <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                    </div>
                    <p className="text-xl lg:text-2xl font-bold text-green-900">
                      {result.pricing?.confidence || result.confidence || 'N/A'}
                    </p>
                    <p className="text-xs lg:text-sm text-green-600 mt-1">
                      Based on {result.pricing?.meta?.total_comps || result.raw_response?.meta?.total_comps || 0} comparables
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 lg:p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs lg:text-sm font-medium text-purple-700">Location</span>
                      <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                    </div>
                    <p className="text-base lg:text-lg font-bold text-purple-900">
                      {formData.city}
                    </p>
                    <p className="text-xs lg:text-sm text-purple-600 mt-1">
                      {formData.acreage} acres
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Strategy Selection */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 text-center">Choose Your Selling Strategy</h3>
                <p className="text-sm lg:text-base text-gray-600 text-center mb-6 lg:mb-8 px-2">Select the pricing approach that best fits your timeline and goals</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {/* Quick Sale */}
                  <div
                    onClick={() => setSelectedStrategy('quick')}
                    className={`group relative cursor-pointer rounded-xl p-4 lg:p-6 border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                      selectedStrategy === 'quick'
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 ring-4 ring-orange-300 shadow-2xl scale-105'
                        : 'border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 hover:border-orange-400'
                    }`}
                  >
                    {selectedStrategy === 'quick' && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        FAST SALE
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                        <span className="text-xl lg:text-2xl">⚡</span>
                      </div>
                      <h4 className="text-base lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Quick Sale</h4>
                      <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">Sell faster with competitive pricing</p>
                    </div>
                    
                    <div className="space-y-2 lg:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Market Value:</span>
                        <span className="text-sm line-through text-gray-400">
                          {result.pricing?.price_formatted || `$${(result.pricing?.price || result.recommended_price || result.price || 0).toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Quick Sale Price:</span>
                        <span className="text-lg lg:text-2xl font-bold text-orange-600">
                          ${result.pricing?.price || result.recommended_price || result.price ? Math.round((result.pricing?.price || result.recommended_price || result.price) * 0.85).toLocaleString() : 'N/A'}
                        </span>
                      </div>
                      <div className="text-xs text-orange-600 font-medium">
                        15% below market • Typically sells in 30-60 days
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-6 space-y-1 lg:space-y-2 text-xs lg:text-sm text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Faster closing timeline</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>More buyer interest</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Reduced carrying costs</span>
                      </div>
                    </div>
                  </div>

                  {/* Market Price */}
                  <div
                    onClick={() => setSelectedStrategy('market')}
                    className={`group relative cursor-pointer rounded-xl p-4 lg:p-6 border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                      selectedStrategy === 'market'
                        ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 ring-4 ring-blue-300 shadow-2xl scale-105'
                        : 'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-500'
                    }`}
                  >
                    {selectedStrategy === 'market' && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        RECOMMENDED
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <span className="text-xl lg:text-2xl">🎯</span>
                      </div>
                      <h4 className="text-base lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Market Price</h4>
                      <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">Balanced approach for optimal returns</p>
                    </div>
                    
                    <div className="space-y-2 lg:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Market Price:</span>
                        <span className="text-lg lg:text-2xl font-bold text-blue-600">
                          {result.pricing?.price_formatted || `$${(result.pricing?.price || result.recommended_price || result.price || 0).toLocaleString()}`}
                        </span>
                      </div>
                      <div className="text-xs text-blue-600 font-medium">
                        Fair market value • Typically sells in 90-120 days
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-6 space-y-1 lg:space-y-2 text-xs lg:text-sm text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Maximum market value</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Balanced timeline</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strong negotiation position</span>
                      </div>
                    </div>
                  </div>

                  {/* Premium Sale */}
                  <div
                    onClick={() => setSelectedStrategy('premium')}
                    className={`group relative cursor-pointer rounded-xl p-4 lg:p-6 border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                      selectedStrategy === 'premium'
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 ring-4 ring-emerald-300 shadow-2xl scale-105'
                        : 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 hover:border-emerald-400'
                    }`}
                  >
                    {selectedStrategy === 'premium' && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        PREMIUM
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                        <span className="text-xl lg:text-2xl">💎</span>
                      </div>
                      <h4 className="text-base lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Premium Price</h4>
                      <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">Maximum value for unique properties</p>
                    </div>
                    
                    <div className="space-y-2 lg:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Market Value:</span>
                        <span className="text-sm text-gray-600">
                          {result.pricing?.price_formatted || `$${(result.pricing?.price || result.recommended_price || result.price || 0).toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Premium Price:</span>
                        <span className="text-lg lg:text-2xl font-bold text-emerald-600">
                          ${result.pricing?.price || result.recommended_price || result.price ? Math.round((result.pricing?.price || result.recommended_price || result.price) * 1.1).toLocaleString() : 'N/A'}
                        </span>
                      </div>
                      <div className="text-xs text-emerald-600 font-medium">
                        10% above market • May take 120+ days
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-6 space-y-1 lg:space-y-2 text-xs lg:text-sm text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Highest possible return</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Selective buyer pool</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Extended marketing time</span>
                      </div>
                    </div>
                  </div>

                  {/* Custom Price */}
                  <div
                    onClick={() => setSelectedStrategy('custom')}
                    className={`group relative cursor-pointer rounded-xl p-4 lg:p-6 border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                      selectedStrategy === 'custom'
                        ? 'border-gray-600 bg-gradient-to-br from-gray-50 to-slate-50 ring-4 ring-gray-300 shadow-2xl scale-105'
                        : 'border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 hover:border-gray-400'
                    }`}
                  >
                    {selectedStrategy === 'custom' && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        CUSTOM
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <span className="text-xl lg:text-2xl">✏️</span>
                      </div>
                      <h4 className="text-base lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Use Your Own Price</h4>
                      <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">Set your own custom price</p>
                    </div>

                    <div className="space-y-2 lg:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Market Value:</span>
                        <span className="text-sm text-gray-600">
                          {result.pricing?.price_formatted || `$${(result.pricing?.price || result.recommended_price || result.price || 0).toLocaleString()}`}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Price:
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                          <input
                            type="number"
                            value={customPrice}
                            onChange={(e) => setCustomPrice(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Enter price"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-lg font-semibold"
                            min="0"
                            step="1000"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-6 space-y-1 lg:space-y-2 text-xs lg:text-sm text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Full control over pricing</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Set based on your needs</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Adjust anytime</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm lg:text-base font-semibold text-gray-900 mb-3">Market Analysis Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 text-xs lg:text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Comparable Sales:</span> {result.pricing?.meta?.total_comps || result.raw_response?.meta?.total_comps || 0} properties
                    </div>
                    <div>
                      <span className="font-medium">Average Distance:</span> {result.pricing?.meta?.average_distance || result.raw_response?.meta?.average_distance || 'N/A'} miles
                    </div>
                    <div>
                      <span className="font-medium">Price per Acre:</span> ${Math.round((result.pricing?.price || result.recommended_price || result.price || 0) / formData.acreage).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Confidence Level:</span> {result.pricing?.confidence || result.confidence || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col lg:flex-row justify-between items-center pt-6 border-t border-gray-200 gap-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Boundaries
            </Button>

            <div className="text-center order-first lg:order-none">
              <div className="text-xs lg:text-sm text-gray-500 mb-1">Step 3 of 6</div>
              <div className="flex gap-1.5 lg:gap-2">
                <div className="w-6 lg:w-8 h-1.5 lg:h-2 bg-blue-600 rounded-full"></div>
                <div className="w-6 lg:w-8 h-1.5 lg:h-2 bg-blue-600 rounded-full"></div>
                <div className="w-6 lg:w-8 h-1.5 lg:h-2 bg-orange-600 rounded-full"></div>
                <div className="w-6 lg:w-8 h-1.5 lg:h-2 bg-gray-200 rounded-full"></div>
                <div className="w-6 lg:w-8 h-1.5 lg:h-2 bg-gray-200 rounded-full"></div>
                <div className="w-6 lg:w-8 h-1.5 lg:h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleContinue}
              disabled={!result}
              className="w-full lg:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-4 lg:px-6 py-2 lg:py-3 flex items-center justify-center gap-2 text-sm lg:text-base"
            >
              Continue to AI Generation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}