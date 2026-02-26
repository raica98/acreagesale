# Internal Linking Implementation Guide

This guide shows how to implement the internal linking strategy across your site.

## Table of Contents
1. [Component Setup](#component-setup)
2. [Adding Breadcrumbs](#adding-breadcrumbs)
3. [Adding Related States](#adding-related-states)
4. [Footer Implementation](#footer-implementation)
5. [Property Page Links](#property-page-links)
6. [Blog Post Links](#blog-post-links)
7. [Best Practices](#best-practices)

---

## Component Setup

All new components have been created:
- `/src/components/ui/Breadcrumbs.tsx` - Breadcrumb navigation
- `/src/components/ui/Footer.tsx` - Site footer with links
- `/src/components/ui/RelatedStates.tsx` - Related state cards
- `/src/components/ui/Layout.tsx` - Page layout wrapper

### Navigation Updates
The main navigation now includes "Properties" link:
- Home | **Properties** | Sell Land Fast | About Us | Blogs | Contact Us

---

## Adding Breadcrumbs

### Automatic Breadcrumbs (Default)

Use the Layout component for automatic breadcrumb generation:

```tsx
import Layout from '../components/ui/Layout';

function MyPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Your page content */}
      </div>
    </Layout>
  );
}
```

This automatically generates breadcrumbs from the URL path.

### Custom Breadcrumbs

For better control, pass custom breadcrumb items:

```tsx
import Layout from '../components/ui/Layout';

function PropertyDetailPage() {
  const breadcrumbItems = [
    { label: 'Properties', path: '/properties' },
    { label: 'Texas', path: '/properties?state=texas' },
    { label: '5 Acres in Austin', path: `/property/${propertyId}` }
  ];

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Property details */}
      </div>
    </Layout>
  );
}
```

### Disable Breadcrumbs

For pages like the homepage:

```tsx
<Layout showBreadcrumbs={false}>
  {/* Content */}
</Layout>
```

---

## Adding Related States

### Example 1: Texas Page with Border States

```tsx
import Layout from '../components/ui/Layout';
import RelatedStates from '../components/ui/RelatedStates';

export default function SellLandFastTexas() {
  const neighboringStates = [
    {
      name: 'Oklahoma',
      slug: 'oklahoma',
      description: 'Diverse landscapes and affordable land opportunities'
    },
    {
      name: 'Louisiana',
      slug: 'louisiana',
      description: 'Bayou country with unique investment potential'
    },
    {
      name: 'New Mexico',
      slug: 'new-mexico',
      description: 'Desert beauty and wide-open spaces'
    },
    {
      name: 'Arkansas',
      slug: 'arkansas',
      description: 'The Natural State with scenic properties'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sell Your Texas Land Fast
            </h1>
            <p className="text-xl mb-8">
              Get top dollar for your Texas property with AI-powered listings
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">Why Sell Land in Texas?</h2>
          <p className="text-gray-700 mb-4">
            Texas offers some of the best land investment opportunities in the nation...
          </p>

          {/* Internal Link to Properties */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
            <h3 className="font-semibold text-lg mb-2">Browse Available Land</h3>
            <p className="text-gray-700 mb-4">
              Looking to buy instead? View all available{' '}
              <a href="/properties?state=texas" className="text-blue-600 hover:text-blue-800 underline">
                Texas land listings
              </a>
              {' '}or{' '}
              <a href="/properties" className="text-blue-600 hover:text-blue-800 underline">
                explore properties nationwide
              </a>.
            </p>
          </div>

          {/* Internal Link to Blog Content */}
          <div className="my-8">
            <h3 className="text-2xl font-bold mb-4">Learn More</h3>
            <p className="text-gray-700">
              Read our guide on{' '}
              <a href="/blogs" className="text-blue-600 hover:text-blue-800 underline">
                how to price your land competitively
              </a>
              {' '}or learn about{' '}
              <a href="/blogs" className="text-blue-600 hover:text-blue-800 underline">
                Texas land regulations
              </a>.
            </p>
          </div>
        </section>

        {/* Related States Section */}
        <RelatedStates
          currentState="Texas"
          states={neighboringStates}
          title="Explore Neighboring States"
        />

        {/* Call to Action */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Land?</h2>
            <p className="text-gray-700 mb-6">
              Create your listing in minutes with our AI-powered platform
            </p>
            <a
              href="/new-listing"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Create Free Listing
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
```

### Example 2: California Page

```tsx
import Layout from '../components/ui/Layout';
import RelatedStates from '../components/ui/RelatedStates';

export default function SellLandFastCalifornia() {
  const neighboringStates = [
    {
      name: 'Nevada',
      slug: 'nevada',
      description: 'Tax-friendly state with diverse terrain and investment opportunities'
    },
    {
      name: 'Oregon',
      slug: 'oregon',
      description: 'Pacific Northwest beauty with coastal and mountain properties'
    },
    {
      name: 'Arizona',
      slug: 'arizona',
      description: 'Desert landscapes with strong investment potential'
    }
  ];

  return (
    <Layout>
      {/* Page content */}
      <RelatedStates currentState="California" states={neighboringStates} />
    </Layout>
  );
}
```

---

## Footer Implementation

The footer is automatically included when using the `Layout` component. It includes:

**Column 1 - Company**
- About Us
- Blog
- Premium Plans
- Contact Us

**Column 2 - Browse Properties**
- All Properties
- Advanced Search
- Saved Properties

**Column 2 - Sell Your Land**
- Sell Land Fast
- Create Listing

**Column 3 - Popular States (8 states)**
- Texas, California, Florida, Arizona, Colorado, North Carolina, Georgia, Tennessee

**Column 4 - Popular Cities (6 cities)**
- Houston, Dallas, Los Angeles, Jacksonville, San Antonio, Sacramento

**Column 4 - Contact Info**
- Email and phone

### Customizing Footer Links

To add more states or cities, edit `/src/components/ui/Footer.tsx`:

```tsx
const popularStates = [
  { name: 'Your State', path: '/sell-land-fast/your-state' },
  // ... more states
];

const popularCities = [
  { name: 'Your City', path: '/land-for-sale-in-your-city' },
  // ... more cities
];
```

---

## Property Page Links

### Adding Location Links to Property Detail

```tsx
import { Link } from 'react-router-dom';

function PropertyDetail({ property }) {
  const stateSlug = property.state.toLowerCase().replace(/\s+/g, '-');
  const citySlug = property.city.toLowerCase().replace(/\s+/g, '-');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Property Details */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <Link
              to={`/land-for-sale-in-${citySlug}`}
              className="hover:text-blue-600 underline"
            >
              {property.city}
            </Link>
            <span>,</span>
            <Link
              to={`/sell-land-fast-in-${stateSlug}`}
              className="hover:text-blue-600 underline"
            >
              {property.state}
            </Link>
          </div>
        </div>

        {/* Property Info */}
        {/* ... */}

        {/* Related Content Section */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Explore More</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to={`/properties?city=${property.city}`}
              className="text-blue-600 hover:text-blue-800"
            >
              More properties in {property.city} →
            </Link>
            <Link
              to={`/sell-land-fast-in-${stateSlug}`}
              className="text-blue-600 hover:text-blue-800"
            >
              Sell land in {property.state} →
            </Link>
            <Link
              to="/blogs"
              className="text-blue-600 hover:text-blue-800"
            >
              Land buying guides →
            </Link>
          </div>
        </div>

        {/* Nearby Properties (Already Implemented) */}
        <NearbyPropertiesSection propertyId={property.id} />
      </div>
    </Layout>
  );
}
```

---

## Blog Post Links

### Adding Internal Links to Blog Content

```tsx
import { Link } from 'react-router-dom';
import Layout from '../components/ui/Layout';

function BlogDetail({ blog, relatedBlogs }) {
  return (
    <Layout
      breadcrumbItems={[
        { label: 'Blogs', path: '/blogs' },
        { label: blog.title, path: `/blog/${blog.slug}` }
      ]}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Blog Content */}
        <article className="prose lg:prose-xl">
          <h1>{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

        {/* Related Resources */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Related Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/properties" className="text-blue-600 hover:text-blue-800">
                Browse available properties
              </Link>
            </li>
            <li>
              <Link to="/sell-land-fast" className="text-blue-600 hover:text-blue-800">
                Learn how to sell your land fast
              </Link>
            </li>
            <li>
              <Link to="/advanced-search" className="text-blue-600 hover:text-blue-800">
                Search for land by criteria
              </Link>
            </li>
          </ul>
        </div>

        {/* Related Blog Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((relatedBlog) => (
              <Link
                key={relatedBlog.id}
                to={`/blog/${relatedBlog.slug}`}
                className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold mb-2 line-clamp-2">
                  {relatedBlog.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {relatedBlog.excerpt}
                </p>
                <span className="text-blue-600 text-sm mt-2 inline-block">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA to More Blogs */}
        <div className="mt-8 text-center">
          <Link
            to="/blogs"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Blog Posts
          </Link>
        </div>
      </div>
    </Layout>
  );
}
```

---

## Best Practices

### 1. Link Attributes

#### Standard Internal Links
```tsx
<Link to="/properties">Browse Properties</Link>
```

#### Active Navigation Links
```tsx
<Link
  to="/properties"
  aria-current={isActive ? "page" : undefined}
>
  Properties
</Link>
```

#### External Links
```tsx
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  External Resource
</a>
```

### 2. Anchor Text Variations

**DON'T do this (over-optimization):**
```tsx
<Link to="/properties">buy land</Link>
<Link to="/properties">buy land</Link>
<Link to="/properties">buy land</Link>
```

**DO this (natural variation):**
```tsx
<Link to="/properties">browse available properties</Link>
<Link to="/properties">view all listings</Link>
<Link to="/properties">explore land opportunities</Link>
```

### 3. Contextual Linking

**Good contextual link:**
```tsx
<p>
  If you're looking for affordable land in the Southwest,{' '}
  <Link to="/land-for-sale-in-arizona" className="text-blue-600 hover:underline">
    Arizona offers excellent investment opportunities
  </Link>{' '}
  with diverse terrain and strong market growth.
</p>
```

**Bad contextual link:**
```tsx
<p>
  Arizona has great land. <Link to="/land-for-sale-in-arizona">Click here</Link>.
</p>
```

### 4. Link Density

**Don't overdo it:**
- Maximum 5-7 internal links per 500 words
- Links should add value, not clutter
- Prioritize links to tier 1 & 2 pages

**Good density example:**
```tsx
<article className="prose">
  <p>First paragraph (300 words) - 2 internal links</p>
  <p>Second paragraph (400 words) - 3 internal links</p>
  <p>Third paragraph (200 words) - 1 internal link</p>
  {/* Total: 900 words, 6 links = Good ratio */}
</article>
```

### 5. Visual Distinction

Make links visually distinct:

```tsx
<Link
  to="/properties"
  className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors"
>
  View Properties
</Link>
```

Or for button-style links:

```tsx
<Link
  to="/sell-land-fast"
  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
>
  Sell Your Land
</Link>
```

### 6. Semantic HTML

Use appropriate HTML elements:

```tsx
{/* Navigation links */}
<nav>
  <Link to="/properties">Properties</Link>
</nav>

{/* Call-to-action links */}
<Link to="/new-listing" className="btn btn-primary">
  Create Listing
</Link>

{/* Contextual content links */}
<p>
  Learn more about{' '}
  <Link to="/blogs">land investment strategies</Link>.
</p>
```

---

## Quick Implementation Checklist

- [ ] Wrap all pages with `Layout` component
- [ ] Add custom breadcrumbs where needed
- [ ] Add `RelatedStates` component to state pages
- [ ] Add location links to property detail pages
- [ ] Add related posts to blog detail pages
- [ ] Link blog content to relevant location pages
- [ ] Add contextual links in page content
- [ ] Review anchor text for natural variation
- [ ] Test all links for correct destinations
- [ ] Verify breadcrumbs generate correctly

---

## Example: Complete State Page Template

```tsx
import Layout from '../components/ui/Layout';
import RelatedStates from '../components/ui/RelatedStates';
import { Link } from 'react-router-dom';

export default function SellLandFastStatePage() {
  const state = {
    name: 'YourState',
    slug: 'yourstate',
    description: 'State description...'
  };

  const neighboringStates = [
    { name: 'State1', slug: 'state1', description: '...' },
    { name: 'State2', slug: 'state2', description: '...' },
    { name: 'State3', slug: 'state3', description: '...' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sell Your {state.name} Land Fast
          </h1>
          <p className="text-xl mb-8">
            AI-powered listings, professional media, competitive pricing
          </p>
          <div className="flex space-x-4">
            <Link
              to="/new-listing"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Create Free Listing
            </Link>
            <Link
              to="/properties"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Content with Internal Links */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Why Choose AcreageSale to Sell {state.name} Land?
        </h2>
        <div className="prose lg:prose-xl">
          <p>
            When you're ready to sell your land in {state.name}, choosing the right
            platform makes all the difference. Our{' '}
            <Link to="/about" className="text-blue-600 hover:underline">
              AI-powered marketplace
            </Link>{' '}
            connects you with serious buyers looking for{' '}
            <Link to={`/properties?state=${state.slug}`} className="text-blue-600 hover:underline">
              properties just like yours
            </Link>.
          </p>
          <p>
            Whether you have agricultural land, residential lots, or commercial
            property, our platform helps you reach thousands of potential buyers.{' '}
            <Link to="/blogs" className="text-blue-600 hover:underline">
              Learn more about selling land
            </Link>{' '}
            or{' '}
            <Link to="/premium" className="text-blue-600 hover:underline">
              explore our premium listing options
            </Link>.
          </p>
        </div>
      </section>

      {/* Related States */}
      <RelatedStates
        currentState={state.name}
        states={neighboringStates}
      />

      {/* CTA */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-700 mb-6">
            Create your listing in minutes. No credit card required.
          </p>
          <Link
            to="/new-listing"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Create Free Listing
          </Link>
        </div>
      </section>
    </Layout>
  );
}
```

---

## Measuring Success

After implementing internal links, track these metrics:

1. **Crawl Stats** (Google Search Console)
   - Pages crawled per day (should increase)
   - Average crawl depth (should decrease)

2. **Engagement Metrics** (Analytics)
   - Pages per session (target: +30%)
   - Average session duration (target: +25%)
   - Bounce rate (target: -15%)

3. **Link Metrics**
   - Internal links per page (target: 5-8)
   - Orphan pages (target: 0)
   - Click-through rate on internal links

4. **SEO Metrics**
   - Rankings for key pages (should improve)
   - Indexed pages (should increase)
   - Internal PageRank distribution (check via tools)

---

*Last Updated: 2026-01-12*
*Version: 1.0*
