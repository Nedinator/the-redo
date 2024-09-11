import { model, Schema } from "mongoose";

const captchaSchema = new Schema({
  userID: { type: String, required: true },
  timeToSolve: { type: Date, required: true },
  image: { type: String, required: true },
  answer: { type: String, required: true },
});
