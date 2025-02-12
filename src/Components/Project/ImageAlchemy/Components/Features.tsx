import React from 'react';

const Features: React.FC = () => {
    return (
        <div className="w-full bg-white py-10 border shadow-lg mt-4 dark:bg-gray-900 dark:border-gray-700">
            <div className="grid gap-14 md:grid-cols-3 md:gap-8 max-w-6xl mx-auto px-4">
                {/* Feature Cards */}
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="rounded-xl bg-gray-100 p-6 text-center shadow-sm hover:shadow-md dark:bg-purple-600 transition-shadow animate-move-shadow"
                    >
                        <div
                            className={`mx-auto flex h-16 w-16 shadow-purple-400 -translate-y-12 transform items-center justify-center rounded-full ${feature.bgColor} shadow-lg ${feature.shadowColor}`}
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-white">
                                <path
                                    d={feature.iconPath}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
                            {feature.title}
                        </h1>
                        <div className="px-4 text-gray-600 dark:text-gray-300 space-y-2">
                            {feature.details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className={feature.textColor}>✓</span>
                                    <span>{detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <style>
                {`
                    @keyframes move-shadow {
                        0% { box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1); }
                        50% { box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15); }
                        100% { box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1); }
                    }
                    .animate-move-shadow {
                        animation: move-shadow 2s infinite ease-in-out;
                    }
                `}
            </style>
        </div>
    );
};

const features = [
    {
        title: 'Image Format Conversion',
        bgColor: 'bg-teal-400',
        shadowColor: 'shadow-teal-500/40',
        textColor: 'text-teal-500',
        iconPath: 'M4 9h16M4 15h16M11 4l-3 3 3 3M13 20l3-3-3-3', // Exchange icon
        details: [
            'Effortlessly switch between JPG & PNG',
            '100% private with client-side processing',
            'Preview in real-time with adjustable quality',
        ],
    },
    {
        title: 'Advanced Image Editing',
        bgColor: 'bg-rose-500',
        shadowColor: 'shadow-rose-500/40',
        textColor: 'text-rose-500',
        iconPath: 'M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm12 0h6v6h-6v-6z', // Crop tool icon
        details: [
            'Crop, resize, and enhance images with ease',
            'Intuitive drag controls for precision edits',
            'Maintain high resolution while modifying',
        ],
    },
    {
        title: 'AI-Powered Art Generation',
        bgColor: 'bg-sky-500',
        shadowColor: 'shadow-sky-500/40',
        textColor: 'text-sky-500',
        iconPath: 'M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z', // Magic wand icon
        details: [
            'Create stunning visuals from text prompts',
            'AI-driven styling for unique digital art',
            'Generate high-quality images instantly',
        ],
    },
];

export default Features;
