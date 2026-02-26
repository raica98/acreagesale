import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateSEOFromSlug } from '../lib/seoGenerator';

interface SEOProps {
  slug?: string;
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterImage?: string;
  noindex?: boolean;
  structuredData?: object;
}

const DEFAULT_OG_IMAGE = 'https://acreagesale.com/2025-10-26_7-36-02 copy.jpg';
const SITE_NAME = 'AcreageSale';

export function SEO({
  slug,
  title: manualTitle,
  description: manualDescription,
  keywords: manualKeywords,
  canonical: manualCanonical,
  ogTitle: manualOgTitle,
  ogDescription: manualOgDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterImage,
  noindex = false,
  structuredData: manualStructuredData,
}: SEOProps) {
  const location = useLocation();

  const effectiveSlug = slug || location.pathname;
  const seoData = generateSEOFromSlug(effectiveSlug);

  const title = manualTitle || seoData.title;
  const description = manualDescription || seoData.description;
  const keywords = manualKeywords || seoData.keywords;
  const canonical = manualCanonical || seoData.canonical;
  const ogTitle = manualOgTitle || seoData.ogTitle;
  const ogDescription = manualOgDescription || seoData.ogDescription;
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;
  const finalTwitterImage = twitterImage || finalOgImage;
  const structuredData = manualStructuredData || seoData.structuredData;

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDescription);
      }
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      metaKeywords.setAttribute('content', keywords);
      if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
      }
    }

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

    const metaRobots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    if (!document.querySelector('meta[name="robots"]')) {
      document.head.appendChild(metaRobots);
    }

    if (ogTitle) {
      const ogTitleMeta = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
      ogTitleMeta.setAttribute('property', 'og:title');
      ogTitleMeta.setAttribute('content', ogTitle);
      if (!document.querySelector('meta[property="og:title"]')) {
        document.head.appendChild(ogTitleMeta);
      }
    }

    if (ogDescription) {
      const ogDescriptionMeta = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
      ogDescriptionMeta.setAttribute('property', 'og:description');
      ogDescriptionMeta.setAttribute('content', ogDescription);
      if (!document.querySelector('meta[property="og:description"]')) {
        document.head.appendChild(ogDescriptionMeta);
      }
    }

    if (finalOgImage) {
      const ogImageMeta = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
      ogImageMeta.setAttribute('property', 'og:image');
      ogImageMeta.setAttribute('content', finalOgImage);
      if (!document.querySelector('meta[property="og:image"]')) {
        document.head.appendChild(ogImageMeta);
      }

      const ogImageWidthMeta = document.querySelector('meta[property="og:image:width"]') || document.createElement('meta');
      ogImageWidthMeta.setAttribute('property', 'og:image:width');
      ogImageWidthMeta.setAttribute('content', '1200');
      if (!document.querySelector('meta[property="og:image:width"]')) {
        document.head.appendChild(ogImageWidthMeta);
      }

      const ogImageHeightMeta = document.querySelector('meta[property="og:image:height"]') || document.createElement('meta');
      ogImageHeightMeta.setAttribute('property', 'og:image:height');
      ogImageHeightMeta.setAttribute('content', '630');
      if (!document.querySelector('meta[property="og:image:height"]')) {
        document.head.appendChild(ogImageHeightMeta);
      }

      const ogImageAltMeta = document.querySelector('meta[property="og:image:alt"]') || document.createElement('meta');
      ogImageAltMeta.setAttribute('property', 'og:image:alt');
      ogImageAltMeta.setAttribute('content', `${title || SITE_NAME} - Land for sale across America`);
      if (!document.querySelector('meta[property="og:image:alt"]')) {
        document.head.appendChild(ogImageAltMeta);
      }
    }

    if (canonical) {
      const ogUrlMeta = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      ogUrlMeta.setAttribute('content', canonical);
      if (!document.querySelector('meta[property="og:url"]')) {
        document.head.appendChild(ogUrlMeta);
      }
    }

    const ogTypeMeta = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogTypeMeta.setAttribute('property', 'og:type');
    ogTypeMeta.setAttribute('content', ogType);
    if (!document.querySelector('meta[property="og:type"]')) {
      document.head.appendChild(ogTypeMeta);
    }

    const ogSiteNameMeta = document.querySelector('meta[property="og:site_name"]') || document.createElement('meta');
    ogSiteNameMeta.setAttribute('property', 'og:site_name');
    ogSiteNameMeta.setAttribute('content', SITE_NAME);
    if (!document.querySelector('meta[property="og:site_name"]')) {
      document.head.appendChild(ogSiteNameMeta);
    }

    const twitterCardMeta = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCardMeta.setAttribute('name', 'twitter:card');
    twitterCardMeta.setAttribute('content', twitterCard);
    if (!document.querySelector('meta[name="twitter:card"]')) {
      document.head.appendChild(twitterCardMeta);
    }

    if (ogTitle) {
      const twitterTitle = document.querySelector('meta[name="twitter:title"]') || document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      twitterTitle.setAttribute('content', ogTitle);
      if (!document.querySelector('meta[name="twitter:title"]')) {
        document.head.appendChild(twitterTitle);
      }
    }

    if (ogDescription) {
      const twitterDescription = document.querySelector('meta[name="twitter:description"]') || document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      twitterDescription.setAttribute('content', ogDescription);
      if (!document.querySelector('meta[name="twitter:description"]')) {
        document.head.appendChild(twitterDescription);
      }
    }

    if (finalTwitterImage) {
      const twitterImageMeta = document.querySelector('meta[name="twitter:image"]') || document.createElement('meta');
      twitterImageMeta.setAttribute('name', 'twitter:image');
      twitterImageMeta.setAttribute('content', finalTwitterImage);
      if (!document.querySelector('meta[name="twitter:image"]')) {
        document.head.appendChild(twitterImageMeta);
      }

      const twitterImageAltMeta = document.querySelector('meta[name="twitter:image:alt"]') || document.createElement('meta');
      twitterImageAltMeta.setAttribute('name', 'twitter:image:alt');
      twitterImageAltMeta.setAttribute('content', `${title || SITE_NAME} - Land for sale across America`);
      if (!document.querySelector('meta[name="twitter:image:alt"]')) {
        document.head.appendChild(twitterImageAltMeta);
      }
    }

    if (structuredData) {
      let jsonLdScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(structuredData);
    }

    return () => {
      const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, finalOgImage, finalTwitterImage, ogType, twitterCard, noindex, structuredData]);

  return null;
}
