import express from "express";
import aiService from "../services/aiService.js";
import Upload from "../models/Upload.js";
import mongoose from "mongoose";

const router = express.Router();
const memoryStorage = [];

router.post("/generate", async (req, res) => {
  try {
    const { imageData, styles, customStyles } = req.body;
    const finalStyles = customStyles || styles;
    const captions = await aiService.generateCaptions(imageData, finalStyles);
    
    const uploadData = { imageUrl: imageData, styles: finalStyles, captions, createdAt: new Date() };
    
    console.log("MongoDB connection state:", mongoose.connection.readyState);
    
    if (mongoose.connection.readyState === 1) {
      console.log("Saving to MongoDB...");
      const saved = await Upload.create(uploadData);
      console.log("✅ Saved to MongoDB:", saved._id);
    } else {
      console.log("⚠️ MongoDB not connected, saving to memory");
      memoryStorage.push(uploadData);
    }
    
    res.json({ captions });
  } catch (error) {
    console.error("❌ Error in /generate:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/regenerate", async (req, res) => {
  try {
    const { imageData, styles, index, currentCaptions } = req.body;
    const captions = await aiService.generateCaptions(imageData, styles);
    
    // Update in MongoDB
    if (mongoose.connection.readyState === 1) {
      const newCaptions = [...currentCaptions];
      newCaptions[index] = captions[0];
      
      await Upload.findOneAndUpdate(
        { imageUrl: imageData },
        { captions: newCaptions },
        { sort: { createdAt: -1 } }
      );
      console.log("✅ Updated caption in MongoDB");
    }
    
    res.json({ captions, index });
  } catch (error) {
    console.error("❌ Error in /regenerate:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/translate", async (req, res) => {
  try {
    const { caption, language } = req.body;
    const translated = await aiService.translateCaption(caption, language);
    res.json({ translated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { memoryStorage };
export default router;
