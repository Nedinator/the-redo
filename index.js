import { Client, GatewayIntentBits } from 'discord.js';
import { setupEventHandlers } from './helpers/InteractionHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Map();


setupEventHandlers(client);

client.login(process.env.TOKEN);
