import { Document } from "mongoose";

interface Warning {
  reason: string;
  date: string;
  issuedBy: string;
}

interface Ban {
  reason: string;
  date: string;
  issuedBy: string;
}

export interface MemberDocument extends Document {
  username: string;
  userID: string;
  warnings: Warning[];
  bans: Ban[];
}
