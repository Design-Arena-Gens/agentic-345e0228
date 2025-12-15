'use client';

import { useState } from 'react';
import PromptInput from '@/components/PromptInput';
import GeneratedWebsite from '@/components/GeneratedWebsite';
import Header from '@/components/Header';
import Features from '@/components/Features';
import { GeneratedSite } from '@/types';

export default function Home() {
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);

    // Simulate AI generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Generate website based on prompt
    const site = generateWebsiteFromPrompt(prompt);
    setGeneratedSite(site);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setGeneratedSite(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {!generatedSite ? (
          <>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Generate Websites with AI
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                Describe your dream website in plain English, and watch AI build it instantly.
              </p>
            </div>

            <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />

            <Features />
          </>
        ) : (
          <GeneratedWebsite site={generatedSite} onReset={handleReset} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 AI Website Generator. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

// AI Website Generation Engine
function generateWebsiteFromPrompt(prompt: string): GeneratedSite {
  const lowerPrompt = prompt.toLowerCase();

  // Detect website type and theme
  const isEcommerce = /shop|store|ecommerce|product|buy|sell/i.test(prompt);
  const isPortfolio = /portfolio|designer|artist|photographer|creative/i.test(prompt);
  const isRestaurant = /restaurant|cafe|food|menu|dining/i.test(prompt);
  const isBusiness = /business|company|corporate|consulting|agency/i.test(prompt);
  const isBlog = /blog|article|news|magazine/i.test(prompt);
  const isSaas = /saas|software|app|platform|tool/i.test(prompt);

  // Extract potential business name
  const words = prompt.split(' ');
  const businessName = extractBusinessName(prompt);

  // Detect colors mentioned
  const colors = extractColors(prompt);
  const primaryColor = colors[0] || 'blue';

  // Generate appropriate website structure
  if (isEcommerce) {
    return generateEcommerceSite(businessName, primaryColor, prompt);
  } else if (isPortfolio) {
    return generatePortfolioSite(businessName, primaryColor, prompt);
  } else if (isRestaurant) {
    return generateRestaurantSite(businessName, primaryColor, prompt);
  } else if (isSaas) {
    return generateSaasSite(businessName, primaryColor, prompt);
  } else if (isBlog) {
    return generateBlogSite(businessName, primaryColor, prompt);
  } else if (isBusiness) {
    return generateBusinessSite(businessName, primaryColor, prompt);
  } else {
    return generateGenericSite(businessName, primaryColor, prompt);
  }
}

function extractBusinessName(prompt: string): string {
  const forMatch = prompt.match(/for ([A-Z][a-zA-Z0-9\s]+?)(?:\.|,|$|that|which|with)/);
  if (forMatch) return forMatch[1].trim();

  const calledMatch = prompt.match(/called ([A-Z][a-zA-Z0-9\s]+?)(?:\.|,|$|that|which|with)/);
  if (calledMatch) return calledMatch[1].trim();

  const namedMatch = prompt.match(/named ([A-Z][a-zA-Z0-9\s]+?)(?:\.|,|$|that|which|with)/);
  if (namedMatch) return namedMatch[1].trim();

  const words = prompt.split(' ');
  const capitalizedWords = words.filter(w => /^[A-Z]/.test(w) && w.length > 2);
  if (capitalizedWords.length > 0) {
    return capitalizedWords.slice(0, 2).join(' ');
  }

  return 'MyBusiness';
}

function extractColors(prompt: string): string[] {
  const colorMap: { [key: string]: string } = {
    'blue': 'blue', 'red': 'red', 'green': 'green', 'purple': 'purple',
    'pink': 'pink', 'yellow': 'yellow', 'orange': 'orange', 'teal': 'teal',
    'indigo': 'indigo', 'cyan': 'cyan', 'emerald': 'emerald', 'violet': 'violet'
  };

  const colors: string[] = [];
  for (const [key, value] of Object.entries(colorMap)) {
    if (prompt.toLowerCase().includes(key)) {
      colors.push(value);
    }
  }

  return colors;
}

function generateEcommerceSite(name: string, color: string, prompt: string): GeneratedSite {
  return {
    id: Date.now().toString(),
    name: name,
    type: 'E-commerce',
    theme: color,
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        content: `
          <div class="min-h-screen bg-white">
            <nav class="bg-${color}-600 text-white p-4">
              <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-2xl font-bold">${name}</h1>
                <div class="space-x-6">
                  <a href="#" class="hover:text-${color}-200">Shop</a>
                  <a href="#" class="hover:text-${color}-200">About</a>
                  <a href="#" class="hover:text-${color}-200">Contact</a>
                  <a href="#" class="hover:text-${color}-200">Cart (0)</a>
                </div>
              </div>
            </nav>

            <section class="bg-gradient-to-r from-${color}-500 to-${color}-700 text-white py-20">
              <div class="container mx-auto px-4 text-center">
                <h2 class="text-5xl font-bold mb-4">Welcome to ${name}</h2>
                <p class="text-xl mb-8">Discover amazing products at unbeatable prices</p>
                <button class="bg-white text-${color}-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                  Shop Now
                </button>
              </div>
            </section>

            <section class="py-16">
              <div class="container mx-auto px-4">
                <h3 class="text-3xl font-bold text-center mb-12">Featured Products</h3>
                <div class="grid md:grid-cols-3 gap-8">
                  ${[1, 2, 3].map(i => `
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                      <div class="bg-${color}-100 h-64 flex items-center justify-center">
                        <span class="text-${color}-400 text-6xl">📦</span>
                      </div>
                      <div class="p-6">
                        <h4 class="text-xl font-bold mb-2">Product ${i}</h4>
                        <p class="text-gray-600 mb-4">High quality product description goes here</p>
                        <div class="flex justify-between items-center">
                          <span class="text-2xl font-bold text-${color}-600">$${(i * 25 + 24)}.99</span>
                          <button class="bg-${color}-600 text-white px-4 py-2 rounded hover:bg-${color}-700">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>
          </div>
        `
      },
      {
        id: 'shop',
        name: 'Shop',
        path: '/shop',
        content: `
          <div class="min-h-screen bg-gray-50">
            <div class="container mx-auto px-4 py-12">
              <h1 class="text-4xl font-bold mb-8">All Products</h1>
              <div class="grid md:grid-cols-4 gap-6">
                ${Array(8).fill(0).map((_, i) => `
                  <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                    <div class="bg-${color}-100 h-48 rounded mb-4 flex items-center justify-center">
                      <span class="text-4xl">🛍️</span>
                    </div>
                    <h3 class="font-bold mb-2">Product ${i + 1}</h3>
                    <p class="text-${color}-600 font-bold">$${(i * 10 + 29)}.99</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `
      }
    ],
    colors: {
      primary: color,
      secondary: 'gray',
      accent: color
    },
    prompt: prompt,
    createdAt: new Date().toISOString()
  };
}

function generatePortfolioSite(name: string, color: string, prompt: string): GeneratedSite {
  return {
    id: Date.now().toString(),
    name: name,
    type: 'Portfolio',
    theme: color,
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        content: `
          <div class="min-h-screen bg-gradient-to-br from-gray-900 to-${color}-900 text-white">
            <nav class="p-6">
              <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-2xl font-bold">${name}</h1>
                <div class="space-x-6">
                  <a href="#work" class="hover:text-${color}-300">Work</a>
                  <a href="#about" class="hover:text-${color}-300">About</a>
                  <a href="#contact" class="hover:text-${color}-300">Contact</a>
                </div>
              </div>
            </nav>

            <section class="container mx-auto px-4 py-20 text-center">
              <div class="mb-8">
                <div class="w-32 h-32 bg-${color}-500 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">
                  👤
                </div>
              </div>
              <h2 class="text-6xl font-bold mb-4">${name}</h2>
              <p class="text-2xl text-${color}-300 mb-8">Creative Designer & Developer</p>
              <button class="bg-${color}-500 hover:bg-${color}-600 px-8 py-3 rounded-full font-semibold transition">
                View My Work
              </button>
            </section>

            <section id="work" class="container mx-auto px-4 py-16">
              <h3 class="text-4xl font-bold text-center mb-12">Featured Projects</h3>
              <div class="grid md:grid-cols-2 gap-8">
                ${[1, 2, 3, 4].map(i => `
                  <div class="bg-white/10 backdrop-blur rounded-lg overflow-hidden hover:bg-white/20 transition">
                    <div class="bg-${color}-500/30 h-64 flex items-center justify-center text-6xl">
                      🎨
                    </div>
                    <div class="p-6">
                      <h4 class="text-2xl font-bold mb-2">Project ${i}</h4>
                      <p class="text-gray-300">An amazing project showcasing creativity and technical skill</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          </div>
        `
      }
    ],
    colors: {
      primary: color,
      secondary: 'gray',
      accent: color
    },
    prompt: prompt,
    createdAt: new Date().toISOString()
  };
}

function generateRestaurantSite(name: string, color: string, prompt: string): GeneratedSite {
  return {
    id: Date.now().toString(),
    name: name,
    type: 'Restaurant',
    theme: color,
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        content: `
          <div class="min-h-screen bg-white">
            <nav class="bg-${color}-800 text-white p-4 sticky top-0 z-50">
              <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-2xl font-bold">${name}</h1>
                <div class="space-x-6">
                  <a href="#menu" class="hover:text-${color}-300">Menu</a>
                  <a href="#about" class="hover:text-${color}-300">About</a>
                  <a href="#contact" class="hover:text-${color}-300">Reservations</a>
                </div>
              </div>
            </nav>

            <section class="relative h-screen flex items-center justify-center bg-gradient-to-r from-${color}-600 to-${color}-800 text-white">
              <div class="text-center">
                <div class="text-8xl mb-6">🍽️</div>
                <h2 class="text-6xl font-bold mb-4">${name}</h2>
                <p class="text-2xl mb-8">Experience culinary excellence</p>
                <button class="bg-white text-${color}-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                  Make a Reservation
                </button>
              </div>
            </section>

            <section id="menu" class="py-20 bg-gray-50">
              <div class="container mx-auto px-4">
                <h3 class="text-4xl font-bold text-center mb-12">Our Menu</h3>
                <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  ${['Appetizers', 'Main Courses', 'Desserts', 'Beverages'].map(category => `
                    <div class="bg-white rounded-lg shadow-lg p-8">
                      <h4 class="text-2xl font-bold text-${color}-800 mb-6">${category}</h4>
                      ${[1, 2, 3].map(i => `
                        <div class="mb-4 pb-4 border-b border-gray-200 last:border-0">
                          <div class="flex justify-between items-start mb-2">
                            <h5 class="font-semibold">Dish ${i}</h5>
                            <span class="text-${color}-600 font-bold">$${i * 5 + 10}</span>
                          </div>
                          <p class="text-gray-600 text-sm">Delicious ${category.toLowerCase()} item description</p>
                        </div>
                      `).join('')}
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>
          </div>
        `
      }
    ],
    colors: {
      primary: color,
      secondary: 'amber',
      accent: color
    },
    prompt: prompt,
    createdAt: new Date().toISOString()
  };
}

function generateSaasSite(name: string, color: string, prompt: string): GeneratedSite {
  return {
    id: Date.now().toString(),
    name: name,
    type: 'SaaS',
    theme: color,
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        content: `
          <div class="min-h-screen bg-white">
            <nav class="border-b border-gray-200 bg-white sticky top-0 z-50">
              <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 class="text-2xl font-bold text-${color}-600">${name}</h1>
                <div class="space-x-6">
                  <a href="#features" class="text-gray-600 hover:text-${color}-600">Features</a>
                  <a href="#pricing" class="text-gray-600 hover:text-${color}-600">Pricing</a>
                  <a href="#" class="text-gray-600 hover:text-${color}-600">Sign In</a>
                  <button class="bg-${color}-600 text-white px-6 py-2 rounded-lg hover:bg-${color}-700">
                    Get Started
                  </button>
                </div>
              </div>
            </nav>

            <section class="container mx-auto px-4 py-20 text-center">
              <h2 class="text-6xl font-bold mb-6">
                <span class="bg-gradient-to-r from-${color}-600 to-${color}-800 text-transparent bg-clip-text">
                  Powerful Software
                </span>
                <br />for Modern Teams
              </h2>
              <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                ${name} helps teams collaborate, automate workflows, and achieve more with intelligent tools.
              </p>
              <div class="flex gap-4 justify-center">
                <button class="bg-${color}-600 text-white px-8 py-3 rounded-lg hover:bg-${color}-700 font-semibold">
                  Start Free Trial
                </button>
                <button class="border-2 border-${color}-600 text-${color}-600 px-8 py-3 rounded-lg hover:bg-${color}-50 font-semibold">
                  Watch Demo
                </button>
              </div>
            </section>

            <section id="features" class="bg-gray-50 py-20">
              <div class="container mx-auto px-4">
                <h3 class="text-4xl font-bold text-center mb-12">Features that matter</h3>
                <div class="grid md:grid-cols-3 gap-8">
                  ${['⚡ Fast', '🔒 Secure', '📊 Analytics', '🤝 Collaboration', '🚀 Scalable', '💡 Intelligent'].map(feature => `
                    <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
                      <div class="text-4xl mb-4">${feature.split(' ')[0]}</div>
                      <h4 class="text-xl font-bold mb-2">${feature.split(' ')[1]}</h4>
                      <p class="text-gray-600">Enterprise-grade ${feature.split(' ')[1].toLowerCase()} features to power your business.</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>

            <section id="pricing" class="py-20">
              <div class="container mx-auto px-4">
                <h3 class="text-4xl font-bold text-center mb-12">Simple Pricing</h3>
                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  ${['Starter', 'Professional', 'Enterprise'].map((plan, i) => `
                    <div class="bg-white border-2 ${i === 1 ? `border-${color}-600 shadow-xl scale-105` : 'border-gray-200'} rounded-lg p-8">
                      <h4 class="text-2xl font-bold mb-2">${plan}</h4>
                      <div class="text-4xl font-bold text-${color}-600 mb-6">
                        $${i === 0 ? '29' : i === 1 ? '99' : '299'}
                        <span class="text-lg text-gray-600">/month</span>
                      </div>
                      <ul class="space-y-3 mb-8">
                        ${[1, 2, 3, 4].map(j => `
                          <li class="flex items-center">
                            <span class="text-${color}-600 mr-2">✓</span>
                            Feature ${j}
                          </li>
                        `).join('')}
                      </ul>
                      <button class="w-full ${i === 1 ? `bg-${color}-600 text-white` : `border-2 border-${color}-600 text-${color}-600`} py-3 rounded-lg font-semibold hover:opacity-90">
                        Choose Plan
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>
          </div>
        `
      }
    ],
    colors: {
      primary: color,
      secondary: 'slate',
      accent: color
    },
    prompt: prompt,
    createdAt: new Date().toISOString()
  };
}

function generateBlogSite(name: string, color: string, prompt: string): GeneratedSite {
  return {
    id: Date.now().toString(),
    name: name,
    type: 'Blog',
    theme: color,
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        content: `
          <div class="min-h-screen bg-gray-50">
            <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
              <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 class="text-2xl font-bold text-${color}-600">${name}</h1>
                <div class="space-x-6">
                  <a href="#" class="text-gray-600 hover:text-${color}-600">Articles</a>
                  <a href="#" class="text-gray-600 hover:text-${color}-600">About</a>
                  <a href="#" class="text-gray-600 hover:text-${color}-600">Subscribe</a>
                </div>
              </div>
            </nav>

            <section class="container mx-auto px-4 py-12">
              <div class="max-w-4xl mx-auto">
                <h2 class="text-5xl font-bold mb-4">Latest Stories</h2>
                <p class="text-xl text-gray-600 mb-12">Insights, tutorials, and stories from ${name}</p>

                <div class="space-y-8">
                  ${[1, 2, 3, 4, 5].map(i => `
                    <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                      <div class="md:flex">
                        <div class="md:w-1/3 bg-${color}-100 h-64 md:h-auto flex items-center justify-center text-6xl">
                          📝
                        </div>
                        <div class="md:w-2/3 p-8">
                          <div class="text-${color}-600 font-semibold mb-2">Category ${i}</div>
                          <h3 class="text-2xl font-bold mb-3 hover:text-${color}-600 cursor-pointer">
                            Article Title ${i}: An In-Depth Look at Something Interesting
                          </h3>
                          <p class="text-gray-600 mb-4">
                            This is a compelling excerpt from the blog post that gives readers a preview of what they'll learn by reading the full article...
                          </p>
                          <div class="flex items-center text-sm text-gray-500">
                            <span>John Doe</span>
                            <span class="mx-2">•</span>
                            <span>Dec ${i}, 2024</span>
                            <span class="mx-2">•</span>
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  `).join('')}
                </div>
              </div>
            </section>
          </div>
        `
      }
    ],
    colors: {
      primary: color,
      secondary: 'gray',
      accent: color
    },
    prompt: prompt,
    createdAt: new Date().toISOString()
  };
}

function generateBusinessSite(name: string, color: string, prompt: string): GeneratedSite {
  return {
    id: Date.now().toString(),
    name: name,
    type: 'Business',
    theme: color,
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        content: `
          <div class="min-h-screen bg-white">
            <nav class="bg-${color}-700 text-white p-4">
              <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-2xl font-bold">${name}</h1>
                <div class="space-x-6">
                  <a href="#services" class="hover:text-${color}-200">Services</a>
                  <a href="#about" class="hover:text-${color}-200">About</a>
                  <a href="#contact" class="hover:text-${color}-200">Contact</a>
                </div>
              </div>
            </nav>

            <section class="bg-gradient-to-r from-${color}-600 to-${color}-800 text-white py-24">
              <div class="container mx-auto px-4">
                <div class="max-w-3xl">
                  <h2 class="text-5xl font-bold mb-6">Professional Solutions for Your Business</h2>
                  <p class="text-xl mb-8">
                    ${name} delivers expert consulting and services to help your business thrive in today's competitive market.
                  </p>
                  <button class="bg-white text-${color}-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                    Get Started
                  </button>
                </div>
              </div>
            </section>

            <section id="services" class="py-20">
              <div class="container mx-auto px-4">
                <h3 class="text-4xl font-bold text-center mb-12">Our Services</h3>
                <div class="grid md:grid-cols-3 gap-8">
                  ${['Consulting', 'Strategy', 'Implementation'].map((service, i) => `
                    <div class="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-xl transition">
                      <div class="text-5xl mb-4 text-${color}-600">
                        ${['💼', '📊', '⚙️'][i]}
                      </div>
                      <h4 class="text-2xl font-bold mb-4">${service}</h4>
                      <p class="text-gray-600 mb-4">
                        Professional ${service.toLowerCase()} services tailored to your business needs.
                      </p>
                      <a href="#" class="text-${color}-600 font-semibold hover:text-${color}-800">
                        Learn More →
                      </a>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>

            <section class="bg-gray-50 py-20">
              <div class="container mx-auto px-4 text-center">
                <h3 class="text-4xl font-bold mb-6">Ready to grow your business?</h3>
                <p class="text-xl text-gray-600 mb-8">Let's discuss how we can help you achieve your goals.</p>
                <button class="bg-${color}-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-${color}-700 transition">
                  Schedule a Consultation
                </button>
              </div>
            </section>
          </div>
        `
      }
    ],
    colors: {
      primary: color,
      secondary: 'slate',
      accent: color
    },
    prompt: prompt,
    createdAt: new Date().toISOString()
  };
}

function generateGenericSite(name: string, color: string, prompt: string): GeneratedSite {
  return {
    id: Date.now().toString(),
    name: name,
    type: 'General',
    theme: color,
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        content: `
          <div class="min-h-screen bg-gradient-to-br from-${color}-50 to-${color}-100">
            <nav class="bg-white shadow-md p-4">
              <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-2xl font-bold text-${color}-600">${name}</h1>
                <div class="space-x-6">
                  <a href="#" class="text-gray-600 hover:text-${color}-600">Home</a>
                  <a href="#" class="text-gray-600 hover:text-${color}-600">About</a>
                  <a href="#" class="text-gray-600 hover:text-${color}-600">Contact</a>
                </div>
              </div>
            </nav>

            <section class="container mx-auto px-4 py-20 text-center">
              <h2 class="text-6xl font-bold mb-6 text-${color}-900">Welcome to ${name}</h2>
              <p class="text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Your description: ${prompt}
              </p>
              <button class="bg-${color}-600 text-white px-8 py-3 rounded-lg hover:bg-${color}-700 font-semibold transition">
                Learn More
              </button>
            </section>

            <section class="container mx-auto px-4 py-16">
              <div class="grid md:grid-cols-3 gap-8">
                ${[1, 2, 3].map(i => `
                  <div class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                    <div class="text-5xl mb-4 text-${color}-600">✨</div>
                    <h3 class="text-2xl font-bold mb-4">Feature ${i}</h3>
                    <p class="text-gray-600">
                      Amazing feature description that highlights the benefits and value.
                    </p>
                  </div>
                `).join('')}
              </div>
            </section>
          </div>
        `
      }
    ],
    colors: {
      primary: color,
      secondary: 'gray',
      accent: color
    },
    prompt: prompt,
    createdAt: new Date().toISOString()
  };
}
