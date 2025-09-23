import mongodb from "mongoose";

async function connectDB(url) {
    try {
        await mongodb.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

export default connectDB;