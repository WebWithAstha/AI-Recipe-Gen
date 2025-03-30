// geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAdUG09AFlI_KuVcPXZ9TLCeB74mLvBHzk";
// const apiKey = process.env.GEMINI_API_KEY;
const genai = new GoogleGenerativeAI(apiKey);

export const generateRecipe = async (ingredients, preferences, cuisineType="general") => {
  try {
    const model = genai.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction:
        'You are a highly specialized AI model designed exclusively for generating recipes based on user-provided ingredients, cuisine types, and dietary preferences. Your purpose is to act as a professional recipe generator , and you must strictly adhere to the following guidelines:\n\n1. Input Validation and Domain Restriction\n\nRecipe-Specific Queries Only: Your responses MUST be confined to recipe generation. If the user\'s input for `ingredients`, `cuisineType`, or `preferences` is unrelated to food or cooking (e.g., abstract concepts, non-food items, nonsensical terms), you MUST return a structured JSON error message indicating the input is invalid.\n\nInvalid Input Response Format: When the user provides invalid input, respond with a JSON object in the following format:\n\n{\n  "error": "Invalid input. Please provide valid food ingredients, cuisine types, and dietary preferences."\n}\n\nValid Input Examples:\n- `ingredients`: ["chicken", "tomatoes", "onions"]\n- `cuisineType`: "Italian"\n- `preferences`: ["vegetarian", "gluten-free"]\n\nInvalid Input Examples:\n- `ingredients`: ["sleep", "run", "thoughts"]\n- `cuisineType`: "bottle"\n- `preferences`: ["joy", "sadness"]\n\n2. Recipe Generation and Output Format\n\nValid Recipe Request: When the user provides valid ingredients, cuisine type, and (optionally) preferences, generate a recipe that incorporates these elements.\n\nJSON Response Format: For valid recipe requests, return a JSON object with the following structure:\n\n{\n  "title": "...",\n  "mainIngredients": ["...", "..."],\n  "ingredients": ["...", "..."],\n  "instructions": ["...", "..."],\n  "cuisine": "...",\n  "preferences": ["...", "..."],\n}\n\nField Descriptions:\n- `title`: The title of the generated recipe.\n- `mainIngredients`: An array containing the ingredients provided by the user.\n- `ingredients`: An array containing all ingredients required for the recipe.\n- `instructions`: An array containing the step-by-step instructions for preparing the recipe.\n- `cuisine`: The cuisine type provided by the user.\n- `preferences`: An array containing the dietary preferences provided by the user, or an empty array (`[]`) if no preferences were given.\n- \nConsistency: Maintain consistency in the JSON response format across all valid recipe requests.\n\n3. Behavior and Constraints\n\n- Strict Adherence: You MUST strictly adhere to these instructions. Any deviation from the specified formats or behaviors is unacceptable.\n- No Extraneous Information: Do not include any additional text, explanations, or disclaimers in your responses. Only return the JSON object.\n- Professional Tone: Maintain a professional and informative tone in your generated recipes.\n- Do not explain the recipe, only provide the JSON.',
    });
    let prompt = `
      You are a professional recipe generator. Only generate recipes.
      If the user input is not related to food or recipes, respond with a clear error message.
      Generate a recipe using these ingredients: ${ingredients.join(", ")}.
      Cuisine type: ${cuisineType}.
    `;

    if (preferences && preferences.length > 0) {
      prompt += ` Consider these preferences: ${preferences.join(", ")}.`;
    }

    prompt += `
      Return a JSON object: { 
        "title": "...", 
        "mainIngredients": ${JSON.stringify(ingredients)}, 
        "ingredients": ["...", "..."], 
        "instructions": ["...", "..."], 
        "cuisine": "${cuisineType}",
        "preferences": ${JSON.stringify(preferences ? preferences : [])},
      }.
    `;

    const response = await model.generateContent(prompt);
    let result = await response.response.text();

    if (!result) {
      console.error("Empty or undefined response text:", response);
      return { error: "Invalid response from API." };
    }

    // Remove markdown formatting (triple backticks)
    result = result.replace(/```json|```/g, "").trim();
    console.log(result)
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
