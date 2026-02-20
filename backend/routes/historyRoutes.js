import express from "express";
import Upload from "../models/Upload.js";

const router = express.Router();

router.get("/history", async (req, res) => {
  const history = await Upload.find().sort({ createdAt: -1 }).limit(50);
  res.json(history);
});

router.post("/favorite", async (req, res) => {
  const { caption, imageUrl } = req.body;
  // Implement favorites logic if needed
  res.json({ success: true });
});

router.get("/favorites", async (req, res) => {
  // Implement favorites logic if needed
  res.json([]);
});

router.delete("/favorite/:index", async (req, res) => {
  res.json({ success: true });
});

export default router;
