import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  imageUrl: String,
  styles: [String],
  captions: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Upload", uploadSchema);
