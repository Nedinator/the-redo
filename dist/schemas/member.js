import { Schema, model } from "mongoose";
const memberSchema = new Schema({
    username: String,
    userID: String,
    warnings: { type: [{}], default: [] },
    bans: { type: [{}], default: [] },
});
export const Member = model("Member", memberSchema);
