import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

export default function EnhancedTravelChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1,
      text: "Hi! I'm your AI Travel Assistant. I can help you with travel complaints, questions, or general support. How can I assist you today?", 
      sender: "bot",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("complaint") || lowerInput.includes("problem") || lowerInput.includes("issue")) {
      return "I understand you have a complaint. Please provide more details about your issue, including:\n• What happened?\n• When did it occur?\n• What resolution are you seeking?\n\nThis will help me assist you better.";
    } else if (lowerInput.includes("refund") || lowerInput.includes("money back")) {
      return "For refund requests, I'll need to collect some information:\n• Booking reference number\n• Date of travel/booking\n• Reason for refund request\n\nPlease provide these details so I can help process your request.";
    } else if (lowerInput.includes("cancel") || lowerInput.includes("cancellation")) {
      return "I can help you with cancellations. Please note:\n• Free cancellation policies vary by booking\n• Some bookings may have cancellation fees\n• Refund processing can take 5-10 business days\n\nWhat would you like to cancel?";
    } else if (lowerInput.includes("booking") || lowerInput.includes("reservation")) {
      return "I can assist with booking-related queries. Are you looking to:\n• Make a new booking\n• Modify an existing booking\n• Check booking status\n• Cancel a booking\n\nPlease let me know what specific help you need.";
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello! Great to meet you. I'm here to help with any travel-related questions or concerns you might have. What can I assist you with today?";
    } else if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
      return "You're very welcome! Is there anything else I can help you with regarding your travel needs?";
    } else if (lowerInput.includes("help") || lowerInput.includes("support")) {
      return "I'm here to help! I can assist with:\n• Travel complaints and issues\n• Booking modifications\n• Refund requests\n• General travel questions\n• Cancellation support\n\nWhat specific area do you need help with?";
    } else {
      return "Thank you for your message. I've noted your request and will make sure it gets the attention it deserves. If this is urgent, please don't hesitate to provide more details about your situation.";
    }
  };

  const saveToFirestore = async (message, category = "general") => {
    try {
      await addDoc(collection(db, "complaints"), {
        message: message,
        userId: "anonymous",
        userEmail: "unknown", 
        response: "",
        status: "pending",
        category: category,
        createdAt: Timestamp.now(),
        location: "unspecified",
        platform: "web",
        deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
        userAgent: navigator.userAgent,
        sessionId: Date.now().toString()
      });
      console.log("Message successfully saved to Firebase");
      return true;
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      return false;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      id: messages.length + 1,
      text: input, 
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Determine message category for better organization
    const category = input.toLowerCase().includes("complaint") ? "complaint" :
                    input.toLowerCase().includes("refund") ? "refund" :
                    input.toLowerCase().includes("booking") ? "booking" : "general";

    // Save to Firebase
    try {
      const saveSuccess = await saveToFirestore(input, category);
      if (!saveSuccess) {
        // Show error message to user if save fails
        const errorMessage = {
          id: messages.length + 2,
          text: "Sorry, there was an issue saving your message. Please try again.",
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      console.error("Error saving message:", err);
    }

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {/* Chat Button */}
      <button
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
        } text-black flex items-center justify-center`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-400 rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-400 to-blue-700 text-white p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Bot className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI Travel Support</h3>
              <p className="text-blue-100 text-sm">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-end space-x-2 max-w-[80%] ${
                  msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === "user" ? "bg-blue-600" : "bg-gray-400"
                  }`}>
                    {msg.sender === "user" ? 
                      <User className="text-white" size={14} /> : 
                      <Bot className="text-white" size={14} />
                    }
                  </div>
                  <div>
                    <div className={`rounded-lg px-4 py-2 ${
                      msg.sender === "user" 
                        ? "bg-blue-600 text-white" 
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}>
                      <p className="whitespace-pre-line text-sm">{msg.text}</p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-[80%]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-400">
                    <Bot className="text-black" size={14} />
                  </div>
                  <div className="bg-white text-gray-800 border border-gray-200 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <button
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • We're here to help 24/7
            </p>
          </div>
        </div>
      )}
    </div>
  );
}