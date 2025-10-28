import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { AnimationEngine } from '../lib/animationEngine';
import { AnimationScene } from '../lib/animationEngine';

type VideoCanvasProps = {
  scenes: AnimationScene[];
  isGenerating: boolean;
  onVideoComplete: () => void;
};

export default function VideoCanvas({ scenes, isGenerating, onVideoComplete }: VideoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AnimationEngine | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new AnimationEngine(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    if (engineRef.current && scenes.length > 0) {
      engineRef.current.setScenes(scenes);
      engineRef.current.reset();
      setIsPlaying(false);
      setHasPlayed(false);
    }
  }, [scenes]);

  const handlePlay = () => {
    if (engineRef.current && !isPlaying) {
      setIsPlaying(true);
      setHasPlayed(true);
      engineRef.current.play(() => {
        setIsPlaying(false);
        onVideoComplete();
      });
    }
  };

  const handlePause = () => {
    if (engineRef.current && isPlaying) {
      setIsPlaying(false);
      engineRef.current.stop();
    }
  };

  const handleReset = () => {
    if (engineRef.current) {
      engineRef.current.reset();
      setIsPlaying(false);
      setHasPlayed(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-slate-700">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="block bg-black"
        />
        {!hasPlayed && scenes.length > 0 && !isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              onClick={handlePlay}
              className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 transition-all flex items-center justify-center shadow-lg hover:scale-110 transform"
            >
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </button>
          </div>
        )}
      </div>

      {scenes.length > 0 && (
        <div className="flex gap-3">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              disabled={isGenerating}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105 transform shadow-lg"
            >
              <Play className="w-5 h-5" />
              {hasPlayed ? 'Replay' : 'Play'}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105 transform shadow-lg"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            disabled={isGenerating || (!hasPlayed && !isPlaying)}
            className="px-6 py-3 bg-slate-600 hover:bg-slate-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105 transform shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
