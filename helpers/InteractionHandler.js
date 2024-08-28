import { registerCommands } from "./CommandHandler";

export function setupEventHandlers(client) {
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;
  
      const command = client.commands.get(interaction.commandName);
  
      if (!command) {
        await interaction.reply({ content: "Command not found!", ephemeral: true });
        return;
      }
  
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error('Error executing command:', error);
        await interaction.reply({ content: 'There was an error executing that command!', ephemeral: true });
      }
    });

    client.once('ready', async () => {
      console.log(`Logged in as ${client.user.tag}!`);
      await registerCommands(client); 
      console.log('Commands registered successfully.');
    });
    
  }
  