import { Schema, model } from "mongoose";

const memberSchema = new Schema({
  usernames: { type: [], default: [] },
  userID: String,
  warnings: { type: [{}], default: [] },
  bans: { type: [{}], default: [] },
});
