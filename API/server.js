

import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser'; 
import userRouter from './routes/user.js';
import recipeRouter from './routes/recipe.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// userRouter
app.use('/api', userRouter);

// recipeRouter
app.use('/api', recipeRouter);

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "MERN_Recipe_YouTube",
  })
  .then(() => console.log("MongoDB is Connected..!"))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
