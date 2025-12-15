'use client';

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const examplePrompts = [
  "Create an e-commerce store for TechGadgets selling electronics with a modern blue theme",
  "Build a portfolio website for Sarah Chen, a creative photographer specializing in nature photography",
  "Make a restaurant website for Bella Cucina, an Italian restaurant with a warm red color scheme",
  "Design a SaaS landing page for CloudSync, a file synchronization tool with a purple theme",
  "Create a blog called TechInsights about technology trends and tutorials",
  "Build a business website for Sterling Consulting, a corporate consulting firm"
];

export default function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-3 text-lg">
              Describe your website
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Create an e-commerce store for selling handmade jewelry with a purple theme..."
              className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 transition resize-none text-gray-800"
              disabled={isGenerating}
            />
          </div>

          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>Generating your website...</span>
              </>
            ) : (
              <>
                <Wand2 size={24} />
                <span>Generate Website</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-gray-600 font-semibold mb-3">Try these examples:</p>
          <div className="grid md:grid-cols-2 gap-3">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="text-left p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg text-sm text-gray-700 transition border border-transparent hover:border-purple-300"
                disabled={isGenerating}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
