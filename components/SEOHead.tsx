import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '../utils/seo';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  schemas?: object[];
  /** Set for "not found" and empty placeholder pages so Google doesn't index them. */
  noindex?: boolean;
  alternateLinks?: { rel: string; hreflang: string; href: string }[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  schemas,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  alternateLinks,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {canonicalUrl && !noindex && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {alternateLinks && alternateLinks.map((alt, i) => (
        <link key={i} rel={alt.rel} hrefLang={alt.hreflang} href={alt.href} />
      ))}
      {schemas && schemas.map((s, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
