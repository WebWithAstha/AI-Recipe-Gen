import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true, trim: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  source: { type: String, default: "gemini" },
  originalQuery: { type: String}
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
