import React from 'react';
import { Cpu, LayoutTemplate } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <LayoutTemplate className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">The Architect</h1>
            <span className="text-xs text-neutral-400 font-mono tracking-wider">POWERED BY GEMINI 3</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Documentation</a>
          <div className="h-4 w-px bg-neutral-700"></div>
          <div className="flex items-center gap-2 text-xs font-medium bg-neutral-800 px-3 py-1.5 rounded-full border border-neutral-700 text-neutral-300">
            <Cpu className="w-3 h-3" />
            <span>gemini-3-pro-preview</span>
          </div>
        </div>
      </div>
    </header>
  );
};
