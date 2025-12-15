'use client';

import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-purple-600" size={28} />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            AI Website Generator
          </span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-purple-600 transition">
            How it Works
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition">
            Examples
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition">
            Pricing
          </a>
        </nav>
      </div>
    </header>
  );
}
