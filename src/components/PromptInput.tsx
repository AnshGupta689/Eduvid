import { useState } from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';

type PromptInputProps = {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
};

const examplePrompts = [
  'Photosynthesis',
  "Newton's Third Law of Motion",
  'What are molecules?',
  'Air composition',
];

export default function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    if (!isGenerating) {
      onGenerate(example);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter an educational topic... (e.g., Photosynthesis, Newton's Third Law)"
            className="w-full px-6 py-4 pr-36 text-lg rounded-xl border-2 border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all shadow-lg"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? 'Creating...' : 'Generate'}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-400">
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm font-medium">Try these examples:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              disabled={isGenerating}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-200 rounded-lg text-sm font-medium transition-all hover:scale-105 transform shadow-md"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
