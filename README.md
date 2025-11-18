🎤 Voice Chatbot - 100% FREE AI Assistant
A fully-featured voice chatbot with speech-to-text, AI responses, and text-to-speech capabilities. Completely free with zero API costs!

✨ Features

🎙️ Speech-to-Text: Browser-based voice recognition (no API costs!)
🤖 AI Responses: Powered by Groq's free LLM API
🔊 Text-to-Speech: Browser-based voice synthesis (no API costs!)
💬 Text Chat: Type or speak - both work seamlessly
📱 Responsive Design: Works on desktop and mobile
🆓 100% Free: No credit card, no hidden costs, no limits!

🌐 Live Demo : https://voice-chatbot-chi.vercel.app/

Frontend: https://voice-chatbot-git-main-ila-ashoks-projects.vercel.app/
Backend API: https://voice-chatbot-backend-r2bb.onrender.com
GitHub: https://github.com/Ilaashok19/Voice-Chatbot

🚀 Tech Stack
Frontend

Next.js 14 (React 18)
TypeScript
Tailwind CSS
Lucide React (Icons)
Web Speech API (Browser-native speech recognition)

Backend

FastAPI (Python)
Groq API (Free LLM)
Uvicorn (ASGI server)

Deployment

Frontend: Vercel (Free tier)
Backend: Render (Free tier)

📦 Installation & Setup
Prerequisites

Node.js 18+ and npm
Python 3.8+
Git

1. Clone Repository
bashgit clone https://github.com/Ilaashok19/Voice-Chatbot.git
cd Voice-Chatbot
2. Backend Setup
bash# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
Edit .env and add your Groq API key:
envGROQ_API_KEY=gsk_your_key_here
Start backend server:
bashpython main.py
Backend will run on: http://localhost:8000
3. Frontend Setup
bash# Open a new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
Frontend will run on: http://localhost:3000
🔑 Getting API Keys
Groq API Key (100% FREE - No Credit Card!)

Go to: https://console.groq.com/keys
Sign up with Google/GitHub
Click "Create API Key"
Copy the key (starts with gsk_)
Add to backend/.env file

That's it! Only 1 API key needed!
🌐 Browser Compatibility
BrowserSpeech-to-TextText-to-SpeechRatingChrome✅ Excellent✅ Excellent⭐⭐⭐⭐⭐Edge✅ Excellent✅ Excellent⭐⭐⭐⭐⭐Safari✅ Good✅ Good⭐⭐⭐⭐Firefox⚠️ Limited✅ Good⭐⭐⭐
Recommended: Chrome or Edge for best experience
🚀 Deployment Guide
Deploy Backend on Render (FREE)

Push code to GitHub (if not already done)
Go to https://render.com and sign up
Create New Web Service:

Click "New +" → "Web Service"
Connect your GitHub account
Select your Voice-Chatbot repository
Configure:

Name: voice-chatbot-backend
Root Directory: backend
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT




Add Environment Variable:

Click "Environment" tab
Add: GROQ_API_KEY = your_groq_api_key


Deploy: Click "Create Web Service"
Copy your backend URL (e.g., https://voice-chatbot-backend-r2bb.onrender.com)

Deploy Frontend on Vercel (FREE)

Go to https://vercel.com and sign up
Import Project:

Click "Add New..." → "Project"
Import from GitHub
Select your Voice-Chatbot repository


Configure:

Framework Preset: Next.js
Root Directory: frontend
Click "Deploy"


Update Backend URL:

After deployment, edit frontend/app/page.tsx
Replace http://localhost:8000 with your Render backend URL
Example:



typescript   const response = await fetch('https://voice-chatbot-backend-r2bb.onrender.com/api/chat', {

Redeploy: Commit and push changes

Update CORS (Important!)
After deploying, update backend/main.py to allow your Vercel domain:
pythonapp.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-app.vercel.app",  # Add your Vercel URL here
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Commit and push to GitHub - Render will auto-deploy.
📁 Project Structure
Voice-Chatbot/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment template
│   └── .env                 # Your API keys (gitignored)
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Main chat interface
│   │   ├── layout.tsx       # App layout
│   │   └── globals.css      # Global styles
│   ├── package.json         # Node dependencies
│   └── next.config.js       # Next.js configuration
└── README.md
🎯 Usage
Voice Input

Click the 🎤 microphone button
Speak your message
The chatbot will automatically process and respond
Response will be both displayed and spoken aloud

Text Input

Type your message in the input field
Press Enter or click Send
Get instant AI responses

🔧 Configuration
Backend Configuration
Edit backend/main.py to customize:
python# Change AI model
model="llama-3.1-8b-instant",  # Fast and free

# Adjust response length
max_tokens=200,  # Shorter responses

# Modify temperature (creativity)
temperature=0.7,  # 0.0 = focused, 1.0 = creative
Frontend Configuration
Edit frontend/app/page.tsx to customize:
typescript// Change speech recognition language
recognition.lang = 'en-US';  // or 'es-ES', 'fr-FR', etc.

// Adjust voice synthesis
utterance.rate = 1.0;   // Speech speed
utterance.pitch = 1.0;  // Voice pitch
🐛 Troubleshooting
Microphone Not Working

Check browser permissions: Click 🎤 icon in address bar
Use Chrome/Edge: Best browser support
HTTPS required: Works on localhost or HTTPS domains only

CORS Errors

Update backend CORS: Add your frontend URL to allow_origins
Check Render logs: Ensure backend is running
Verify URLs: Make sure frontend is calling correct backend URL

Backend Not Responding

Render free tier: First request may take 50+ seconds (cold start)
Check API key: Verify GROQ_API_KEY in Render environment variables
View logs: Check Render dashboard for errors

Deployment Issues

Render: Check build logs for Python errors
Vercel: Ensure frontend is set as root directory
Environment variables: Verify all keys are set correctly

💰 Cost Breakdown
ServiceCostLimitsGroq APIFREEGenerous free tierRender (Backend)FREE750 hours/monthVercel (Frontend)FREE100GB bandwidth/monthSpeech RecognitionFREEBrowser-native (unlimited)Speech SynthesisFREEBrowser-native (unlimited)TOTAL$0.00Perfect for personal use!
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📝 License
This project is open source and available under the MIT License.
🙏 Acknowledgments

Groq - For free LLM API
Render - For free backend hosting
Vercel - For free frontend hosting
Web Speech API - For browser-native speech capabilities

📧 Contact
Developer: Ila Ashok
GitHub: @Ilaashok19
Project Link: https://github.com/Ilaashok19/Voice-Chatbot

⭐ If you find this project useful, please give it a star on GitHub!
Made with ❤️ using 100% free technologies
