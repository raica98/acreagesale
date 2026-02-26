interface SEOMetadata {
  focusKeyphrase: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  structuredData: object | null;
}

const SITE_NAME = 'AcreageSale';
const BASE_URL = 'https://acreagesale.com';

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function generateRelatedKeywords(slug: string): string[] {
  const baseKeyword = slug.replace(/-/g, ' ');
  const words = slug.split('-');

  const keywords: string[] = [baseKeyword];

  if (words.length > 1) {
    keywords.push(words.slice(0, Math.min(2, words.length)).join(' '));
  }

  if (words.length > 2) {
    keywords.push(words.slice(-2).join(' '));
  }

  return keywords.slice(0, 4);
}

function truncateToLength(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function generateSEOFromSlug(slug: string): SEOMetadata {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');

  if (!cleanSlug || cleanSlug === '/') {
    return {
      focusKeyphrase: 'land for sale acreage properties',
      title: 'Acreage For Sale - Buy & Sell Land Online | AcreageSale.com',
      description: 'Find the perfect acreage for sale across the United States. Browse thousands of land listings, compare prices, and connect with verified sellers. Start your land search today!',
      keywords: 'acreage for sale, land for sale, buy land, sell land, vacant land, property for sale, real estate land, investment property',
      canonical: BASE_URL,
      ogTitle: 'Acreage For Sale - Buy & Sell Land Online',
      ogDescription: 'Find the perfect acreage for sale across the United States. Browse thousands of land listings, compare prices, and connect with verified sellers.',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'AcreageSale - Land Marketplace',
        'description': 'Find the perfect acreage for sale across the United States. Browse thousands of land listings, compare prices, and connect with verified sellers.',
        'url': BASE_URL,
        'isPartOf': {
          '@type': 'WebSite',
          'name': SITE_NAME,
          'url': BASE_URL
        }
      },
    };
  }

  if (cleanSlug === 'sell-land-fast-ohio' || cleanSlug === 'sell-land-fast-in-ohio') {
    return {
      focusKeyphrase: 'sell land in ohio',
      title: 'Sell Land in Ohio Fast | Cash Ohio Land Buyers | Acreage Sale',
      description: 'Sell your Ohio land fast for cash. Get offers in 24hrs from trusted Ohio land buyers. We buy Lake Erie waterfront, farmland, hunting properties & acreage across all 88 counties. Zero fees, fast closing.',
      keywords: 'sell land in ohio, sell ohio land, ohio land buyers, cash for land ohio, sell vacant land ohio, sell farmland ohio, lake erie land buyers, ohio acreage buyers, sell hunting land ohio, columbus land buyers',
      canonical: `${BASE_URL}/sell-land-fast-in-ohio/`,
      ogTitle: 'Sell Land in Ohio Fast for Cash | Top Ohio Land Buyers',
      ogDescription: 'Get cash offers in 24 hours for your Ohio land. We buy all types: Lake Erie waterfront, farmland, hunting properties, development land. Serving all 88 Ohio counties. Zero fees.',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Sell Land Fast in Ohio',
        'description': 'Professional land buying service in Ohio. We purchase Lake Erie waterfront, agricultural farmland, hunting properties, and development land across all 88 Ohio counties.',
        'url': `${BASE_URL}/sell-land-fast-in-ohio/`,
        'provider': {
          '@type': 'Organization',
          'name': SITE_NAME,
          'url': BASE_URL
        },
        'areaServed': {
          '@type': 'State',
          'name': 'Ohio',
          'addressCountry': 'US'
        },
        'serviceType': 'Land Acquisition',
        'offers': {
          '@type': 'Offer',
          'availability': 'https://schema.org/InStock',
          'description': 'Cash offers for Ohio land within 24 hours'
        }
      },
    };
  }

  const focusKeyphrase = cleanSlug.replace(/-/g, ' ');
  const titleText = slugToTitle(cleanSlug);

  const title = truncateToLength(`${titleText} | ${SITE_NAME}`, 60);

  const description = truncateToLength(
    `Explore ${titleText}. Find detailed information about ${focusKeyphrase} on ${SITE_NAME}. Browse properties, compare options, and connect with sellers.`,
    160
  );

  const relatedKeywords = generateRelatedKeywords(cleanSlug);
  const keywords = [focusKeyphrase, ...relatedKeywords, 'land for sale', 'property listings'].slice(0, 8).join(', ');

  const canonical = `${BASE_URL}/${cleanSlug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': titleText,
    'description': description,
    'url': canonical,
    'isPartOf': {
      '@type': 'WebSite',
      'name': SITE_NAME,
      'url': BASE_URL
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': BASE_URL
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': titleText,
          'item': canonical
        }
      ]
    }
  };

  return {
    focusKeyphrase,
    title,
    description,
    keywords,
    canonical,
    ogTitle: title,
    ogDescription: description,
    structuredData,
  };
}

export function generatePropertySEO(slug: string, propertyData?: {
  city?: string;
  state?: string;
  acres?: number;
  price?: number;
  zipCode?: string;
  images?: string[];
  latitude?: number;
  longitude?: number;
}): SEOMetadata {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');

  if (!cleanSlug) {
    return generateSEOFromSlug('');
  }

  if (!propertyData) {
    return generateSEOFromSlug(cleanSlug);
  }

  const { city, state, acres, price, zipCode, images, latitude, longitude } = propertyData;

  const focusKeyphrase = cleanSlug.replace(/-/g, ' ');

  let titleText = slugToTitle(cleanSlug);
  if (city && state) {
    titleText = `${acres ? `${acres} Acres` : 'Land'} in ${city}, ${state}`;
  }

  const title = truncateToLength(`${titleText} | ${SITE_NAME}`, 60);

  let descriptionText = `Explore ${titleText}.`;
  if (acres && price && city && state) {
    descriptionText = `${acres} acres for sale in ${city}, ${state} - $${price.toLocaleString()}. View details and listing information.`;
  } else if (city && state) {
    descriptionText = `Land for sale in ${city}, ${state}. View property details, pricing, and location information.`;
  }

  const description = truncateToLength(descriptionText, 160);

  const keywordsList: string[] = [focusKeyphrase];
  if (city) keywordsList.push(`land ${city}`);
  if (state) keywordsList.push(`land ${state}`);
  if (city && state) keywordsList.push(`${city} ${state} land`);

  const keywords = keywordsList.slice(0, 4).join(', ');

  const canonical = `${BASE_URL}/${cleanSlug}`;

  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    'name': titleText,
    'description': description,
    'url': canonical,
  };

  if (price) {
    structuredData.offers = {
      '@type': 'Offer',
      'price': price,
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
      'url': canonical
    };
  }

  if (acres) {
    structuredData.floorSize = {
      '@type': 'QuantitativeValue',
      'value': acres,
      'unitText': 'acres'
    };
  }

  if (city || state || zipCode) {
    structuredData.address = {
      '@type': 'PostalAddress',
      ...(city && { 'addressLocality': city }),
      ...(state && { 'addressRegion': state }),
      ...(zipCode && { 'postalCode': zipCode }),
      'addressCountry': 'US'
    };
  }

  if (latitude && longitude) {
    structuredData.geo = {
      '@type': 'GeoCoordinates',
      'latitude': latitude,
      'longitude': longitude
    };
  }

  if (images && images.length > 0) {
    structuredData.image = images;
  }

  return {
    focusKeyphrase,
    title,
    description,
    keywords,
    canonical,
    ogTitle: title,
    ogDescription: description,
    structuredData,
  };
}

export function generateLocalBusinessSEO(slug: string, locationData: {
  name: string;
  city: string;
  state: string;
  description?: string;
}): SEOMetadata {
  const { name, city, state, description: customDescription } = locationData;

  const titleText = `${name} - ${city}, ${state}`;
  const title = truncateToLength(`${titleText} | ${SITE_NAME}`, 60);

  const description = customDescription
    ? truncateToLength(customDescription, 160)
    : truncateToLength(`Find land for sale in ${city}, ${state}. Browse available properties and connect with sellers.`, 160);

  const focusKeyphrase = `land for sale ${city} ${state}`;
  const keywords = `${focusKeyphrase}, ${city} land, ${state} land, vacant land ${city}`;

  const canonical = `${BASE_URL}/${slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': name,
    'description': description,
    'url': canonical,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': city,
      'addressRegion': state,
      'addressCountry': 'US'
    },
    'areaServed': {
      '@type': 'City',
      'name': city,
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': state,
        'addressCountry': 'US'
      }
    }
  };

  return {
    focusKeyphrase,
    title,
    description,
    keywords,
    canonical,
    ogTitle: title,
    ogDescription: description,
    structuredData,
  };
}
