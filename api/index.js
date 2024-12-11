import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

const app = express();
app.use(express.json());
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
app.use('/api/users', authRouter);
app.use((err, req, res, next)=> {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message
    });
});