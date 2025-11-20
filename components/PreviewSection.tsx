import React, { useState } from 'react';
import { Code, Eye, Copy, Check, Download } from 'lucide-react';

interface PreviewSectionProps {
  htmlContent: string;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ htmlContent }) => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architect-prototype.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Toolbar */}
      <div className="h-14 border-b border-neutral-800 flex items-center justify-between px-4 bg-neutral-900">
        <div className="flex bg-neutral-950 rounded-lg p-1 border border-neutral-800">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
              ${viewMode === 'preview' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
              ${viewMode === 'code' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
          >
            <Code className="w-3.5 h-3.5" />
            Source
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownload}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-lg border border-transparent hover:border-neutral-700 transition-all"
            title="Download HTML"
          >
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={handleCopy}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-lg border border-transparent hover:border-neutral-700 transition-all"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative bg-white">
        {viewMode === 'preview' ? (
          <iframe
            title="Generated Preview"
            srcDoc={htmlContent}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="w-full h-full bg-[#1e1e1e] overflow-auto p-4">
            <pre className="font-mono text-xs text-gray-300 leading-relaxed">
              {htmlContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
