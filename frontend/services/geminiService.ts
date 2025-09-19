
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: "AIzaSyCUbBkES9B6jEmefVwr1RWGlNqH3d9Bm00" });

export const generateSweetDescription = async (name: string, category: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI-powered descriptions are currently unavailable. Please set your API_KEY.";
  }
  try {
    const prompt = `Generate a delicious, enticing, and brief marketing description for a sweet called "${name}" which is in the category of "${category}". The description should be one short paragraph, perfect for an e-commerce site. Do not use markdown or special formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error generating sweet description:", error);
    return "An error occurred while generating the description.";
  }
};
