/*
  # Quiz Results Schema

  1. New Tables
    - `quiz_results`
      - `id` (uuid, primary key) - Unique identifier for each quiz attempt
      - `video_generation_id` (uuid) - Reference to the video that was watched
      - `prompt` (text) - The topic that was tested
      - `score` (integer) - Number of correct answers
      - `total_questions` (integer) - Total number of questions in the quiz
      - `answers` (jsonb) - Array of user answers and correctness
      - `completed_at` (timestamptz) - When the quiz was completed
  
  2. Security
    - Enable RLS on `quiz_results` table
    - Add policy for anyone to view quiz results (educational data is public)
    - Add policy for anyone to insert new quiz results (open learning platform)
  
  3. Notes
    - Tracks learner performance and engagement
    - Helps understand which topics need more clarification
    - Public access encourages collaborative learning
*/

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_generation_id uuid,
  prompt text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL,
  answers jsonb DEFAULT '[]'::jsonb,
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quiz results"
  ON quiz_results
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create quiz results"
  ON quiz_results
  FOR INSERT
  WITH CHECK (true);