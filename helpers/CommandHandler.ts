import fs from "fs";
import path from "path";
import { Collection, REST, Routes } from "discord.js";
import { fileURLToPath } from "url";
import { CustomClient } from "../types/CustomClient";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerCommands(client: CustomClient) {
  if (!client.commands) {
    client.commands = new Collection();
  }

  const commands = [];
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const commandPath = path.join(commandsPath, file);
    const { default: command } = await import(`file://${commandPath}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN || "");

  try {
    console.log("Started refreshing application (/) commands.");
    if (!client.user) throw new Error("Client wasn't initialized.");
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
}
