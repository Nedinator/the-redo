import { Schema, model } from "mongoose";
import { MemberDocument } from "../types/Member";

const memberSchema = new Schema<MemberDocument>({
  username: { type: String, required: true },
  userID: { type: String, required: true },
  warnings: {
    type: [{ reason: String, date: String, issuedBy: String }],
    default: [],
  },
  bans: {
    type: [{ reason: String, date: String, issuedBy: String }],
    default: [],
  },
});

export const Member = model<MemberDocument>("Member", memberSchema);
