# URL Structure Best Practices

## Current Issues Analysis

### Inconsistencies Found

1. **Pattern Variations**
   - `/sell-land-fast-alabama` (no "in")
   - `/sell-land-fast-in-alaska` (with "in")
   - Both patterns coexist across 51 state pages

2. **Spelling Variants**
   - `/land-for-sale-in-newmexico` (one word)
   - `/land-for-sale-in-new-mexico` (hyphenated)
   - `/sell-land-fast-in-massachsetts` (typo variant)

3. **Duplicate Routes**
   - Phelan: 5 different URLs to same content
   - Contact: 3 different URLs
   - New Listing: 2 routes mapped

4. **Location Format Inconsistencies**
   - `/land-for-sale-washington` (no "in")
   - `/land-for-sale-in-washington` (with "in")

---

## Recommended URL Structure

### 1. State Pages (Selling Focus)

**Choose ONE pattern and stick to it:**

#### Option A: With "in" Prefix (RECOMMENDED)
```
/sell-land-fast-in-texas
/sell-land-fast-in-california
/sell-land-fast-in-new-york
/sell-land-fast-in-new-mexico
/sell-land-fast-in-north-carolina
```

**Pros:**
- More natural language
- Clearer intent
- Better for voice search
- Matches user expectations

**Cons:**
- Slightly longer URLs

#### Option B: Without "in" Prefix
```
/sell-land-fast/texas
/sell-land-fast/california
/sell-land-fast/new-york
```

**Pros:**
- Shorter URLs
- Cleaner hierarchy
- Easier to scale

**Cons:**
- Less natural language
- May confuse with nested routes

**RECOMMENDATION:** Use Option A for existing routes, but standardize the pattern.

---

### 2. City/Location Pages (Buying Focus)

**Recommended Pattern:**
```
/land-for-sale-in-houston
/land-for-sale-in-los-angeles
/land-for-sale-in-phelan-ca
/land-for-sale-in-joshua-tree
```

**For cities with state name needed:**
```
/land-for-sale-in-[city]-[state-abbr]
Examples:
- /land-for-sale-in-austin-tx
- /land-for-sale-in-miami-fl
- /land-for-sale-in-phoenix-az
```

**Alternative (Hierarchical):**
```
/land-for-sale/texas/houston
/land-for-sale/california/los-angeles
```

---

### 3. Property URLs

**Current (Good):**
```
/property/123
/property/456
```

**Better (SEO-Friendly with Slug):**
```
/property/123/5-acres-riverside-california
/property/456/10-acres-mountain-view-texas
```

**Implementation:**
```tsx
// In App.tsx routing
<Route path="/property/:id/:slug?" element={<PropertyDetail />} />

// Generate slug from property data
const generateSlug = (property: Property) => {
  const parts = [
    property.acres && `${property.acres}-acres`,
    property.city,
    property.state
  ].filter(Boolean);

  return parts.join('-').toLowerCase().replace(/[^a-z0-9-]/g, '-');
};

// Link to property
<Link to={`/property/${property.id}/${generateSlug(property)}`}>
  View Property
</Link>
```

**Benefits:**
- Better SEO (keywords in URL)
- More descriptive sharing
- Backwards compatible (slug is optional)
- Easier to understand URLs

---

### 4. Blog URLs

**Current (Good):**
```
/blog/how-to-sell-land-fast
/blog/land-investment-tips
```

**Better (With Categories):**
```
/blog/selling/how-to-sell-land-fast
/blog/investing/land-investment-tips
/blog/legal/understanding-zoning-laws
```

**Implementation:**
```tsx
// Add category to blog schema
interface Blog {
  id: string;
  slug: string;
  category: 'selling' | 'buying' | 'investing' | 'legal' | 'guides';
  // ...
}

// Route
<Route path="/blog/:category/:slug" element={<BlogDetail />} />

// Backwards compatibility
<Route path="/blog/:slug" element={<BlogDetail />} />
```

---

### 5. Search & Filter URLs

**Properties Search:**
```
/properties                           // All properties
/properties?state=texas              // State filter
/properties?city=houston&state=tx    // City + state
/properties?min_acres=5&max_acres=10 // Acreage range
/properties?min_price=50000          // Price filter
/properties?type=residential         // Property type
```

**Advanced Search:**
```
/advanced-search
/advanced-search?q=waterfront+texas
```

**Best Practices:**
- Use query parameters for filters (don't create routes)
- Keep parameter names short but clear
- Support URL sharing (all filters in URL)
- Use canonical tags to avoid duplicate content

---

## Canonical URL Strategy

### For Duplicate Content

#### Spelling Variants
```html
<!-- On /sell-land-fast-in-massachsetts (typo page) -->
<link rel="canonical" href="https://acreagesale.com/sell-land-fast-in-massachusetts" />
```

#### Multiple Phelan Pages
```html
<!-- On /phelan -->
<link rel="canonical" href="https://acreagesale.com/land-for-sale-in-phelan-ca" />

<!-- On /phelan-2 -->
<link rel="canonical" href="https://acreagesale.com/land-for-sale-in-phelan-ca" />

<!-- On /land-in-phelan -->
<link rel="canonical" href="https://acreagesale.com/land-for-sale-in-phelan-ca" />
```

#### Pagination
```html
<!-- On /properties?page=2 -->
<link rel="canonical" href="https://acreagesale.com/properties" />

<!-- Or use rel="prev" and rel="next" for paginated series -->
<link rel="prev" href="https://acreagesale.com/properties?page=1" />
<link rel="next" href="https://acreagesale.com/properties?page=3" />
```

### Implementation in SEO Component

```tsx
// In src/components/SEO.tsx
interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  // ...
}

export function SEO({ title, description, canonical, ...props }: SEOProps) {
  const currentUrl = typeof window !== 'undefined'
    ? window.location.href
    : '';

  const canonicalUrl = canonical || currentUrl.split('?')[0];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Other meta tags */}
    </Helmet>
  );
}

// Usage
<SEO
  title="Land for Sale in Phelan, CA"
  description="..."
  canonical="https://acreagesale.com/land-for-sale-in-phelan-ca"
/>
```

---

## 301 Redirects Strategy

### Consolidate Duplicate Routes

**In `vite.config.ts` or `_redirects` file:**

```
# Consolidate Phelan pages
/phelan                      /land-for-sale-in-phelan-ca  301
/phelan-2                    /land-for-sale-in-phelan-ca  301
/land-in-phelan              /land-for-sale-in-phelan-ca  301
/phelan-ca-land-for-sale     /land-for-sale-in-phelan-ca  301

# Fix spelling variants
/sell-land-fast-in-massachsetts  /sell-land-fast-in-massachusetts  301

# Consolidate contact pages
/about_1                     /about                       301
/contact-us-3                /contact                     301

# Standardize New Mexico URLs
/land-for-sale-in-newmexico  /land-for-sale-in-new-mexico 301

# Ensure consistency in Washington URLs
/land-for-sale-washington    /land-for-sale-in-washington 301
```

**For Netlify (_redirects file):**
```
# public/_redirects
/phelan    /land-for-sale-in-phelan-ca  301
/phelan-2  /land-for-sale-in-phelan-ca  301
```

**For Vercel (vercel.json):**
```json
{
  "redirects": [
    {
      "source": "/phelan",
      "destination": "/land-for-sale-in-phelan-ca",
      "permanent": true
    },
    {
      "source": "/phelan-2",
      "destination": "/land-for-sale-in-phelan-ca",
      "permanent": true
    }
  ]
}
```

---

## URL Naming Conventions

### General Rules

1. **Use lowercase only**
   - ✅ `/sell-land-fast-in-texas`
   - ❌ `/Sell-Land-Fast-In-Texas`

2. **Use hyphens, not underscores**
   - ✅ `/sell-land-fast`
   - ❌ `/sell_land_fast`

3. **Keep URLs short but descriptive**
   - ✅ `/land-for-sale-in-texas`
   - ❌ `/properties-that-are-land-located-in-the-state-of-texas`

4. **Avoid stop words when possible**
   - ✅ `/sell-land-texas` (acceptable)
   - ⚠️ `/sell-land-fast-in-texas` (okay if consistent)

5. **Use location abbreviations carefully**
   - ✅ `/property/123/austin-tx` (property detail)
   - ⚠️ `/land-tx` (too ambiguous for main page)
   - ✅ `/land-for-sale-in-texas` (clear for main page)

### Multi-Word States

**Consistent hyphenation:**
```
/sell-land-fast-in-new-york
/sell-land-fast-in-new-mexico
/sell-land-fast-in-new-hampshire
/sell-land-fast-in-new-jersey
/sell-land-fast-in-north-carolina
/sell-land-fast-in-north-dakota
/sell-land-fast-in-south-carolina
/sell-land-fast-in-south-dakota
/sell-land-fast-in-west-virginia
/sell-land-fast-in-rhode-island
```

**NEVER:**
```
❌ /sell-land-fast-in-newyork
❌ /sell-land-fast-in-northcarolina
❌ /sell-land-fast-in-newmexico
```

---

## URL Parameters

### Filter Parameters (Properties Page)

**Use consistent naming:**
```
?state=texas
?city=houston
?min_acres=5
?max_acres=50
?min_price=10000
?max_price=500000
?type=residential
?sort=price_asc
?page=2
```

**Don't use:**
```
❌ ?s=texas
❌ ?minAcres=5
❌ ?ACRES_MIN=5
```

### Search Parameters

**Use 'q' for query:**
```
/advanced-search?q=waterfront+land+texas
/properties?q=5+acres
```

### Sorting

**Use descriptive sort values:**
```
?sort=price_asc      // Price: Low to High
?sort=price_desc     // Price: High to Low
?sort=acres_desc     // Size: Large to Small
?sort=date_desc      // Newest First
```

---

## Sitemap Structure

**Organize sitemap by priority:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Tier 1: High Priority Pages -->
  <url>
    <loc>https://acreagesale.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://acreagesale.com/properties</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://acreagesale.com/sell-land-fast</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Tier 2: State Pages -->
  <url>
    <loc>https://acreagesale.com/sell-land-fast-in-texas</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Tier 3: City Pages -->
  <url>
    <loc>https://acreagesale.com/land-for-sale-in-houston</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Dynamic: Individual Properties -->
  <url>
    <loc>https://acreagesale.com/property/123/5-acres-austin-tx</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Dynamic: Blog Posts -->
  <url>
    <loc>https://acreagesale.com/blog/how-to-sell-land-fast</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

**Generate dynamically:**
```tsx
// scripts/generate-sitemap.js
import { supabase } from './supabase';

async function generateSitemap() {
  const baseUrl = 'https://acreagesale.com';

  // Static pages
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/properties', priority: 0.9, changefreq: 'daily' },
    { url: '/sell-land-fast', priority: 0.9, changefreq: 'weekly' },
    // ... more static pages
  ];

  // Dynamic: Properties
  const { data: properties } = await supabase
    .from('properties')
    .select('id, title, city, state, updated_at');

  const propertyUrls = properties.map(p => ({
    url: `/property/${p.id}/${generateSlug(p)}`,
    priority: 0.5,
    changefreq: 'weekly',
    lastmod: p.updated_at
  }));

  // Dynamic: Blogs
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug, updated_at');

  const blogUrls = blogs.map(b => ({
    url: `/blog/${b.slug}`,
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: b.updated_at
  }));

  // Combine and generate XML
  const allUrls = [...staticPages, ...propertyUrls, ...blogUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  // Write to public/sitemap.xml
  fs.writeFileSync('public/sitemap.xml', xml);
}
```

---

## Migration Plan

### Phase 1: Add Canonical Tags (Week 1)
- Add canonical tags to all duplicate pages
- Point to preferred URL
- No user disruption

### Phase 2: Update Internal Links (Week 2)
- Update all internal links to canonical URLs
- Update footer, navigation, content links
- No broken links

### Phase 3: Implement 301 Redirects (Week 3)
- Add redirects from old URLs to canonical URLs
- Test all redirects
- Monitor Google Search Console for errors

### Phase 4: Update External References (Week 4)
- Update any external links you control
- Submit updated sitemap to Google
- Monitor traffic and rankings

### Phase 5: Clean Up (Week 5+)
- After 30 days, verify redirects working
- Check for any remaining duplicate content
- Update documentation

---

## Monitoring & Validation

### Tools to Use

1. **Google Search Console**
   - Check for duplicate content issues
   - Monitor coverage reports
   - Verify redirects working

2. **Screaming Frog SEO Spider**
   - Crawl site to find duplicates
   - Check redirect chains
   - Identify broken links

3. **Analytics**
   - Monitor traffic to old URLs (should redirect)
   - Check for 404 errors
   - Track pages per session (should increase)

### Validation Checklist

- [ ] All URLs use lowercase
- [ ] All URLs use hyphens (not underscores)
- [ ] Multi-word states are hyphenated
- [ ] Duplicate pages have canonical tags
- [ ] 301 redirects are in place
- [ ] Internal links point to canonical URLs
- [ ] Sitemap uses canonical URLs
- [ ] No redirect chains (A→B→C)
- [ ] All redirects are 301 (permanent)
- [ ] Google Search Console shows no errors

---

## URL Structure Checklist

### Before Launching New Pages

- [ ] URL follows established pattern
- [ ] URL uses lowercase and hyphens
- [ ] No duplicate URL exists
- [ ] Canonical tag is set correctly
- [ ] Internal links use this URL
- [ ] Added to sitemap
- [ ] Tested in development
- [ ] Verified no redirect chains

### For Existing Pages

- [ ] Audit for duplicate URLs
- [ ] Choose canonical URL for each page
- [ ] Add canonical tags
- [ ] Update internal links
- [ ] Implement 301 redirects
- [ ] Update sitemap
- [ ] Monitor in Search Console

---

*Last Updated: 2026-01-12*
*Version: 1.0*
