import { Schema, model } from "mongoose";

const banSchema = new Schema({
  username: String,
  userID: String,
  bans: { type: [{}], default: [{}] },
});

module.exports = model("Ban", banSchema);
