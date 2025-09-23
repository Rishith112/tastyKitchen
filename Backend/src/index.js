import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import router from "./routes/userRoutes.js";
import routes from "./routes/restaurantRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", router);
app.use("/api/restaurants", routes);


const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

if (!URL) {
  console.error("MONGO_URL is not defined in environment variables");
  process.exit(1);
}

async function startServer() {
  try {
    await connectDB(URL);
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

startServer();