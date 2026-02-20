import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import captionRoutes from "./routes/captionRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

connectDB();

app.use("/api/captions", captionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/history", historyRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
