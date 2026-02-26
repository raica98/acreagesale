# Dynamic SEO Automation System

## Overview
This system automatically generates SEO metadata for every page based solely on the page slug. No defaults, no fallbacks - metadata is generated dynamically at runtime.

## Features
- ✅ Focus keyphrase derived from slug
- ✅ Title tag (≤ 60 characters)
- ✅ Meta description (≤ 160 characters)
- ✅ Open Graph (OG) tags for social sharing
- ✅ Canonical URLs
- ✅ Keywords (slug + 2-3 related terms)
- ✅ JSON-LD structured data (Schema.org WebPage)
- ✅ Twitter Card metadata
- ✅ SSR-compatible

## Usage

### Automatic Slug-Based SEO (Recommended)

Simply import and use the `<SEO />` component with no props. It will automatically use the current route:

```tsx
import { SEO } from '../components/SEO';

export function MyPage() {
  return (
    <>
      <SEO />
      {/* Your page content */}
    </>
  );
}
```

### With Explicit Slug

```tsx
<SEO slug="about-us" />
```

### Manual Override (Optional)

You can still override specific fields if needed:

```tsx
<SEO
  slug="about-us"
  title="Custom Title"
  description="Custom description"
/>
```

## How It Works

### Slug to SEO Transformation

For slug: `sell-land-fast`

**Generated Metadata:**
- Focus Keyphrase: `sell land fast`
- Title: `Sell Land Fast | AcreageSale` (≤60 chars)
- Description: `Explore Sell Land Fast. Find detailed information about sell land fast on AcreageSale.` (≤160 chars)
- Keywords: `sell land fast, sell land, land fast`
- Canonical: `https://acreagesale.com/sell-land-fast`
- OG Title: Same as title
- OG Description: Same as description
- Structured Data (JSON-LD):
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sell Land Fast",
  "description": "Explore Sell Land Fast...",
  "url": "https://acreagesale.com/sell-land-fast"
}
```

## Examples

### Example 1: Simple Page
```tsx
// pages/Contact.tsx
export function Contact() {
  return (
    <>
      <SEO slug="contact" />
      {/* Contact form */}
    </>
  );
}
```

**Generated:**
- Title: `Contact | AcreageSale`
- Description: `Explore Contact. Find detailed information about contact on AcreageSale.`
- Keywords: `contact`
- Canonical: `https://acreagesale.com/contact`

### Example 2: Multi-Word Slug
```tsx
// pages/LandForSaleInCalifornia.tsx
export function LandForSaleInCalifornia() {
  return (
    <>
      <SEO slug="land-for-sale-in-california" />
      {/* Page content */}
    </>
  );
}
```

**Generated:**
- Title: `Land For Sale In California | AcreageSale`
- Description: `Explore Land For Sale In California. Find detailed information about land for sale in california on AcreageSale.`
- Keywords: `land for sale in california, land for, in california`
- Canonical: `https://acreagesale.com/land-for-sale-in-california`

### Example 3: Property Listing with Data
```tsx
import { generatePropertySEO } from '../lib/seoGenerator';

export function PropertyDetail({ property }) {
  const seoData = generatePropertySEO(`property/${property.id}`, {
    city: property.city,
    state: property.state,
    acres: property.size_acres,
    price: property.price
  });

  return (
    <>
      <SEO
        slug={`property/${property.id}`}
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        structuredData={seoData.structuredData}
      />
      {/* Property details */}
    </>
  );
}
```

**Generated:**
- Title: `5 Acres in Riverside, CA | AcreageSale`
- Description: `5 acres for sale in Riverside, CA - $50,000. View details and listing information.`
- Keywords: `property 123, land riverside, land ca, riverside ca land`
- Structured Data: RealEstateListing schema

## No Defaults Policy

This system strictly adheres to a **no defaults, no fallbacks** policy:

- If no slug is provided, metadata will be empty
- No placeholder titles like "Untitled Page"
- No default descriptions like "Welcome to our site"
- No fallback images
- Every piece of metadata is derived from the slug or explicitly provided

## API Reference

### `SEO` Component Props

```typescript
interface SEOProps {
  slug?: string;              // Page slug for automatic generation
  title?: string;             // Manual title override
  description?: string;       // Manual description override
  keywords?: string;          // Manual keywords override
  canonical?: string;         // Manual canonical URL override
  ogTitle?: string;           // Manual OG title override
  ogDescription?: string;     // Manual OG description override
  ogImage?: string;           // OG image URL
  noindex?: boolean;          // Prevent search engine indexing
  structuredData?: object;    // Custom JSON-LD structured data
}
```

### `generateSEOFromSlug()` Function

```typescript
function generateSEOFromSlug(slug: string): SEOMetadata
```

Generates complete SEO metadata from a slug.

### `generatePropertySEO()` Function

```typescript
function generatePropertySEO(
  slug: string,
  propertyData?: {
    city?: string;
    state?: string;
    acres?: number;
    price?: number;
  }
): SEOMetadata
```

Generates property-specific SEO metadata with RealEstateListing schema.

## Meta Tags Generated

### Required Tags (Always Present)
- `<title>` - Page title
- `<meta name="description">` - Meta description
- `<meta name="robots">` - Indexing instructions
- `<link rel="canonical">` - Canonical URL
- `<meta property="og:type">` - Always "website"
- `<meta name="twitter:card">` - Always "summary_large_image"

### Conditional Tags (Only If Data Available)
- `<meta name="keywords">` - Only if keywords exist
- `<meta property="og:title">` - Only if title exists
- `<meta property="og:description">` - Only if description exists
- `<meta property="og:image">` - Only if image provided
- `<meta property="og:url">` - Only if canonical exists
- `<meta name="twitter:title">` - Only if title exists
- `<meta name="twitter:description">` - Only if description exists
- `<script type="application/ld+json">` - Only if structured data exists

## Testing

To verify SEO metadata is correctly generated:

1. Navigate to any page
2. View page source (Ctrl+U / Cmd+Option+U)
3. Check `<head>` section for meta tags
4. Verify all tags are based on the page slug
5. Confirm no placeholder or default values exist

## SSR Compatibility

This system is fully compatible with server-side rendering:
- Uses `useEffect` for client-side updates
- Tags are added/updated in `<head>` dynamically
- JSON-LD script is properly injected and cleaned up
- Works with React Router's `useLocation` hook

## Best Practices

1. **Use descriptive slugs**: `about-us` is better than `about`
2. **Keep slugs concise**: Shorter slugs = better titles
3. **Use hyphens**: `land-for-sale` not `land_for_sale`
4. **Be specific**: `sell-land-california` is better than `sell`
5. **No special characters**: Avoid symbols, numbers at start
6. **Lowercase**: Always use lowercase slugs

## Migration Guide

### Before (Manual SEO)
```tsx
<SEO
  title="About Us - AcreageSale.com | Expert Land Sales"
  description="Learn about AcreageSale.com, the leading platform..."
  keywords="about acreage sale, land marketplace, buy sell land"
  canonical="https://acreagesale.com/about"
/>
```

### After (Automatic SEO)
```tsx
<SEO slug="about-us" />
```

That's it! The system handles everything automatically.
