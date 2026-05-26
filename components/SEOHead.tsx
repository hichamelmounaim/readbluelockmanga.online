import React, { useEffect } from 'react';
import { SEOMeta } from '../types';

interface SEOHeadProps extends SEOMeta {
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, schema, canonicalUrl }) => {
  useEffect(() => {
    // Update Title
    document.title = `${title} | Blue Lock Manga`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Add Canonical Tag
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }

    // Add Schema.org JSON-LD
    if (schema) {
      let scriptSchema = document.querySelector('#structured-data');
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.id = 'structured-data';
        scriptSchema.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    }

  }, [title, description, schema, canonicalUrl]);

  return null;
};

export default SEOHead;