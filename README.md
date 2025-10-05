\# 🎤 Voice Chat Assistant - 100% FREE



A fully functional AI-powered voice chatbot with speech recognition and text-to-speech capabilities - \*\*completely free with zero API costs!\*\*



!\[Voice Chat Assistant](https://img.shields.io/badge/Cost-$0.00-brightgreen) !\[Next.js](https://img.shields.io/badge/Next.js-14-black) !\[FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688) !\[Python](https://img.shields.io/badge/Python-3.10+-blue) !\[License](https://img.shields.io/badge/License-MIT-yellow)



---



\## 🌟 Features



\- 🎙️ \*\*Voice Input\*\* - Speak naturally using your microphone

\- 💬 \*\*Text Input\*\* - Type messages for text-based interaction

\- 🤖 \*\*AI Responses\*\* - Powered by Groq's free Llama 3.1 LLM

\- 🔊 \*\*Voice Output\*\* - Natural text-to-speech responses

\- 💚 \*\*100% FREE\*\* - No API costs, no credit card required

\- ⚡ \*\*Lightning Fast\*\* - 1-2 second response time

\- 🎨 \*\*Modern UI\*\* - Beautiful dark-themed interface

\- 📱 \*\*Responsive\*\* - Works on desktop and mobile

\- 🌐 \*\*Browser-Based\*\* - Uses Web Speech API (no external STT/TTS costs)



---



\## 🆓 Why It's Completely Free



| Component | Technology | Cost |

|-----------|-----------|------|

| Speech-to-Text | Browser Web Speech API | \*\*$0.00\*\* |

| AI Brain | Groq LLM (Llama 3.1) | \*\*$0.00\*\* |

| Text-to-Speech | Browser Web Speech API | \*\*$0.00\*\* |

| Frontend Hosting | Vercel | \*\*$0.00\*\* |

| Backend Hosting | Railway/Render | \*\*$0.00\*\* |

| \*\*TOTAL\*\* | | \*\*$0.00\*\* |



---



\## 🚀 Live Demo



🔗 \*\*\[Try it Live](#)\*\* \*(Add your deployed link here)\*



---



\## 📸 Screenshots



\### Main Interface

!\[Main Interface](screenshots/main.png)



\### Voice Recording

!\[Voice Recording](screenshots/recording.png)



\### Chat Conversation

!\[Chat](screenshots/chat.png)



---



\## 🏗️ Architecture

┌─────────────────────────────────────────────┐

│  FRONTEND (Next.js) - Your Browser         │

├─────────────────────────────────────────────┤

│  1. User speaks into microphone             │

│     ↓                                       │

│  2. Browser Web Speech API (FREE!)          │

│     Converts speech → text                  │

│     ↓                                       │

│  3. Send text to Backend                    │

└─────────────────────────────────────────────┘

↓

┌─────────────────────────────────────────────┐

│  BACKEND (FastAPI) - Python Server          │

├─────────────────────────────────────────────┤

│  4. Groq LLM (FREE!)                        │

│     Generates AI response                   │

│     ↓                                       │

│  5. Return text response                    │

└─────────────────────────────────────────────┘

↓

┌─────────────────────────────────────────────┐

│  FRONTEND - Your Browser                    │

├─────────────────────────────────────────────┤

│  6. Display text response                   │

│     ↓                                       │

│  7. Browser Web Speech API (FREE!)          │

│     Converts text → speech                  │

│     ↓                                       │

│  8. Play audio response                     │

└─────────────────────────────────────────────┘



---



\## 💻 Tech Stack



\### Frontend

\- \*\*Framework\*\*: Next.js 14 (App Router)

\- \*\*Language\*\*: TypeScript

\- \*\*Styling\*\*: Tailwind CSS

\- \*\*Icons\*\*: Lucide React

\- \*\*Speech\*\*: Browser Web Speech API



\### Backend

\- \*\*Framework\*\*: FastAPI

\- \*\*Language\*\*: Python 3.10+

\- \*\*Server\*\*: Uvicorn

\- \*\*AI\*\*: Groq API (Llama 3.1)



---



\## 📦 Installation



\### Prerequisites



\- Node.js 18+

\- Python 3.8+

\- Git



\### 1. Clone the Repository

```bash

git clone https://github.com/Ilaashok19/Voice-Chatbot.git

cd Voice-Chatbot

2\. Backend Setup

bash# Navigate to backend

cd backend



\# Create virtual environment

python -m venv venv



\# Activate virtual environment

\# Windows:

venv\\Scripts\\activate

\# macOS/Linux:

source venv/bin/activate



\# Install dependencies

pip install -r requirements.txt



\# Create .env file

cp .env.example .env



\# Add your FREE Groq API key to .env

\# GROQ\_API\_KEY=gsk\_your\_key\_here



\# Start backend server

python main.py

Backend will run on: http://localhost:8000

3\. Frontend Setup

bash# Open a new terminal

\# Navigate to frontend

cd frontend



\# Install dependencies

npm install



\# Start development server

npm run dev

Frontend will run on: http://localhost:3000



🔑 Getting API Keys

Groq API Key (100% FREE - No Credit Card!)



Go to: https://console.groq.com/keys

Sign up with Google/GitHub

Click "Create API Key"

Copy the key (starts with gsk\_)

Add to backend/.env file



That's it! Only 1 API key needed!



🌐 Browser Compatibility

BrowserSpeech-to-TextText-to-SpeechRatingChrome✅ Excellent✅ Excellent⭐⭐⭐⭐⭐Edge✅ Excellent✅ Excellent⭐⭐⭐⭐⭐Safari✅ Good✅ Good⭐⭐⭐⭐Firefox⚠️ Limited✅ Good⭐⭐⭐

Recommended: Chrome or Edge for best experience



🚀 Deployment

Deploy Backend (Railway - FREE)



Push code to GitHub

Go to https://railway.app

Sign up (free)

"New Project" → "Deploy from GitHub"

Select your repository

Add environment variable: GROQ\_API\_KEY

Deploy automatically!



Deploy Frontend (Vercel - FREE)



Go to https://vercel.com

Sign up (free)

"Import Project" from GitHub

Select your repository

Root directory: frontend

Deploy automatically!



Update URLs

After deployment:



Copy your Railway backend URL

Update frontend/app/page.tsx:



Replace http://localhost:8000 with your Railway URL





Update backend/main.py CORS:



Add your Vercel URL to allow\_origins









📊 Performance



Response Time: 1-2 seconds

Voice Recognition: Instant (browser-side)

LLM Response: ~1-2 seconds

Speech Synthesis: Instant (browser-side)

Cost per message: $0.00

Monthly cost: $0.00





🎯 Use Cases



📚 Learning - Practice conversations in different languages

♿ Accessibility - Voice interface for hands-free interaction

🎓 Education - Teaching AI and web development

💼 Portfolio - Showcase your full-stack skills

🎮 Experimentation - Test AI capabilities for free





🛠️ Customization

Change Voice Settings

In frontend/app/page.tsx, modify the speakText function:

typescriptutterance.rate = 1.0;   // Speed: 0.1 to 10

utterance.pitch = 1.0;  // Pitch: 0 to 2

utterance.volume = 1.0; // Volume: 0 to 1

Change Bot Personality

In backend/main.py, modify the system prompt:

python{

&nbsp;   "role": "system",

&nbsp;   "content": "You are a helpful assistant."  # Customize this!

}

Change UI Colors

In frontend/app/page.tsx:



User messages: bg-green-600

Bot messages: bg-gray-700

Buttons: bg-green-600





📁 Project Structure

voice-chatbot-free/

├── backend/

│   ├── main.py              # FastAPI server

│   ├── requirements.txt     # Python dependencies

│   ├── .env                 # API keys (not in git)

│   └── .env.example         # Template

│

├── frontend/

│   ├── app/

│   │   ├── page.tsx         # Main chat interface

│   │   ├── layout.tsx       # App layout

│   │   └── globals.css      # Global styles

│   ├── package.json         # Node dependencies

│   └── tailwind.config.ts   # Tailwind config

│

├── .gitignore              # Git ignore file

└── README.md               # This file



🐛 Troubleshooting

Microphone Not Working



Check browser permissions

Use HTTPS in production (required for mic access)

Try Chrome or Edge



"Speech recognition not supported"



Use Chrome, Edge, or Safari

Update browser to latest version



Backend Connection Failed



Ensure backend is running on port 8000

Check CORS settings in main.py

Verify Groq API key in .env



Voice Not Speaking



Check browser audio isn't muted

Check system volume

Try different browser





📈 Groq Free Tier Limits



30 requests per minute

14,400 tokens per minute

~43,000 messages per day



Perfect for personal projects and learning!



🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request





📝 License

This project is licensed under the MIT License - see the LICENSE file for details.



🙏 Acknowledgments



Groq - For providing free, lightning-fast LLM API

Browser Vendors - For Web Speech API

Vercel - For free Next.js hosting

Railway - For free backend hosting

Next.js - Amazing React framework

FastAPI - Beautiful Python framework

