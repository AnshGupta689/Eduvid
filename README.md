
**🎓 Eduvid: AI-Powered Educational Content Generator**
**💡 About the Project**
Eduvid is a modern full-stack web application designed to accelerate educational content creation. Leveraging Google's Gemini API, the platform instantly generates detailed video scripts, storyboard prompts, and interactive quizzes based on any user-provided topic. It uses a serverless architecture to ensure secure handling of API keys and scalable deployment.

Key Features
AI Script Generation: Generates comprehensive educational video scripts using the Gemini API based on user prompts (e.g., "Explain Ohm's Law").

Quiz Creation: Generates a short, interactive quiz related to the generated video topic, stored via Supabase.

Content Persistence: Saves all generated video scripts and quiz results to a Supabase PostgreSQL database for history and review.

Secure Backend: Uses Netlify Functions to securely handle the sensitive Gemini API key.

Modern Frontend: Built with React and TypeScript using Vite for a fast development experience.

⚙️ Tech Stack
Component	Technology	Purpose
Frontend	React, TypeScript, Vite	Fast, modern user interface development.
Styling	Tailwind CSS	Utility-first CSS framework for rapid styling.
Backend	Netlify Functions (Node.js/Express)	Serverless API endpoint for interacting with Gemini.
AI/LLM	Google Gemini API (@google/genai)	Script and quiz generation logic.
Database	Supabase	Authentication, real-time database, and content storage.
Hosting	Netlify	Continuous deployment and serverless function environment.

Export to Sheets

🚀 Getting Started (Local Development)
Prerequisites
You must have the following installed locally:

Node.js (v18+)

npm (or yarn/pnpm)

Git

1. Cloning the Repository
Bash

git clone https://github.com/AnshGupta689/Eduvid.git
cd Eduvid
2. Install Dependencies
Bash

npm install
3. Setup Environment Variables
The project requires environment variables for both the client (Vite) and the server (Node.js/Netlify Function).

Create a file named .env in the root directory.

Populate it with your credentials:

Code snippet

# Gemini API Key (Used by the Node.js Server/Function)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Supabase Credentials (Used by the Client)
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
4. Running the Application
The project uses npm-run-all to start the frontend and backend proxy simultaneously.

Bash

npm run dev-full
The application will be accessible at http://localhost:5173/, and the Vite proxy will correctly forward API calls to your local backend server.

🤝 Contribution
Contributions, issues, and feature requests are welcome! Feel free to check the Issues page or submit a pull request.

📄 License
This project is open source and available under the MIT License.
