import React, { useEffect } from 'react';
import { SEOMeta } from '../types';

interface SEOHeadProps extends SEOMeta {
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  schemas?: object[];
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, schema, schemas, canonicalUrl, ogType = 'website', ogImage = 'https://www.readbluelockmanga.online/blue-lock.webp' }) => {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) { metaDescription = document.createElement('meta'); metaDescription.setAttribute('name', 'description'); document.head.appendChild(metaDescription); }
    metaDescription.setAttribute('content', description);

    const ogTags: Record<string, string> = { 'og:title': title, 'og:description': description, 'og:type': ogType, 'og:site_name': 'Blue Lock Manga', 'og:image': ogImage };
    if (canonicalUrl) ogTags['og:url'] = canonicalUrl;
    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    });

    const twitterTags: Record<string, string> = { 'twitter:title': title, 'twitter:description': description, 'twitter:image': ogImage };
    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[property="${name}"]`) as HTMLMetaElement | null;
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', name); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    });

    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) { linkCanonical = document.createElement('link'); linkCanonical.setAttribute('rel', 'canonical'); document.head.appendChild(linkCanonical); }
      linkCanonical.setAttribute('href', canonicalUrl);
    }

    if (schema) {
      let scriptSchema = document.querySelector('#structured-data');
      if (!scriptSchema) { scriptSchema = document.createElement('script'); scriptSchema.id = 'structured-data'; scriptSchema.setAttribute('type', 'application/ld+json'); document.head.appendChild(scriptSchema); }
      scriptSchema.textContent = JSON.stringify(schema);
    }

    if (schemas && schemas.length > 0) {
      document.querySelectorAll('.structured-data-extra').forEach(el => el.remove());
      schemas.forEach((s, i) => {
        const el = document.createElement('script');
        el.className = 'structured-data-extra';
        el.setAttribute('type', 'application/ld+json');
        el.id = `structured-data-${i}`;
        el.textContent = JSON.stringify(s);
        document.head.appendChild(el);
      });
    }

  }, [title, description, schema, schemas, canonicalUrl, ogType, ogImage]);

  return null;
};

export default SEOHead;
