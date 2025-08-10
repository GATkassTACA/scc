// src/app/actions.ts
'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API_KEY;

async function generateContent(prompt: string) {
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error: any) {
    console.error("Error generating content:", error);
    return `Error: ${error.message}`;
  }
}

export async function getGeminiResponse(prevState: any, formData: FormData) {
    const prompt = formData.get('prompt') as string;
    try {
        const data = await generateContent(prompt);
        return { data };
    } catch (e: any) {
        return { message: 'Failed to generate content.' };
    }
}
