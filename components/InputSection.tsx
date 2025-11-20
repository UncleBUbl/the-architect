import React, { useState, useRef } from 'react';
import { Upload, X, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { VIBE_PRESETS } from '../constants';
import { VibePreset } from '../types';

interface InputSectionProps {
  onGenerate: (file: File, vibe: string) => void;
  isGenerating: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isGenerating }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [customVibe, setCustomVibe] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('modern-clean');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!selectedFile) return;

    const selectedPreset = VIBE_PRESETS.find(p => p.id === selectedPresetId);
    const finalVibe = customVibe.trim() ? customVibe : selectedPreset?.promptModifier || 'Modern clean interface';
    
    onGenerate(selectedFile, finalVibe);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      
      {/* Step 1: Image Upload */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-1 overflow-hidden group">
        <div className={`relative rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center
          ${previewUrl ? 'border-neutral-700 h-64 bg-neutral-950' : 'border-neutral-700 hover:border-indigo-500/50 h-48 bg-neutral-800/30 hover:bg-neutral-800/50 cursor-pointer'}`}
          onClick={() => !previewUrl && fileInputRef.current?.click()}
        >
          
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="Sketch Preview" className="h-full w-full object-contain p-4 opacity-80" />
              <button 
                onClick={(e) => { e.stopPropagation(); clearImage(); }}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-500/80 backdrop-blur-md text-white rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
              </div>
              <p className="text-neutral-300 font-medium">Upload Sketch</p>
              <p className="text-xs text-neutral-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Step 2: Define Vibe */}
      <div className="space-y-4 flex-1">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-sm font-semibold tracking-wide uppercase">Define the Aesthetic</h3>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-2 gap-3">
          {VIBE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetId(preset.id)}
              className={`p-3 rounded-xl text-left border transition-all duration-200 relative overflow-hidden
                ${selectedPresetId === preset.id 
                  ? 'bg-indigo-600/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                  : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800'}`}
            >
              <div className={`font-medium text-sm ${selectedPresetId === preset.id ? 'text-indigo-300' : 'text-neutral-300'}`}>
                {preset.label}
              </div>
              <div className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                {preset.description}
              </div>
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="mt-4">
           <label className="text-xs text-neutral-500 ml-1 mb-1 block">Custom Instructions (Optional)</label>
           <textarea
            value={customVibe}
            onChange={(e) => setCustomVibe(e.target.value)}
            placeholder="e.g. 'Make it look like a 90s brutalist website with neon green accents'"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none resize-none h-24 transition-all"
           />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedFile || isGenerating}
        className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
          ${!selectedFile || isGenerating 
            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-800' 
            : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-900/20 hover:shadow-indigo-900/40 hover:-translate-y-0.5'}`}
      >
        {isGenerating ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"/>
            <span>Architecting...</span>
          </>
        ) : (
          <>
            <span>Generate Interface</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};
