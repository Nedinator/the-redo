export async function handleModalSubmit(interaction) {
  if (interaction.customId.startsWith("banModal")) {
    const reason = interaction.fields.getTextInputValue("banReason");
    const targetId = interaction.customId.split("_")[1];
    const member = interaction.guild.members.cache.get(targetId);

    if (!member.bannable) {
      return interaction.reply({
        content:
          "This user has moderator/admin permissions or higher permissions than this bot.",
        ephemeral: true,
      });
    }

    await member.ban({ reason });

    await interaction.reply({
      content: `${targetId} has been banned for: ${reason}`,
      ephemeral: true,
    });
  } else {
    return interaction.reply({
      content: "Something went wrong with the modal.",
      ephemeral: true,
    });
  }
}
