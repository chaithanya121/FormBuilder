
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

const AIChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { type: 'user', content: message }]);
      setMessage('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', content: 'I understand your request. Let me help you with that!' }]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Chat Interface</h1>
          <p className="text-xl text-gray-600">Chat with our AI assistant for help and guidance</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg h-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Chat Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'bot' && <Bot className="h-6 w-6 text-blue-500 mt-1" />}
                  <div className={`rounded-lg p-3 max-w-xs ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.content}
                  </div>
                  {msg.type === 'user' && <User className="h-6 w-6 text-green-500 mt-1" />}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChatInterface;
