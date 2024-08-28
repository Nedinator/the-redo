import { Client, GatewayIntentBits } from 'discord.js';
import { registerCommands } from './helpers/CommandHandler.js';
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

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  await registerCommands(client); 
  console.log('Commands registered successfully.');
});

setupEventHandlers(client);

client.login(process.env.TOKEN);
