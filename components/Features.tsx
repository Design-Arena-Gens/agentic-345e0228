'use client';

import { Zap, Palette, Code, Smartphone, Globe, Download } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate complete websites in seconds with AI-powered automation'
  },
  {
    icon: Palette,
    title: 'Smart Design',
    description: 'AI analyzes your prompt to create beautiful, on-brand designs'
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Production-ready HTML, CSS, and JavaScript code'
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Perfect display on all devices - mobile, tablet, and desktop'
  },
  {
    icon: Globe,
    title: 'Multiple Templates',
    description: 'E-commerce, portfolio, blog, SaaS, and more'
  },
  {
    icon: Download,
    title: 'Export & Deploy',
    description: 'Download your code or deploy directly to the web'
  }
];

export default function Features() {
  return (
    <section className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600">
          Everything you need to create professional websites
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
