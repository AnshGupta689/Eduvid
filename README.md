
# 🎓 Eduvid: AI-Powered Educational Content Generator

[](https://opensource.org/licenses/MIT)
[](https://www.google.com/search?q=YOUR_NETLIFY_SITE_LINK)

## 💡 About the Project

Eduvid is a modern full-stack web application designed to accelerate educational content creation. Leveraging Google's **Gemini API**, the platform instantly generates detailed video scripts, storyboard prompts, and interactive quizzes based on any user-provided topic. It utilizes a secure Netlify Functions backend and Supabase for persistent data storage.

-----

## ✨ Key Features

  * **AI Script Generation:** Generates comprehensive educational video scripts (with title, duration, and segment details) using the **Gemini API**.
  * **Interactive Quizzes:** Creates a short, multiple-choice quiz related to the generated video topic for immediate learning assessment.
  * **Content History:** Saves all generated video scripts and quiz results to a **Supabase PostgreSQL database** for easy history and review.
  * **Secure & Scalable:** Uses **Netlify Functions** to keep the sensitive Gemini API key secure and manage backend logic.
  * **Modern UX:** Built with **React**, **TypeScript**, and **Tailwind CSS**.

-----

## ⚙️ Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React, TypeScript, Vite | Fast, modern user interface development. |
| **Styling** | Tailwind CSS | Utility-first CSS framework for rapid styling. |
| **Backend** | Netlify Functions (Node.js) | Serverless API endpoint for interacting with Gemini. |
| **AI/LLM** | Google Gemini API (`@google/genai`) | Core engine for script and quiz generation. |
| **Database** | Supabase | Authentication, real-time database, and content storage. |

-----

## 🚀 Getting Started (Local Development)

To get a copy of this project running locally, follow these steps:

### Prerequisites

You must have the following installed:

  * Node.js (v18+)
  * npm

### 1\. Clone the Repository

```bash
git clone https://github.com/AnshGupta689/Eduvid.git
cd Eduvid
```

### 2\. Install Dependencies

Install packages for both the frontend and the local server setup:

```bash
npm install
```

### 3\. Setup Environment Variables

Create a file named **`.env`** in the root directory and add the following keys.

> 🔑 **Note:** You will need API keys from **Google AI Studio** for Gemini and a project from **Supabase**.

```env
# Gemini API Key (Used by the local Node.js server)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# Supabase Credentials (Used by the client-side React app)
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

### 4\. Running the Application Locally

The `dev-full` script starts both the Vite frontend and the local backend server (using Nodemon) simultaneously.

```bash
# Starts the Vite dev server AND the Node.js backend server
npm run dev-full
```

The application will be accessible at `http://localhost:5173/`.

-----

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

-----
