import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.path ? `https://blueboxmanga.online${item.path}` : undefined
        }))
    };

    useEffect(() => {
        // Add Breadcrumb Schema
        let scriptSchema = document.querySelector('#breadcrumb-schema');
        if (!scriptSchema) {
            scriptSchema = document.createElement('script');
            scriptSchema.id = 'breadcrumb-schema';
            scriptSchema.setAttribute('type', 'application/ld+json');
            document.head.appendChild(scriptSchema);
        }
        scriptSchema.textContent = JSON.stringify(schema);

        return () => {
            // Cleanup on unmount
            if (scriptSchema) {
                scriptSchema.textContent = '';
            }
        };
    }, [items]);

    return (
        <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
            <Link to="/" className="flex items-center hover:text-bb-blue transition-colors flex-shrink-0">
                <Home size={16} />
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center flex-shrink-0">
                    <ChevronRight size={16} className="mx-2 text-gray-400 dark:text-gray-600" />
                    {item.path ? (
                        <Link
                            to={item.path}
                            className="hover:text-bb-blue transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 dark:text-white font-bold cursor-default">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
