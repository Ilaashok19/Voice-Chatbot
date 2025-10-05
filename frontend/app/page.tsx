'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Send, Loader2, Volume2, Square, MicOff } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [browserSupport, setBrowserSupport] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isStoppingRef = useRef(false); // FIXED: Track if we're intentionally stopping

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (!SpeechRecognition || !speechSynthesis) {
      setBrowserSupport(false);
      console.error('Speech APIs not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    // FIXED: Set to false to prevent continuous listening issues
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript);

      // FIXED: Auto-send when final result is received
      if (finalTranscript.trim()) {
        isStoppingRef.current = true;
        setIsListening(false);
        sendMessage(finalTranscript.trim());
        setTranscript('');
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      isStoppingRef.current = false;
    };

    recognition.onend = () => {
      // FIXED: Only restart if we're still supposed to be listening
      // and we didn't intentionally stop
      if (isListening && !isStoppingRef.current) {
        try {
          recognition.start();
        } catch (error) {
          console.error('Error restarting recognition:', error);
          setIsListening(false);
        }
      } else {
        setIsListening(false);
        isStoppingRef.current = false;
      }
    };

    recognitionRef.current = recognition;
    synthRef.current = speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          // Ignore errors on cleanup
        }
      }
    };
  }, [isListening]); // FIXED: Added isListening to dependency array

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startListening = () => {
    if (!browserSupport) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    setTranscript('');
    isStoppingRef.current = false; // FIXED: Reset stopping flag
    setIsListening(true);
    
    try {
      recognitionRef.current?.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    isStoppingRef.current = true; // FIXED: Mark that we're intentionally stopping
    setIsListening(false);
    
    try {
      recognitionRef.current?.stop();
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }

    if (transcript.trim()) {
      await sendMessage(transcript.trim());
      setTranscript('');
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isProcessing) return;

    // FIXED: Ensure listening is stopped before sending
    if (isListening) {
      isStoppingRef.current = true;
      setIsListening(false);
      try {
        recognitionRef.current?.stop();
      } catch (error) {
        // Ignore errors
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsProcessing(true);

    try {
      const response = await fetch('https://voice-chatbot-backend-r2bb.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          conversation_history: updatedMessages.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      speakText(data.response);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Sorry, I couldn\'t get a response. Please make sure the backend is running and try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
      isStoppingRef.current = false; // FIXED: Reset flag after processing
    }
  };

  const speakText = (text: string) => {
    if (!synthRef.current || !browserSupport) return;

    // FIXED: Cancel any ongoing speech before starting new one
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';

    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.lang === 'en-US'
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  };

  const handleTextSubmit = () => {
    if (inputText.trim() && !isProcessing) {
      sendMessage(inputText.trim());
    }
  };

  if (!browserSupport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/20 border-2 border-red-500 rounded-2xl p-12 max-w-4xl w-full">
          <h2 className="text-5xl font-bold text-red-400 mb-8">Browser Not Supported</h2>
          <p className="text-gray-300 mb-8 text-2xl">
            Your browser doesn't support the Web Speech API. Please use:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-4 text-2xl">
            <li>Google Chrome (recommended)</li>
            <li>Microsoft Edge</li>
            <li>Safari 14.1+</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-2">
      <div className="w-full h-screen bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-gray-700 flex flex-col">
        
        {/* Header - FULL WIDTH */}
        <div className="p-12 border-b-2 border-gray-700 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
          <h1 className="text-7xl font-bold text-white flex items-center gap-8 flex-wrap">
            <Volume2 className="w-20 h-20 text-green-400" />
            Voice Chat Assistant
            <span className="text-3xl bg-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg">100% FREE</span>
          </h1>
          <p className="text-gray-300 mt-6 text-3xl font-medium">
            🎤 Powered by Browser Speech API + Groq LLM • Zero API Costs!
          </p>
        </div>

        {/* Messages - FULL WIDTH */}
        <div className="flex-1 overflow-y-auto px-12 py-10 space-y-10">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-48">
              <Volume2 className="w-40 h-40 mx-auto mb-10 text-gray-600" />
              <p className="text-5xl font-bold mb-6">Start a conversation!</p>
              <p className="text-3xl mt-6">Click the microphone button or type a message</p>
              <p className="text-2xl mt-10 text-green-400 font-bold">✨ Completely free - no API costs!</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-3xl px-10 py-8 shadow-2xl ${
                  message.role === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <p className="text-2xl whitespace-pre-wrap leading-relaxed font-medium">{message.content}</p>
                <span className="text-base opacity-70 mt-4 block font-medium">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-3xl px-10 py-8 flex items-center gap-6 shadow-2xl">
                <Loader2 className="w-10 h-10 animate-spin text-green-400" />
                <span className="text-2xl text-gray-300 font-bold">Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - MAXIMUM WIDTH & HUGE TEXT */}
        <div className="px-12 py-10 bg-gray-800/80 border-t-4 border-gray-600">
          {isSpeaking && (
            <div className="mb-8 flex items-center justify-center gap-6 bg-blue-600/40 text-blue-200 py-6 px-8 rounded-3xl border-4 border-blue-500 shadow-2xl">
              <Volume2 className="w-12 h-12 animate-pulse" />
              <span className="text-3xl font-bold">🔊 Speaking...</span>
              <button onClick={stopSpeaking} className="ml-auto p-4 hover:bg-blue-600/50 rounded-2xl transition">
                <Square className="w-10 h-10" />
              </button>
            </div>
          )}

          {isListening && (
            <div className="mb-8 p-10 bg-green-900/40 border-4 border-green-500 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-8 h-8 bg-green-400 rounded-full animate-pulse shadow-2xl shadow-green-400/70" />
                <span className="text-4xl font-bold text-green-300">🎤 Listening...</span>
              </div>
              <p className="text-white text-3xl font-bold min-h-[50px] bg-green-950/40 p-6 rounded-2xl border-2 border-green-600/30">
                {transcript || '💭 Start speaking...'}
              </p>
            </div>
          )}
          
          {/* Main Input Controls - MAXIMUM SIZE */}
          <div className="bg-gray-700/60 p-10 rounded-3xl border-4 border-gray-600 shadow-2xl">
            <div className="flex gap-8 items-stretch">
              {/* Text Input - HUGE */}
              <div className="flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isListening && !isProcessing && inputText.trim()) {
                      handleTextSubmit();
                    }
                  }}
                  placeholder="💬 Type your message here..."
                  disabled={isListening || isProcessing}
                  className="w-full bg-gray-800 text-white text-3xl font-medium rounded-2xl px-10 py-8 border-4 border-gray-600 focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 placeholder-gray-400 transition-all shadow-lg"
                />
              </div>

              {/* Send Button - MASSIVE */}
              <button
                onClick={handleTextSubmit}
                disabled={!inputText.trim() || isListening || isProcessing}
                className="bg-green-600 text-white px-12 py-8 rounded-2xl hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-green-600/60 border-4 border-green-500"
                title="Send message (or press Enter)"
              >
                <Send className="w-12 h-12" />
              </button>

              {/* Voice Button - MASSIVE */}
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className={`px-12 py-8 rounded-2xl transition-all active:scale-95 shadow-2xl border-4 ${
                  isListening
                    ? 'bg-red-600 hover:bg-red-700 animate-pulse shadow-red-600/60 border-red-500'
                    : 'bg-green-600 hover:bg-green-700 shadow-green-600/60 border-green-500'
                } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isListening ? '🛑 Stop recording' : '🎤 Start voice recording'}
              >
                {isListening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
              </button>
            </div>

            {/* Help Text - EXTRA LARGE */}
            <div className="mt-8 text-center">
              <p className="text-2xl text-gray-300 font-medium">
                💡 <span className="font-bold text-green-400">Tip:</span> Click 🎤 to speak or type and press Enter
              </p>
            </div>
          </div>

          {/* Footer - PROMINENT & LARGE */}
          <div className="mt-8 text-center bg-gradient-to-r from-green-900/30 to-blue-900/30 py-8 rounded-3xl border-4 border-green-800/50 shadow-2xl">
            <p className="text-3xl font-bold text-green-400">💚 100% FREE - No API Costs!</p>
            <p className="text-xl text-gray-300 mt-3 font-semibold">Powered by Browser Speech API + Groq LLM</p>
          </div>
        </div>
      </div>
    </div>
  );
}