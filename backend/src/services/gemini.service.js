// geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genai = new GoogleGenerativeAI(apiKey);

export const generateRecipe = async (ingredients, preferences, cuisineType) => {
  try {
    const model = genai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
        Generate a recipe using these ingredients: ${ingredients.join(", ")}.
        Consider these preferences: ${preferences}.
        Cuisine type: ${cuisineType}.
        Return a JSON object: { "title": "...", "ingredients": ["...", "..."], "instructions": ["...", "..."] }.
      `;

    const response = await model.generateContent(prompt);
    let result = await response.response.text();

    if (!result) {
      console.error("Empty or undefined response text:", response);
      return { error: "Invalid response from API." };
    }

    // Remove markdown formatting (triple backticks)
    result = result.replace(/```json|```/g, "").trim();

    try {
      return JSON.parse(result);
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError, "Raw response:", result);
      return { error: "Invalid JSON response from API." };
    }
  } catch (error) {
    if (error.response?.status === 429) {
      console.error("Gemini API rate limit exceeded:", error);
      return { error: "API rate limit exceeded. Please try again later." };
    }

    console.error("Gemini API error:", error);
    return { error: "Failed to generate recipe." };
  }
};

