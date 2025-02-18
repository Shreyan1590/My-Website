import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";

const chatbotResponses = {
  "hello": "Hi there! How can I assist you?",
  "who are you": "I'm Shreyan's portfolio assistant! Ask me anything.",
  "projects": "Shreyan has worked on multiple projects including a 3D portfolio and scalable web applications.",
  "contact": "You can reach Shreyan at shreyanofficial25@gmail.com or via LinkedIn!",
  "default": "I'm not sure about that, but you can explore the portfolio to learn more!"
};

export default function Chatbot() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you today?" }]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    const botResponseText = chatbotResponses[input.toLowerCase()] || chatbotResponses["default"];
    const botMessage = { sender: "bot", text: botResponseText };
    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} className="p-3 rounded-full shadow-lg bg-blue-500 text-white">
          <MessageCircle size={24} />
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-72 bg-white shadow-lg rounded-2xl p-4"
        >
          <Card className="max-h-64 overflow-auto p-2">
            {messages.map((msg, index) => (
              <CardContent key={index} className={`my-1 p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"}`}>
                {msg.text}
              </CardContent>
            ))}
          </Card>
          <div className="flex mt-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." />
            <Button onClick={handleSend} className="ml-2 bg-blue-500 text-white">
              <Send size={18} />
            </Button>
          </div>
          <Button onClick={() => setIsOpen(false)} className="mt-2 w-full text-sm text-gray-500">Close</Button>
        </motion.div>
      )}
    </div>
  );
}
