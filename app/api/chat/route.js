'use server';

import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// POST function to handle incoming requests
export async function POST(req) {
  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_API_KEY, 
    dangerouslyAllowBrowser: true
  });

  // Extract content from the request body
  const { messages } = await req.json();

  if (!messages || !messages.length) {
    return new NextResponse('Messages are required', { status: 400 });
  }

  try {
    // Create a chat completion request to the Groq API
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama3-8b-8192',
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    // Return the completion response as JSON
    return new NextResponse(JSON.stringify(completion), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
