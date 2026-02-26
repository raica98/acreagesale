# Internal Linking Quick Reference Card

## 🚀 New Components

| Component | Import | Purpose |
|-----------|--------|---------|
| **Layout** | `import Layout from '../components/ui/Layout'` | Full page wrapper with header, breadcrumbs, footer |
| **Breadcrumbs** | `import Breadcrumbs from '../components/ui/Breadcrumbs'` | Navigation trail |
| **Footer** | `import Footer from '../components/ui/Footer'` | 30+ site links |
| **RelatedStates** | `import RelatedStates from '../components/ui/RelatedStates'` | Geographic connections |

---

## ⚡ Quick Implementation

### Wrap Any Page
```tsx
import Layout from '../components/ui/Layout';

export default function MyPage() {
  return <Layout>{/* content */}</Layout>;
}
```

### Add Related States
```tsx
<RelatedStates
  currentState="Texas"
  states={[
    { name: 'Oklahoma', slug: 'oklahoma', description: 'Border state' }
  ]}
/>
```

---

## 🎯 Link Priorities

### Tier 1 (10-15 links)
- Homepage
- **Properties** (now in nav ✅)
- Sell Land Fast
- Blogs
- About

### Tier 2 (8-12 links)
- Individual blogs
- Advanced Search
- Premium
- Dashboard

### Tier 3 (5-8 links)
- State pages (51)
- City pages (30+)

---

## 📝 Anchor Text DOs and DONTs

### ✅ DO
```tsx
<Link to="/properties">browse properties</Link>
<Link to="/properties">view all listings</Link>
<Link to="/properties">available land</Link>
```

### ❌ DON'T
```tsx
<Link to="/properties">click here</Link>
<Link to="/properties">click here</Link>
<Link to="/properties">click here</Link>
```

---

## 🔗 Link Attributes

### Internal Links
```tsx
<Link to="/properties">Text</Link>
```

### External Links
```tsx
<a href="https://..." target="_blank" rel="noopener noreferrer">
  Text
</a>
```

### Active Nav Link
```tsx
<Link to="/properties" aria-current="page">Properties</Link>
```

---

## 🗺️ URL Patterns

### State Pages
```
✅ /sell-land-fast-in-texas
✅ /sell-land-fast-in-new-mexico
❌ /sell-land-fast-in-newmexico
```

### City Pages
```
✅ /land-for-sale-in-houston
✅ /land-for-sale-in-phelan-ca
❌ /landforsale/houston
```

### Properties
```
✅ /property/123/5-acres-austin-texas
✅ /property/123
❌ /Property/123
```

---

## 🎨 Link Styling

### Text Link
```tsx
<Link
  to="/path"
  className="text-blue-600 hover:text-blue-800 underline"
>
  Link Text
</Link>
```

### Button Link
```tsx
<Link
  to="/path"
  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  Button Text
</Link>
```

---

## 📊 What Changed

### Navigation
**Before:** Home | Sell Land Fast | About | Blogs | Contact
**After:** Home | **Properties** | Sell Land Fast | About | Blogs | Contact

### Footer
**Before:** None
**After:** 30+ internal links across 5 columns

### Breadcrumbs
**Before:** Structured data only
**After:** Visible navigation trail

### State Pages
**Before:** Isolated, no connections
**After:** Related states component

---

## ✅ Implementation Checklist

### Phase 1 (Week 1)
- [ ] Wrap homepage with `<Layout>`
- [ ] Wrap 5 main pages with `<Layout>`
- [ ] Test breadcrumbs working
- [ ] Verify footer appears

### Phase 2 (Week 2)
- [ ] Add `RelatedStates` to 10 biggest states
- [ ] Test related states links
- [ ] Add to remaining 41 state pages

### Phase 3 (Week 3)
- [ ] Add location links to property pages
- [ ] Add related posts to blogs
- [ ] Add contextual links in content

### Phase 4 (Week 4)
- [ ] Add canonical tags
- [ ] Implement redirects
- [ ] Update sitemap
- [ ] Deploy and monitor

---

## 📈 Success Metrics

| Metric | Before | Target |
|--------|--------|--------|
| **Internal Links/Page** | 0-2 | 5-8 |
| **Orphan Pages** | 81 | 0 |
| **Pages/Session** | 1.5 | 2.5+ |
| **Bounce Rate** | 65% | 50% |
| **Session Duration** | 45s | 90s+ |

---

## 🆘 Common Issues

### Breadcrumbs Not Showing
```tsx
// Make sure you're NOT on homepage
// Homepage has breadcrumbs disabled by default
<Layout showBreadcrumbs={false}> // This disables them
```

### Footer Links Not Working
```tsx
// Check you're using Layout component
import Layout from '../components/ui/Layout';
// NOT importing Footer directly
```

### Related States Not Showing
```tsx
// Make sure component is inside Layout
<Layout>
  <div>Content</div>
  <RelatedStates /> {/* Add here */}
</Layout>
```

---

## 📚 Full Documentation

1. **INTERNAL_LINKING_STRATEGY.md** - Complete strategy
2. **INTERNAL_LINKING_IMPLEMENTATION.md** - Code examples
3. **URL_STRUCTURE_BEST_PRACTICES.md** - URL guidelines
4. **INTERNAL_LINKING_SUMMARY.md** - Overview

---

## 🎯 Priority Actions

1. **TODAY:** Wrap 10 most visited pages with `<Layout>`
2. **THIS WEEK:** Add `RelatedStates` to top 10 state pages
3. **NEXT WEEK:** Add to all remaining pages
4. **WEEK 4:** Monitor and optimize

---

## 💡 Pro Tips

- Start with high-traffic pages first
- Test one page completely before rolling out
- Monitor Google Search Console for errors
- Use varied anchor text (don't repeat)
- Link to Tier 1 pages more often
- Keep link density reasonable (5-7 per 500 words)

---

## 🔧 Component Props

### Layout
```tsx
<Layout
  showBreadcrumbs={true}  // Optional, default true
  breadcrumbItems={[...]} // Optional, auto-generates if not provided
  className=""            // Optional styling
>
```

### RelatedStates
```tsx
<RelatedStates
  currentState="Texas"    // Required
  states={[...]}          // Required array
  title="Custom Title"    // Optional
  className=""            // Optional
/>
```

---

*Print this page for quick reference while implementing!*
*Updated: 2026-01-12 | Version: 1.0*
