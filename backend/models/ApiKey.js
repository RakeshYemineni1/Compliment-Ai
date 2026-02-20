import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  provider: { type: String, enum: ["openai", "gemini"], required: true },
  apiKey: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("ApiKey", apiKeySchema);
