'use client'
import { useState } from 'react'

export default function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages(prev => [...prev, `You: ${input}`])
    const userInput = input
    setInput('')

    try {
      const response = await fetch('/api/gemini/route.ts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      })

      const data = await response.json()
      setMessages(prev => [...prev, `AI: ${data.text}`])
      
    } catch (error) {
      setMessages(prev => [...prev, 'Error: Failed to get response'])
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}