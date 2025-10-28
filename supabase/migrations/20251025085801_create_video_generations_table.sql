/*
  # Educational Video Generations Schema

  1. New Tables
    - `video_generations`
      - `id` (uuid, primary key) - Unique identifier for each video generation
      - `prompt` (text) - The educational topic/prompt provided by user
      - `topic_category` (text) - Category like physics, chemistry, biology, etc.
      - `duration` (integer) - Video duration in seconds (default 12)
      - `created_at` (timestamptz) - When the video was generated
      - `metadata` (jsonb) - Additional data about the generation (animations used, colors, etc.)
  
  2. Security
    - Enable RLS on `video_generations` table
    - Add policy for anyone to read all video generations (educational content is public)
    - Add policy for anyone to insert new generations (open access for learning)
  
  3. Notes
    - This table stores all generated educational video metadata
    - Videos are generated client-side using canvas animations
    - Public access allows learners to view and create educational content freely
*/

CREATE TABLE IF NOT EXISTS video_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt text NOT NULL,
  topic_category text DEFAULT 'general',
  duration integer DEFAULT 12,
  created_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE video_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view video generations"
  ON video_generations
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create video generations"
  ON video_generations
  FOR INSERT
  WITH CHECK (true);