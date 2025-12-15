'use client';

import { useState } from 'react';
import { GeneratedSite } from '@/types';
import { ArrowLeft, Eye, Code2, Download, ExternalLink, Monitor, Smartphone, Tablet } from 'lucide-react';

interface GeneratedWebsiteProps {
  site: GeneratedSite;
  onReset: () => void;
}

type ViewMode = 'preview' | 'code';
type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export default function GeneratedWebsite({ site, onReset }: GeneratedWebsiteProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [activePage, setActivePage] = useState(site.pages[0]);

  const getDeviceWidth = () => {
    switch (deviceMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-3xl';
      default: return 'max-w-full';
    }
  };

  const handleDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${site.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  ${activePage.content}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${site.name.toLowerCase().replace(/\s+/g, '-')}-${activePage.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md mb-6 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onReset}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition"
              >
                <ArrowLeft size={20} />
                <span>New Website</span>
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h2 className="text-xl font-bold text-gray-800">{site.name}</h2>
                <p className="text-sm text-gray-500">{site.type} • {site.theme} theme</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-4 py-2 rounded flex items-center space-x-2 transition ${
                    viewMode === 'preview'
                      ? 'bg-white shadow text-purple-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Eye size={18} />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`px-4 py-2 rounded flex items-center space-x-2 transition ${
                    viewMode === 'code'
                      ? 'bg-white shadow text-purple-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Code2 size={18} />
                  <span>Code</span>
                </button>
              </div>

              {/* Device Mode (only in preview) */}
              {viewMode === 'preview' && (
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button
                    onClick={() => setDeviceMode('desktop')}
                    className={`p-2 rounded transition ${
                      deviceMode === 'desktop'
                        ? 'bg-white shadow text-purple-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    title="Desktop"
                  >
                    <Monitor size={18} />
                  </button>
                  <button
                    onClick={() => setDeviceMode('tablet')}
                    className={`p-2 rounded transition ${
                      deviceMode === 'tablet'
                        ? 'bg-white shadow text-purple-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    title="Tablet"
                  >
                    <Tablet size={18} />
                  </button>
                  <button
                    onClick={() => setDeviceMode('mobile')}
                    className={`p-2 rounded transition ${
                      deviceMode === 'mobile'
                        ? 'bg-white shadow text-purple-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    title="Mobile"
                  >
                    <Smartphone size={18} />
                  </button>
                </div>
              )}

              {/* Actions */}
              <button
                onClick={handleDownload}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
              >
                <Download size={18} />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Page Tabs */}
          {site.pages.length > 1 && (
            <div className="mt-4 flex space-x-2 border-t border-gray-200 pt-4">
              {site.pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page)}
                  className={`px-4 py-2 rounded-lg transition ${
                    activePage.id === page.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-12">
        {viewMode === 'preview' ? (
          <div className={`mx-auto transition-all duration-300 ${getDeviceWidth()}`}>
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-sm text-gray-300 flex items-center">
                  <ExternalLink size={14} className="mr-2" />
                  {site.name.toLowerCase().replace(/\s+/g, '')}.com{activePage.path}
                </div>
              </div>
              <div
                className="overflow-auto"
                style={{ maxHeight: 'calc(100vh - 300px)' }}
                dangerouslySetInnerHTML={{ __html: activePage.content }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <span className="text-gray-300 font-mono text-sm">
                {activePage.name.toLowerCase()}.html
              </span>
              <button
                onClick={handleDownload}
                className="text-gray-300 hover:text-white text-sm flex items-center space-x-1"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
            <pre className="p-6 overflow-auto text-sm" style={{ maxHeight: 'calc(100vh - 300px)' }}>
              <code className="text-green-400 font-mono">
                {formatHTML(activePage.content)}
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-2">Original Prompt:</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">
              "{site.prompt}"
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
              <span>Type: <strong>{site.type}</strong></span>
              <span>•</span>
              <span>Theme: <strong className="capitalize">{site.theme}</strong></span>
              <span>•</span>
              <span>Pages: <strong>{site.pages.length}</strong></span>
              <span>•</span>
              <span>Created: <strong>{new Date(site.createdAt).toLocaleString()}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatHTML(html: string): string {
  // Basic HTML formatting for code view
  return html
    .replace(/></g, '>\n<')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .join('\n');
}
