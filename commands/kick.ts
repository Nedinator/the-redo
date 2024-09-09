import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName("who")
        .setDescription("who are you kicking")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("why")
        .setDescription("why are you kicking them")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const who = interaction.options.getUser("who");
    const why = interaction.options.getString("why");
    const whom = interaction.guild?.members.cache.get(
      who?.id || "No ID found?"
    );

    if (!whom)
      return await interaction.reply({
        content: "Something went wrong and we couldn't find the user",
        ephemeral: true,
      });

    if (whom.permissions.has(PermissionFlagsBits.KickMembers)) {
      return await interaction.reply({
        content: "That's a mod, silly.",
        ephemeral: true,
      });
    }

    if (whom && why) {
      try {
        whom.kick(why);
        await interaction.reply({ content: "Job done.", ephemeral: true });
      } catch (err) {
        await interaction.reply({
          content: "Whoopsie daisy, that didn't work. . .",
          ephemeral: true,
        });
        console.log(err);
      }
    } else {
      await interaction.reply({
        content:
          "You broke me! Why is there no user? Oh, I guess they might not be cached if they're new",
        ephemeral: true,
      });
    }
  },
};
