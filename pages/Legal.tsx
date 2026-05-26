import React from 'react';
import SEOHead from '../components/SEOHead';

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
                    content: (
                        <>
                            <p className="mb-4">At Blue Lock Manga, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Blue Lock Manga and how we use it.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">Log Files</h2>
                            <p className="mb-4">Blue Lock Manga follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">Cookies and Web Beacons</h2>
                            <p className="mb-4">Like any other website, Blue Lock Manga uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">Google DoubleClick DART Cookie</h2>
                            <p className="mb-4">Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-bb-blue hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a></p>

                            <h2 className="text-xl font-bold mt-6 mb-3">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                            <p className="mb-4">Under the CCPA, among other rights, California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
                            <p className="mb-4">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">GDPR Data Protection Rights</h2>
                            <p className="mb-4">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: The right to access, The right to rectification, The right to erasure, The right to restrict processing, The right to object to processing, and The right to data portability.</p>
                        </>
                    )
                };
            case 'dmca':
                return {
                    title: "DMCA Copyright Policy",
                    content: (
                        <>
                            <p className="mb-4">Blue Lock Manga respects the intellectual property rights of others. We comply with the Digital Millennium Copyright Act (DMCA) and other applicable copyright laws. It is our policy to respond to any infringement notices and take appropriate actions under the Digital Millennium Copyright Act ("DMCA") and other applicable intellectual property laws.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">DMCA Notice of Alleged Infringement</h2>
                            <p className="mb-4">If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, please notify our copyright agent as set forth in the Digital Millennium Copyright Act of 1998 (DMCA). For your complaint to be valid under the DMCA, you must provide the following information when providing notice of the claimed copyright infringement:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                                <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site.</li>
                                <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit the service provider to locate the material.</li>
                                <li>Information reasonably sufficient to permit the service provider to contact the complaining party, such as an address, telephone number, and, if available, an electronic mail address at which the complaining party may be contacted.</li>
                                <li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                                <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                            </ul>

                            <p className="mb-4">Please submit your info to: <strong>Support@readbluelockmanga.online</strong></p>
                            <p className="mb-4">UNDER FEDERAL LAW, IF YOU KNOWINGLY MISREPRESENT THAT ONLINE MATERIAL IS INFRINGING, YOU MAY BE SUBJECT TO CRIMINAL PROSECUTION FOR PERJURY AND CIVIL PENALTIES, INCLUDING MONETARY DAMAGES, COURT COSTS, AND ATTORNEYS' FEES.</p>
                        </>
                    )
                };
            case 'disclaimer':
                return {
                    title: "Disclaimer",
                    content: (
                        <>
                            <p className="mb-4">If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at Support@readbluelockmanga.online.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">Fair Use Notice</h2>
                            <p className="mb-4">This website may contain copyrighted material the use of which has not always been specifically authorized by the copyright owner. We are making such material available in an effort to advance understanding of anime, manga, and cultural topics. We believe this constitutes a 'fair use' of any such copyrighted material as provided for in section 107 of the US Copyright Law.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">Fan Project Declaration</h2>
                            <p className="mb-4">Blue Lock Manga is a non-profit fan-made website dedicated to the Blue Lock series. We are <strong>not affiliated with, endorsed, sponsored, or specifically approved by Muneyuki Kaneshiro & Yusuke Nomura, Weekly Shōnen Magazine, or any of their partners</strong>. All characters, images, names, and related indicia are trademarks of their respective owners.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">Proprietary Rights</h2>
                            <p className="mb-4">Blue Lock and all related characters and elements are distinct from this website. This site acts merely as a database and community site for fans. We do not claim ownership over the manga content provided.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">Content Removal</h2>
                            <p className="mb-4">If you are a copyright owner and wish to have your content removed from our site, please contact us via our DMCA page or email us directly, and we will process your request immediately.</p>
                        </>
                    )
                };
            case 'terms':
                return {
                    title: "Terms and Conditions",
                    content: (
                        <>
                            <p className="mb-4">Welcome to Blue Lock Manga! These terms and conditions outline the rules and regulations for the use of our Website.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">1. Acceptance of Terms</h2>
                            <p className="mb-4">By accessing this website we assume you accept these terms and conditions. Do not continue to use Blue Lock Manga if you do not agree to take all of the terms and conditions stated on this page.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">2. License</h2>
                            <p className="mb-4">Unless otherwise stated, Blue Lock Manga and/or its licensors own the intellectual property rights for all material on Blue Lock Manga. All intellectual property rights are reserved. You may access this from Blue Lock Manga for your own personal use subjected to restrictions set in these terms and conditions.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">3. User Content</h2>
                            <p className="mb-4">Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website (Comments). Blue Lock Manga does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Blue Lock Manga,its agents and/or affiliates.</p>

                            <h2 className="text-xl font-bold mt-6 mb-3">4. Limitation of Liability</h2>
                            <p className="mb-4">In no event shall Blue Lock Manga, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Blue Lock Manga, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
                        </>
                    )
                };
        }
    };

    const { title, content } = getContent();

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen">
            <SEOHead title={`${title} - Blue Lock Manga`} description={`Read our ${title}.`} />
            <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">{title}</h1>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                {content}
            </div>
        </div>
    );
};

export default Legal;
