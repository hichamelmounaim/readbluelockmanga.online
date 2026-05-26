import React from 'react';
import SEOHead from '../components/SEOHead';

const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen">
            <SEOHead
                title="About Us - Blue Lock Manga"
                description="Learn more about Blue Lock Manga, our mission, and why we are the best place to read Blue Lock online."
            />

            <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">
                About Us
            </h1>

            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6">
                <p className="lead text-xl text-gray-600 dark:text-gray-400">
                    Welcome to <strong>Blue Lock Manga</strong>, the ultimate destination for fans of Muneyuki Kaneshiro & Yusuke Nomura's masterpiece.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Mission</h2>
                <p>
                    Our mission is simple: to provide the best possible reading experience for Blue Lock fans worldwide. We believe that manga should be accessible, fast, and enjoyable to read on any device.
                </p>
                <p>
                    Whether you are catching up on the latest chapters or starting this epic journey from the very beginning, we are here to ensure you never miss a beat.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Choose Us?</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>High Quality Scans:</strong> We prioritize clear, high-resolution images for the best visual experience.</li>
                    <li><strong>Fast Updates:</strong> New chapters are available as soon as they are released.</li>
                    <li><strong>Ad-Lite Experience:</strong> We strive to keep our interface clean and reader-focused.</li>
                    <li><strong>Community:</strong> Join thousands of other fans discussing theories and favorite moments.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Contact Us</h2>
                <p>
                    Have suggestions, found a bug, or just want to say hi? We'd love to hear from you.
                    <br />
                    Email us at: <a href="mailto:Support@readbluelockmanga.online" className="text-bb-blue hover:underline">Support@readbluelockmanga.online</a>
                </p>

                <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-xl mt-12 border border-gray-200 dark:border-white/10">
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        <strong>Disclaimer:</strong> This website is a fan project and is not affiliated with Muneyuki Kaneshiro & Yusuke Nomura, Weekly Shōnen Magazine, or their partners. All manga content and characters belong to their respective copyright owners.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
