import { Schema, model } from "mongoose";
import { ConfigDocument } from "../types/Config";

const configSchema = new Schema<ConfigDocument>({
  guildID: { type: String, required: true },
  mod_log_id: { type: String, required: true },
  unverified_role_id: { type: String, required: true },
  captcha_switch: { type: Boolean, default: false },
});

export const Config = model("Config", configSchema);
