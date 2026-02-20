import express from "express";
import Upload from "../models/Upload.js";
import mongoose from "mongoose";
import { memoryStorage } from "./captionRoutes.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    let uploads;
    
    if (mongoose.connection.readyState === 1) {
      const totalUploads = await Upload.countDocuments();
      uploads = await Upload.find().sort({ createdAt: -1 });
    } else {
      uploads = memoryStorage;
    }
    
    const totalUploads = uploads.length;
    const styleCount = {};
    
    uploads.forEach(upload => {
      upload.styles.forEach(style => {
        styleCount[style] = (styleCount[style] || 0) + 1;
      });
    });

    const styleBreakdown = Object.entries(styleCount)
      .map(([style, count]) => ({ style, count }))
      .sort((a, b) => b.count - a.count);

    res.json({
      totalUploads,
      totalCaptions: totalUploads * 3,
      topStyle: styleBreakdown[0]?.style,
      styleBreakdown,
      recentUploads: uploads.slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
