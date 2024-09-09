import { Collection, GatewayIntentBits } from "discord.js";
import mongoose from "mongoose";
import { setupEventHandlers } from "./helpers/InteractionHandler.js";
import dotenv from "dotenv";
import { CustomClient } from "./types/CustomClient.js";
dotenv.config();
if (!process.env.TOKEN || !process.env.MONGO_URI) {
    throw new Error("Setup your env variables");
}
const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
mongoose.connect(process.env.MONGO_URI);
client.commands = new Collection();
setupEventHandlers(client);
client.login(process.env.TOKEN);
