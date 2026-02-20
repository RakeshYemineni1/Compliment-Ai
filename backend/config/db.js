import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Attempting MongoDB connection...");
    console.log("Connection string:", process.env.MONGO_URI?.replace(/:[^:@]+@/, ':****@'));
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    
    console.log("✅ MongoDB Connected - Data will persist!");
  } catch (error) {
    console.log("\n❌ MongoDB Connection Error Details:");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    console.log("Error code:", error.code);
    console.log("Error syscall:", error.syscall);
    console.log("Full error:", JSON.stringify(error, null, 2));
    console.log("\n⚠️  Using in-memory storage (data will be lost on restart)\n");
  }
};

process.on('unhandledRejection', (error) => {
  console.log("\n❌ Unhandled Rejection:");
  console.log("Error:", error);
  if (error.message?.includes('querySrv')) {
    console.log('⚠️  MongoDB DNS lookup failed - using in-memory storage');
  }
});
