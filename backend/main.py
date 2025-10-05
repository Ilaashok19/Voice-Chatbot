from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="Voice Chatbot API - FREE VERSION")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ChatRequest(BaseModel):
    message: str
    conversation_history: list = []

@app.get("/")
async def root():
    return {
        "message": "Voice Chatbot API - 100% FREE VERSION",
        "features": [
            "Browser-based Speech-to-Text (FREE)",
            "Groq LLM for responses (FREE)",
            "Browser-based Text-to-Speech (FREE)",
            "Zero API costs!"
        ]
    }

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        messages = [
            {
                "role": "system",
                "content": "You are a helpful, friendly assistant. Keep your responses concise and conversational, ideally 2-3 sentences unless more detail is specifically requested."
            }
        ]
        
        if request.conversation_history:
            messages.extend(request.conversation_history)
        
        messages.append({
            "role": "user",
            "content": request.message
        })
        
        print(f"User said: {request.message}")
        
        chat_completion = groq_client.chat.completions.create(
            messages=messages,
            model="llama-3.1-8b-instant",
            temperature=0.7,
            max_tokens=200
        )
        
        llm_response = chat_completion.choices[0].message.content
        print(f"Bot responded: {llm_response}")
        
        return {
            "response": llm_response,
            "success": True
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "FREE",
        "costs": "$0.00"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)