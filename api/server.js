import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { jobRoute } from "./routes/jobs.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.port || 4000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
    });
    console.log(`mongodb database connected successfully.`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectDB();
app.use("/api/jobs", jobRoute);
app.get("/", (req, res) => res.send("welcome to jobs app"));
app.use((err, req, res, next) => {
  res.status(500).send({ message: `My Mistake= ${err.message}` });
});
app.listen(port, () =>
  console.log(`server is currently running on port http://localhost:${port}`)
);
