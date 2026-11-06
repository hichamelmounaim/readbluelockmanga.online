import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { PAGE_META, SITE_URL } from '../utils/seo';

type LegalType = 'privacy' | 'dmca' | 'disclaimer' | 'terms';

interface LegalProps {
  type: LegalType;
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: "Privacy Policy",
          description: "Learn how we handle data and protect user privacy on Blue Lock Manga.",
          content: (
            <>
              <p className="mb-4">
                At <strong>Blue Lock Manga</strong> (accessible from <a href="https://www.readbluelockmanga.online/" className="text-blue-500 hover:underline">readbluelockmanga.online</a>), the privacy of our visitors is of paramount importance. This Privacy Policy outlines the types of information recorded and how we utilize it to provide a fast, secure, and seamless manga reading environment.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">1. Automated Server Log Files</h2>
              <p className="mb-4">
                We adhere to standard automated logging protocols utilized by modern web hosting environments. Information collected in server log files includes Internet Protocol (IP) addresses, browser variants, Internet Service Providers (ISP), date/time stamps, referring/exit pages, and anonymous interaction counts. This data is purely analytical, aggregated, and is not linked to any personally identifiable information.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">2. Local Storage & Reader Preferences</h2>
              <p className="mb-4">
                Our platform uses local storage and lightweight cookies strictly to store reader settings (such as reading mode: vertical continuous scroll vs. single page view, last read chapter, and display themes). These preferences remain on your device, ensuring a personalized experience across reading sessions without requiring account registration.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">3. Third-Party Analytics & Partners</h2>
              <p className="mb-4">
                We may use privacy-compliant web analytics tools (such as Google Analytics / Tag Manager) to understand audience trends, optimize page delivery speeds, and identify technical bottlenecks. Visitors can manage or disable cookie tracking at any time through standard browser preferences.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">4. GDPR & CCPA Data Rights</h2>
              <p className="mb-4">
                In compliance with the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), all visitors have the right to request clarification regarding processed data, request deletion, or object to tracking. For any privacy requests, reach out directly to our compliance team at <a href="mailto:support@readbluelockmanga.online" className="text-blue-500 hover:underline">support@readbluelockmanga.online</a>.
              </p>
            </>
          )
        };
      case 'dmca':
        return {
          title: "DMCA Copyright Notice & Takedown Policy",
          description: "Digital Millennium Copyright Act (DMCA) compliance and notice submission procedure.",
          content: (
            <>
              <p className="mb-4">
                <strong>Blue Lock Manga</strong> respects the intellectual property rights of creators, authors, and copyright holders. In accordance with the Digital Millennium Copyright Act of 1998 (17 U.S.C. § 512) and international intellectual property treaties, we maintain an expedited procedure to respond to verified notices of alleged infringement.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">Submitting a DMCA Takedown Notice</h2>
              <p className="mb-4">
                If you are a copyright owner or an authorized agent acting on their behalf, and believe that material indexed or referenced on this site infringes upon your copyright, please provide a written notice containing:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
                <li>A physical or electronic signature of a person authorized to act on behalf of the owner of the exclusive right that is allegedly infringed.</li>
                <li>Clear identification of the copyrighted work claimed to have been infringed, including registration details where applicable.</li>
                <li>Direct URLs of the specific chapter or page requested to be removed or disabled.</li>
                <li>Sufficient contact information, including your full legal name, physical address, telephone number, and official corporate email address.</li>
                <li>A statement that you have a good-faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                <li>A statement made under penalty of perjury that the information in your notification is accurate and that you are authorized to act on behalf of the copyright owner.</li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl my-6">
                <p className="text-sm text-gray-300 mb-2">
                  Please direct all formal DMCA notices to our designated agent via email:
                </p>
                <a href="mailto:support@readbluelockmanga.online" className="text-blue-400 font-bold hover:underline">
                  support@readbluelockmanga.online
                </a>
              </div>

              <p className="mb-4 text-xs text-gray-500 italic">
                Notice: Under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that online material is infringing may be subject to liability for damages, including court costs and attorneys' fees.
              </p>
            </>
          )
        };
      case 'disclaimer':
        return {
          title: "Legal Disclaimer & Fair Use Disclosure",
          description: "Official legal declarations, fair use disclosures, and copyright notices for Blue Lock Manga.",
          content: (
            <>
              <h2 className="text-xl font-bold mt-6 mb-3 text-white">1. Unofficial Fan Project</h2>
              <p className="mb-4">
                <strong>readbluelockmanga.online</strong> is an independent, non-commercial digital hub created by passionate fans. This platform is <strong>not endorsed by, directly affiliated with, sponsored by, or partnered with Muneyuki Kaneshiro, Yusuke Nomura, Kodansha Ltd., Pika Édition, or VIZ Media</strong>.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">2. Fair Use & Cultural Discussion</h2>
              <p className="mb-4">
                All character names, plot elements, trademarks, logos, and associated media are the exclusive intellectual property of their original creators and publishing rights-holders. Materials made available are shared under the principles of fair use (Section 107 of the US Copyright Act) to foster cultural appreciation, educational analysis, and discussion of the sports manga genre.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">3. Support the Official Serialization</h2>
              <p className="mb-4">
                We strongly encourage all readers to support the official serialization by purchasing licensed physical manga volumes, digital releases on authorized platforms (such as Kodansha Comics and K-Manga), and official merchandise released in your local territory.
              </p>
            </>
          )
        };
      case 'terms':
        return {
          title: "Terms and Conditions of Use",
          description: "Terms of service, user agreements, and conduct guidelines for Blue Lock Manga.",
          content: (
            <>
              <p className="mb-4">
                By accessing and utilizing <strong>readbluelockmanga.online</strong>, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of the site immediately.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">1. Permitted Personal Use</h2>
              <p className="mb-4">
                This platform is provided solely for personal, non-commercial entertainment and educational study. You agree not to exploit any part of the site for commercial gain or systematically scrape content without authorization.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">2. Disclaimer of Warranties</h2>
              <p className="mb-4">
                All content, services, and software are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that service will be uninterrupted, error-free, or free of harmful components.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-3 text-white">3. Third-Party Links & Resources</h2>
              <p className="mb-4">
                The platform may contain links or embeds directing to external third-party servers and resources. We have no operational control over external websites and assume no liability for their contents or privacy policies.
              </p>
            </>
          )
        };
    }
  };

  const { title, description, content } = getContent();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <SEOHead
        title={PAGE_META[`/${type}`]?.title || `${title} – Blue Lock Manga`}
        description={PAGE_META[`/${type}`]?.description || description}
        canonicalUrl={`${SITE_URL}/${type}`}
      />

      <Breadcrumbs items={[
        { label: 'Home', path: '/' },
        { label: title }
      ]} />

      <h1 className="text-3xl md:text-5xl font-heading font-bold my-8 text-white border-b border-gray-200 dark:border-white/10 pb-4">
        {title}
      </h1>

      <div className="prose dark:prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
        {content}
      </div>
    </div>
  );
};

export default Legal;
