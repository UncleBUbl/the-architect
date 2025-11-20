import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { PreviewSection } from './components/PreviewSection';
import { generateArchitectCode } from './services/geminiService';
import { GenerationStatus } from './types';
import { INITIAL_HTML_TEMPLATE } from './constants';

const App: React.FC = () => {
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [generatedHtml, setGeneratedHtml] = useState<string>(INITIAL_HTML_TEMPLATE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (file: File, vibe: string) => {
    setStatus(GenerationStatus.ANALYZING);
    setErrorMsg(null);

    try {
      // Convert file to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64String = reader.result as string;
        // Remove data:image/png;base64, prefix for API
        const base64Content = base64String.split(',')[1];
        const mimeType = file.type;

        try {
          const html = await generateArchitectCode(base64Content, mimeType, vibe);
          setGeneratedHtml(html);
          setStatus(GenerationStatus.COMPLETED);
        } catch (err) {
          console.error(err);
          setErrorMsg("Failed to generate code. Please try again.");
          setStatus(GenerationStatus.ERROR);
        }
      };

      reader.onerror = () => {
        setErrorMsg("Failed to read image file.");
        setStatus(GenerationStatus.ERROR);
      };

    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
      setStatus(GenerationStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-indigo-500/30 selection:text-white flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 lg:p-6 h-[calc(100vh-4rem)] overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 h-full">
          
          {/* Input Panel - 4 Columns */}
          <div className="lg:col-span-4 h-full flex flex-col overflow-y-auto pr-1 custom-scrollbar">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">Design Inputs</h2>
              <p className="text-sm text-neutral-500">Upload your sketch and select a style.</p>
            </div>
            
            <InputSection 
              onGenerate={handleGenerate} 
              isGenerating={status === GenerationStatus.ANALYZING || status === GenerationStatus.GENERATING} 
            />

            {errorMsg && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-900/50 rounded-xl text-red-200 text-sm">
                {errorMsg}
              </div>
            )}
            
            {status === GenerationStatus.ANALYZING && (
              <div className="mt-6 p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-indigo-300">Gemini 3 is thinking...</span>
                </div>
                <p className="text-xs text-neutral-400">Analyzing spatial layout and converting vibe to Tailwind classes.</p>
              </div>
            )}
          </div>

          {/* Preview Panel - 8 Columns */}
          <div className="lg:col-span-8 h-full flex flex-col">
             <PreviewSection htmlContent={generatedHtml} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
