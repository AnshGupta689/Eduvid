import { useState } from 'react';
import { Video, BookOpen } from 'lucide-react';
import PromptInput from './components/PromptInput';
import VideoCanvas from './components/VideoCanvas';
import VideoHistory from './components/VideoHistory';
import QuizModal, { QuizQuestion } from './components/QuizModal';
import { EducationalTemplate } from './lib/educationalTemplates'; 
import { AnimationScene } from './lib/animationEngine';
import { supabase } from './lib/supabase';

// Helper functions (drawText, drawCircle, drawArrow) must be imported 
// or available globally. Assuming they are in educationalTemplates.ts/animationEngine.ts 
// and we need to import them:
import { 
    drawText, 
    drawCircle, 
    drawArrow // Assuming these functions are exported from your educationalTemplates/animationEngine files
} from './lib/educationalTemplates'; 


function App() {
  const [scenes, setScenes] = useState<AnimationScene[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentTemplate, setCurrentTemplate] = useState<EducationalTemplate | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoGenerationId, setVideoGenerationId] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setCurrentPrompt(prompt);
    setShowQuiz(false);

    try {
      const response = await fetch(`/api/generate-script?prompt=${encodeURIComponent(prompt)}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Generation API Failed: ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      
      // 3. LLM OUTPUT INTERPRETER
      const generatedScenes = result.scenes.map((sceneData: any) => ({
        duration: sceneData.duration,
        commands: sceneData.commands, // Store the commands array
        
        // This is the new dynamic render logic
        render: (ctx: CanvasRenderingContext2D, progress: number, width: number, height: number) => {
          
          sceneData.commands.forEach((cmd: any) => {
            // Calculate current position based on progress (linear motion assumed)
            const currentX = cmd.startX + (cmd.endX - cmd.startX) * progress;
            const currentY = cmd.startY + (cmd.endY - cmd.startY) * progress;
            
            // Fade-in effect for the first half of the scene
            const alpha = progress < 0.5 ? progress * 2 : 1; 

            switch (cmd.type) {
              case 'text':
                // Assuming drawText is available in scope (imported or global)
                drawText(ctx, cmd.content, currentX, currentY, cmd.size || 24, cmd.color || '#FFFFFF', alpha);
                break;
              case 'circle':
                // Assuming drawCircle is available in scope
                drawCircle(ctx, currentX, currentY, cmd.size || 30, cmd.color || '#3b82f6', alpha);
                break;
              case 'arrow':
                // Assuming drawArrow is available in scope. 
                // Note: Arrow logic requires start and end points for the entire duration,
                // so we use start/end from the command data directly.
                drawArrow(ctx, cmd.startX, cmd.startY, currentX, currentY, cmd.color || '#10b981', alpha);
                break;
            }
          });
        },
      }));

      // Update state with dynamic content
      setScenes(generatedScenes);
      
      setCurrentTemplate({ 
        name: result.title || 'Dynamic Video',
        category: 'Dynamic LLM',
        keywords: [prompt],
        generateScenes: () => generatedScenes, 
        quizQuestions: result.quizQuestions,
      });

      // Log generation to Supabase
      const { data } = await supabase.from('video_generations').insert({
        prompt: prompt,
        topic_category: 'Dynamic LLM',
        duration: generatedScenes.reduce((sum, scene) => sum + scene.duration, 0),
        metadata: {
          template_name: result.title || 'Dynamic LLM',
          scene_count: generatedScenes.length,
        },
      }).select().single();

      if (data) {
        setVideoGenerationId(data.id);
      }

      setRefreshTrigger(prev => prev + 1);

    } catch (error) {
      console.error('Video Generation Failed:', error);
      setScenes([]); 
    }

    setIsGenerating(false);
  };

  const handleVideoComplete = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = async (score: number, answers: any[]) => {
    if (videoGenerationId && currentTemplate) {
      await supabase.from('quiz_results').insert({
        video_generation_id: videoGenerationId,
        prompt: currentPrompt,
        score: score,
        total_questions: currentTemplate.quizQuestions.length || 0,
        answers: answers,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white">
              EduVid
            </h1>
          </div>
          <p className="text-xl text-slate-300 flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            Create engaging 10-12 second educational videos from any topic
          </p>
        </header>

        <div className="space-y-8">
          <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />

          <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
            {currentPrompt && (
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentPrompt}
                </h2>
                {isGenerating && (
                  <div className="flex items-center justify-center gap-2 text-cyan-400">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <span className="ml-2 font-medium">Generating your educational video...</span>
                  </div>
                )}
              </div>
            )}
            <VideoCanvas scenes={scenes} isGenerating={isGenerating} onVideoComplete={handleVideoComplete} />
            {scenes.length === 0 && !isGenerating && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-700 mb-4">
                  <Video className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-slate-400 text-lg">
                  Enter a topic above to generate your first educational video
                </p>
              </div>
            )}
          </div>

          <VideoHistory
            onSelectPrompt={handleGenerate}
            refreshTrigger={refreshTrigger}
          />
        </div>

        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p>Making education more interactive, visual, and learner-friendly</p>
        </footer>
      </div>

      {showQuiz && currentTemplate && (
        <QuizModal
          questions={currentTemplate.quizQuestions}
          topic={currentPrompt}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}

export default App;
