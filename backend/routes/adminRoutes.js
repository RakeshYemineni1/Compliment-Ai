import express from "express";

const router = express.Router();
const apiKeys = {};
const ADMIN_KEY = "admin123";

const verifyAdmin = (req, res, next) => {
  const adminkey = req.headers.adminkey || req.headers['adminkey'];
  console.log("All headers:", req.headers);
  console.log("Received:", adminkey, "Expected:", ADMIN_KEY);
  if (adminkey !== ADMIN_KEY) {
    return res.status(403).json({ error: "Unauthorized", received: adminkey });
  }
  next();
};

router.post("/api-keys", verifyAdmin, (req, res) => {
  const { provider, apiKey } = req.body;
  apiKeys[provider] = { provider, apiKey, isActive: true, updatedAt: new Date() };
  res.json({ success: true });
});

router.get("/api-keys", verifyAdmin, (req, res) => {
  const keys = Object.values(apiKeys).map(k => ({
    provider: k.provider,
    isActive: k.isActive,
    updatedAt: k.updatedAt
  }));
  res.json(keys);
});

export { apiKeys };
export default router;
