import { registerCommands } from "./CommandHandler.js";
import { handleModalSubmit } from "./ModalHandler.js";
import { GuildMember, Interaction } from "discord.js";
import { CustomClient } from "../types/CustomClient.js";

export function setupEventHandlers(client: CustomClient) {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isModalSubmit()) {
      return handleModalSubmit(interaction);
    }

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply({
        content: "Command not found!",
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error("Error executing command:", error);
      await interaction.reply({
        content: "There was an error executing that command!",
        ephemeral: true,
      });
    }
  });

  client.once("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    await registerCommands(client);
    if (!client.user) {
      throw new Error("Client is not ready, user is null");
    }
    console.log("Commands registered successfully.");
  });

  client.on("guildMemberAdd", async (member: GuildMember) => {
    // TODO: Handle member join with captcha lock.
  });
}
