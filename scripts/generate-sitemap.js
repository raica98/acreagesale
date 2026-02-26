import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BASE_URL = 'https://acreagesale.com';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/properties', changefreq: 'daily', priority: '0.9' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blogs', changefreq: 'weekly', priority: '0.8' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
  { loc: '/sell-land-fast', changefreq: 'monthly', priority: '0.9' },
  { loc: '/sell-my-land-fast', changefreq: 'monthly', priority: '0.9' },
  { loc: '/advanced-search', changefreq: 'monthly', priority: '0.7' },
];

const sellLandFastPages = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut',
  'delaware', 'florida', 'georgia', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas',
  'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota',
  'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey',
  'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio', 'oklahoma', 'oregon',
  'pennsylvania', 'rhode-island', 'south-carolina', 'south-dakota', 'tennessee', 'texas',
  'utah', 'vermont', 'virginia', 'washington', 'wisconsin', 'wyoming'
].map(state => ({
  loc: state === 'alabama' ? `/sell-land-fast-${state}` : `/sell-land-fast-in-${state}`,
  changefreq: 'monthly',
  priority: '0.7'
}));

const landForSalePages = [
  { slug: 'dallas', name: 'Dallas' },
  { slug: 'florida', name: 'Florida' },
  { slug: 'houston', name: 'Houston' },
  { slug: 'indiana', name: 'Indiana' },
  { slug: 'iowa', name: 'Iowa' },
  { slug: 'jacksonville', name: 'Jacksonville' },
  { slug: 'jamaica', name: 'Jamaica' },
  { slug: 'joshua-tree', name: 'Joshua Tree' },
  { slug: 'kansas', name: 'Kansas' },
  { slug: 'knoxville', name: 'Knoxville' },
  { slug: 'los-angeles', name: 'Los Angeles' },
  { slug: 'louisiana', name: 'Louisiana' },
  { slug: 'maryland', name: 'Maryland' },
  { slug: 'new-hampshire', name: 'New Hampshire' },
  { slug: 'new-jersey', name: 'New Jersey' },
  { slug: 'newmexico', name: 'New Mexico' },
  { slug: 'new-mexico', name: 'New Mexico' },
  { slug: 'pa', name: 'Pennsylvania' },
  { slug: 'phelan', name: 'Phelan' },
  { slug: 'sacramento', name: 'Sacramento' },
  { slug: 'san-antonio', name: 'San Antonio' },
  { slug: 'south-carolina', name: 'South Carolina' },
  { slug: 'south-dakota', name: 'South Dakota' },
  { slug: 'temecula', name: 'Temecula' },
  { slug: 'utah', name: 'Utah' },
  { slug: 'vermont', name: 'Vermont' },
  { slug: 'virginia', name: 'Virginia' },
  { slug: 'washington', name: 'Washington' },
].map(location => ({
  loc: `/land-for-sale-in-${location.slug}`,
  changefreq: 'weekly',
  priority: '0.7'
}));

const phelanPages = [
  { loc: '/phelan', changefreq: 'weekly', priority: '0.6' },
  { loc: '/phelan-2', changefreq: 'weekly', priority: '0.6' },
  { loc: '/phelan-ca-land-for-sale', changefreq: 'weekly', priority: '0.6' },
  { loc: '/land-in-phelan', changefreq: 'weekly', priority: '0.6' },
  { loc: '/land-for-sale-washington', changefreq: 'weekly', priority: '0.7' },
];

async function generateSitemap() {
  console.log('Generating sitemap...');

  let properties = [];
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('id, updated_at')
      .eq('status', 'active')
      .order('updated_at', { ascending: false })
      .limit(5000);

    if (error) throw error;
    properties = data || [];
    console.log(`Found ${properties.length} active properties`);
  } catch (error) {
    console.error('Error fetching properties:', error);
    console.log('Continuing with static pages only...');
  }

  let blogs = [];
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('slug, updated_at')
      .eq('published', true)
      .order('updated_at', { ascending: false })
      .limit(1000);

    if (error) throw error;
    blogs = data || [];
    console.log(`Found ${blogs.length} published blogs`);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    console.log('Continuing without blogs...');
  }

  const urls = [];

  staticPages.forEach(page => {
    urls.push(`  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  });

  sellLandFastPages.forEach(page => {
    urls.push(`  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  });

  landForSalePages.forEach(page => {
    urls.push(`  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  });

  phelanPages.forEach(page => {
    urls.push(`  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  });

  properties.forEach(property => {
    const lastmod = property.updated_at ? new Date(property.updated_at).toISOString().split('T')[0] : today;
    urls.push(`  <url>
    <loc>${BASE_URL}/property/${property.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  blogs.forEach(blog => {
    const lastmod = blog.updated_at ? new Date(blog.updated_at).toISOString().split('T')[0] : today;
    urls.push(`  <url>
    <loc>${BASE_URL}/blog/${blog.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemap, 'utf8');

  console.log(`Sitemap generated successfully with ${urls.length} URLs!`);
  console.log(`Output: ${outputPath}`);
}

generateSitemap().catch(error => {
  console.error('Failed to generate sitemap:', error);
  process.exit(1);
});
