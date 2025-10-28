import { useEffect, useState } from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { supabase, VideoGeneration } from '../lib/supabase';

type VideoHistoryProps = {
  onSelectPrompt: (prompt: string) => void;
  refreshTrigger: number;
};

export default function VideoHistory({ onSelectPrompt, refreshTrigger }: VideoHistoryProps) {
  const [history, setHistory] = useState<VideoGeneration[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('video_generations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching history:', error);
    } else {
      setHistory(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await supabase
      .from('video_generations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting:', error);
    } else {
      setHistory(history.filter(item => item.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 bg-slate-800 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 text-slate-300 mb-4">
          <Clock className="w-5 h-5" />
          <h2 className="text-xl font-bold">Recent Generations</h2>
        </div>
        <div className="text-slate-400 text-center py-8">Loading...</div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 bg-slate-800 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 text-slate-300 mb-4">
          <Clock className="w-5 h-5" />
          <h2 className="text-xl font-bold">Recent Generations</h2>
        </div>
        <div className="text-slate-400 text-center py-8">
          No videos generated yet. Try creating your first educational video!
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-slate-800 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 text-slate-300 mb-4">
        <Clock className="w-5 h-5" />
        <h2 className="text-xl font-bold">Recent Generations</h2>
      </div>
      <div className="space-y-2">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectPrompt(item.prompt)}
            className="group flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer transition-all hover:scale-[1.02] transform"
          >
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{item.prompt}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-slate-400 capitalize">
                  {item.topic_category}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => handleDelete(item.id, e)}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500 rounded-lg transition-all ml-4"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
