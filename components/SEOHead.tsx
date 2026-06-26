import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOMeta } from '../types';

interface SEOHeadProps extends SEOMeta {
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  schemas?: object[];
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, schema, schemas, canonicalUrl, ogType = 'website', ogImage = 'https://www.readgachiakutamanga.online/gachiakuta-manga-cover.jpg' }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      {schemas && schemas.length > 0 && schemas.map((s, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
