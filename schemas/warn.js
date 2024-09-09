import { Schema, model } from "mongoose";

const warnSchema = new Schema({
  username: { type: [], default: [] },
  userID: String,
  warnings: { type: [{}], default: [{}] },
});
