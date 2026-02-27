import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DOMParser } from '@xmldom/xmldom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://acreagesale.com';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const DIST_PATH = path.join(__dirname, '../dist');

function slugToTitle(slug) {
  if (!slug || slug === '/') return 'Home';

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateDescription(slug) {
  if (!slug || slug === '/') {
    return 'Find and buy land, acreage, and vacant lots across the United States on AcreageSale.com.';
  }

  const title = slugToTitle(slug);
  const isSellPage = slug.includes('sell');
  const isLandForSale = slug.includes('land-for-sale');

  if (isSellPage) {
    const location = extractLocation(slug);
    return `Sell your land fast ${location}. Get competitive cash offers, close quickly, and avoid the hassle of traditional real estate sales.`;
  } else if (isLandForSale) {
    const location = extractLocation(slug);
    return `Browse land for sale ${location}. Discover affordable acreage, vacant lots, and investment properties with detailed listings.`;
  } else {
    return `Explore ${title.toLowerCase()} on AcreageSale.com. Find detailed information about land sales and property opportunities.`;
  }
}

function extractLocation(slug) {
  const parts = slug.split('-');

  if (slug.includes('sell-land-fast-in-') || slug.includes('land-for-sale-in-')) {
    const locationParts = parts.slice(parts.indexOf('in') + 1);
    if (locationParts.length > 0) {
      return 'in ' + locationParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }
  }

  if (slug.includes('sell-land-fast-')) {
    const locationParts = slug.replace('sell-land-fast-', '').split('-');
    if (locationParts.length > 0) {
      return 'in ' + locationParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }
  }

  return '';
}

function generateKeywords(slug) {
  if (!slug || slug === '/') {
    return 'land for sale, buy land, acreage, vacant lots, real estate land';
  }

  const baseKeywords = slug.replace(/-/g, ' ');

  const isSellPage = slug.includes('sell');
  const isLandForSale = slug.includes('land-for-sale');

  if (isSellPage) {
    return `${baseKeywords}, sell land, cash for land, land buyers`;
  } else if (isLandForSale) {
    return `${baseKeywords}, buy land, acreage, vacant lots`;
  } else {
    return `${baseKeywords}, land sales, real estate`;
  }
}

function generateContent(slug, title) {
  if (!slug || slug === '/') {
    return {
      h1: 'Find Your Perfect Land',
      intro: 'Welcome to AcreageSale.com, your trusted marketplace for buying and selling land across the United States. Browse thousands of listings, connect with verified sellers, and discover your ideal property investment today.',
      section1Title: 'What You\'ll Find Here',
      section1Content: 'Our platform offers comprehensive land listings from coast to coast, featuring vacant lots, agricultural acreage, residential land, and commercial properties. Each listing includes detailed maps, property specifications, and direct seller contact options.',
      section2Title: 'Why Choose AcreageSale',
      section2Content: 'We simplify the land buying and selling process with transparent pricing, verified listings, and powerful search tools. Whether you\'re looking to build your dream home or invest in real estate, we connect you directly with landowners for fast, hassle-free transactions.'
    };
  }

  const isSellPage = slug.includes('sell');
  const isLandForSale = slug.includes('land-for-sale');
  const location = extractLocation(slug);

  if (isSellPage) {
    return {
      h1: title,
      intro: `Looking to sell your land fast ${location}? AcreageSale.com connects you directly with motivated buyers ready to make competitive cash offers. Our platform streamlines the selling process, helping you close deals quickly without agent fees or lengthy negotiations.`,
      section1Title: 'Fast & Simple Land Sales',
      section1Content: `Selling land ${location} has never been easier. List your property for free, receive offers from verified buyers, and close on your timeline. We handle the complexities while you focus on getting the best value for your land. No commissions, no waiting.`,
      section2Title: 'Get Your Free Property Evaluation',
      section2Content: `Start today by listing your property on AcreageSale.com. Our platform gives your listing maximum exposure to qualified buyers ${location}. Most sellers receive initial offers within days. Join thousands of satisfied landowners who've sold successfully through our marketplace.`
    };
  } else if (isLandForSale) {
    return {
      h1: title,
      intro: `Discover quality land for sale ${location} on AcreageSale.com. Browse current listings featuring vacant lots, agricultural acreage, and investment properties. Filter by price, size, and features to find your perfect land opportunity.`,
      section1Title: 'Browse Available Properties',
      section1Content: `Our curated listings ${location} include detailed property information, aerial maps, parcel data, and direct seller contact. Each property is verified for accuracy, giving you confidence in your land search. Explore diverse options from raw land to ready-to-build lots.`,
      section2Title: 'Start Your Land Search Today',
      section2Content: `Finding the right land ${location} starts here. Use our advanced filters to narrow your search by acreage, price range, and location. Contact sellers directly to ask questions, schedule viewings, and make offers. Your ideal property investment is just a search away.`
    };
  } else {
    return {
      h1: title,
      intro: `Explore ${title.toLowerCase()} on AcreageSale.com. Access detailed information, resources, and tools for buying and selling land. Our platform provides everything you need for successful land transactions.`,
      section1Title: 'What You\'ll Find Here',
      section1Content: `Learn about ${title.toLowerCase()} with comprehensive guides, market insights, and practical resources. Whether you're a first-time buyer or experienced investor, we provide the information you need to make informed land investment decisions.`,
      section2Title: 'Get Started',
      section2Content: `Ready to explore ${title.toLowerCase()}? Browse our extensive listings, use our search tools, and connect with landowners nationwide. AcreageSale.com makes land transactions simple, transparent, and efficient.`
    };
  }
}

function generateStructuredData(slug, title, description, url) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "AcreageSale.com",
      "url": SITE_URL
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": title,
          "item": url
        }
      ]
    }
  };
}

function generateHTML(slug, metadata, content) {
  const { title, description, keywords, canonical, structuredData } = metadata;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO Meta Tags -->
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${keywords}" />
  <link rel="canonical" href="${canonical}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="AcreageSale.com" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />

  <!-- Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>

  <!-- Preload Critical Resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com">

  <script type="module" crossorigin src="/assets/main-BdDz3UP2.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/main-CwceampZ.css">
</head>
<body>
  <div id="app">
    <!-- Pre-rendered Content for SEO -->
    <div class="seo-content">
      <main class="container mx-auto px-4 py-8">
        <article>
          <h1 class="text-4xl font-bold mb-6">${content.h1}</h1>
          <p class="text-lg text-gray-700 mb-8 leading-relaxed">${content.intro}</p>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">${content.section1Title}</h2>
            <p class="text-gray-700 leading-relaxed">${content.section1Content}</p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">${content.section2Title}</h2>
            <p class="text-gray-700 leading-relaxed">${content.section2Content}</p>
          </section>
        </article>
      </main>
    </div>
  </div>
</body>
</html>`;
}

function parseSitemap() {
  console.log('📖 Reading sitemap...');

  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('❌ Sitemap not found at:', SITEMAP_PATH);
    process.exit(1);
  }

  const sitemapXML = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const parser = new DOMParser();
  const doc = parser.parseFromString(sitemapXML, 'text/xml');

  const urlElements = doc.getElementsByTagName('loc');
  const urls = [];

  for (let i = 0; i < urlElements.length; i++) {
    const url = urlElements[i].textContent.trim();
    urls.push(url);
  }

  console.log(`✅ Found ${urls.length} URLs in sitemap\n`);
  return urls;
}

function extractSlugFromUrl(url) {
  const urlObj = new URL(url);
  let slug = urlObj.pathname;

  if (slug.endsWith('/')) {
    slug = slug.slice(0, -1);
  }

  if (slug === '') {
    slug = '/';
  }

  if (slug !== '/') {
    slug = slug.substring(1);
  }

  return slug;
}

function prerenderPage(url) {
  const slug = extractSlugFromUrl(url);
  const title = slug === '/' ? 'Home' : slugToTitle(slug);
  const fullTitle = slug === '/' ? 'Find Land For Sale | Acreage Sale' : `${title} | Acreage Sale`;
  const description = generateDescription(slug);
  const keywords = generateKeywords(slug);
  const canonical = url;
  const structuredData = generateStructuredData(slug, title, description, url);

  const metadata = {
    title: fullTitle,
    description,
    keywords,
    canonical,
    structuredData
  };

  const content = generateContent(slug, title);
  const html = generateHTML(slug, metadata, content);

  const outputDir = slug === '/'
    ? DIST_PATH
    : path.join(DIST_PATH, slug);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'index.html');
  fs.writeFileSync(outputPath, html, 'utf-8');

  console.log(`✅ ${slug === '/' ? '/' : '/' + slug}`);

  return { slug, outputPath };
}

function main() {
  console.log('🚀 Starting pre-render process...\n');

  if (!fs.existsSync(DIST_PATH)) {
    fs.mkdirSync(DIST_PATH, { recursive: true });
  }

  const urls = parseSitemap();
  const results = [];

  console.log('📝 Pre-rendering pages...\n');

  for (const url of urls) {
    try {
      const result = prerenderPage(url);
      results.push(result);
    } catch (error) {
      console.error(`❌ Error rendering ${url}:`, error.message);
    }
  }

  console.log(`\n✨ Pre-rendering complete!`);
  console.log(`📊 Successfully rendered ${results.length} out of ${urls.length} pages`);
  console.log(`📁 Output directory: ${DIST_PATH}`);

  if (results.length > 0) {
    console.log(`\n📄 Sample output: ${results[0].outputPath}`);
  }
}

main();
