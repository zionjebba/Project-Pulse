// app/chat/page.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './chat.module.css'
import { generateResponse } from '../lib/gemini' // Make sure this import exists

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  sessionId: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [lastRequestTime, setLastRequestTime] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting
    const now = Date.now();
    if (now - lastRequestTime < 1000) {
      alert('Please wait a moment between messages');
      return;
    }
    setLastRequestTime(now);

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
      sessionId: 'gemini-session'
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the REAL Gemini API
      const aiResponse = await generateResponse(
        messages.map(m => ({ 
          role: m.role, 
          content: m.content 
        })),
        input
      );

      // Add AI response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
        sessionId: 'gemini-session'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Error getting response. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
        sessionId: 'gemini-session'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatArea}>
        <div className={styles.messages}>
          {messages.length === 0 ? (
            <div className={styles.welcomeMessage}>
              <h2>Welcome to Project Pulse Chat</h2>
              <p>Start a new conversation</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.role === 'user' 
                    ? styles.userMessage 
                    : styles.assistantMessage
                }`}
              >
                <div className={styles.messageContent}>{message.content}</div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}