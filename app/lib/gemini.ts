// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function generateResponse(
  history: { role: string; content: string }[],
  newMessage: string
): Promise<string> {
  try {
    // Get the model instance
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
    });

    // Format conversation history for Gemini
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Start a chat session with history
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error; // Re-throw to handle in your component
  }
}