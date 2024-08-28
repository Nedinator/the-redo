import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

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
  async execute(interaction) {
    const who = interaction.options.getUser("who");
    const why = interaction.options.getString("why");

    const whom = interaction.guild.members.cache.get(who.id);

    if (whom.permissions.has("KICK_MEMBERS")) {
      return await interaction.reply({
        content: "That's a mod, silly.",
        ephemeral: true,
      });
    }

    if (whom) {
      try {
        whom.kick(why);
        await interaction.reply({ content: "Job done.", ephemeral: true });
      } catch (err) {
        await interaction.reply({
          content: "Whoopsie daisy, that didn't work. Check da console.",
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
