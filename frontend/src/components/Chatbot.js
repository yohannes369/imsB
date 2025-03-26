import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = ({ botName = "Guest Assistance", greeting = "Hello! How can I help you today?" }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          type: "bot",
          text: greeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [messages.length, greeting]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAsk = async () => {
    if (!query.trim()) return;

    const userMessage = { 
      type: "user", 
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/ask", { query });
      
      setTimeout(() => {
        const botMessage = { 
          type: "bot", 
          text: res.data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      const errorMessage = {
        type: "bot",
        text: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[400px] w-full bg-white bg-opacity-0 backdrop-blur-sm">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-blue-600/80 to-indigo-700/80 p-3 text-white flex items-center justify-between rounded-t-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-sm">{botName}</h2>
            <p className="text-xs opacity-80">{isTyping ? "Typing..." : "Online"}</p>
          </div>
        </div>
        <button 
          onClick={handleClear}
          className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
          title="Clear conversation"
        >
          Clear
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-3 overflow-y-auto bg-white/10 backdrop-blur-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${msg.type === "user" 
                ? "bg-blue-600/80 text-white rounded-br-none animate-message-in-right" 
                : "bg-white/80 text-gray-800 shadow rounded-bl-none animate-message-in-left"}`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.type === "user" ? "text-blue-100/90" : "text-gray-600/80"}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-3">
            <div className="bg-white/80 text-gray-800 shadow rounded-lg rounded-bl-none px-3 py-2 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-200/30 p-2 bg-white/20 backdrop-blur-sm rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300/50 rounded-full py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm bg-white/70"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleAsk}
            disabled={!query.trim()}
            className={`ml-2 p-1 rounded-full ${query.trim() 
              ? "bg-blue-600/80 text-white hover:bg-blue-700/80 transform hover:scale-110 transition-all" 
              : "bg-gray-200/50 text-gray-500/50 cursor-not-allowed"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;