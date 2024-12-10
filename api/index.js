import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"

const app = express();
dotenv.config(); // initialize dotenv

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log("Not connected" + err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use('/api/users', userRouter);
