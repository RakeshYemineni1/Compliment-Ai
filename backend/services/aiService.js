import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEYS = {
  gemini: "AIzaSyA3MAp9TXsOps_RMp2Pu0B3i8HL7DSStbc",
  openai: "YOUR_OPENAI_KEY_HERE"
};

class AIService {
  async getActiveKey(provider) {
    const key = API_KEYS[provider];
    console.log(`Getting key for ${provider}:`, key ? 'Found' : 'Not found');
    if (!key || key.includes("YOUR_")) throw new Error(`No API key for ${provider}`);
    return key;
  }

  async generateWithOpenAI(prompt, imageData, apiKey) {
    const openai = new OpenAI({ apiKey });
    
    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: imageData } }
        ]
      }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500
    });

    return this.parseResponse(response.choices[0].message.content);
  }

  async generateWithGemini(prompt, imageData, apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imagePart = {
      inlineData: {
        data: imageData.split(",")[1],
        mimeType: "image/jpeg"
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    return this.parseResponse(result.response.text());
  }

  parseResponse(text) {
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
    } catch {}
    
    return text.split("\n").filter(line => line.trim()).slice(0, 3);
  }

  async generateCaptions(imageData, styles) {
    const styleText = Array.isArray(styles) ? styles.join(" + ") : styles;
    const prompt = `Analyze this image and generate exactly 3 unique, creative captions in ${styleText} style. 
    Blend the styles naturally. Return as JSON array of strings. Be specific about what you see in the image.`;

    try {
      const geminiKey = await this.getActiveKey("gemini");
      return await this.generateWithGemini(prompt, imageData, geminiKey);
    } catch (geminiError) {
      console.log("Gemini error:", geminiError.message);
      throw new Error("Failed to generate captions: " + geminiError.message);
    }
  }

  async translateCaption(caption, language) {
    const prompt = `Translate this caption to ${language}: "${caption}". Return only the translation.`;
    try {
      const geminiKey = await this.getActiveKey("gemini");
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      throw new Error("Translation failed: " + error.message);
    }
  }
}

export default new AIService();
