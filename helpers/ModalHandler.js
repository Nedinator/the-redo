import { Member } from "../schemas/member.js";

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

    const date = new Date();

    const prettyDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const banLog = {
      userID: targetId,
      date: prettyDate,
      reason: reason,
      issuedBy: interaction.user.id,
    };

    const memberDoc = await Member.findOne({ userID: targetId }).catch((err) =>
      console.log(err)
    );

    if (memberDoc) {
      memberDoc.bans = memberDoc.bans.push(banlog);
      memberDoc.markModified("bans");
      memberDoc.save().catch((err) => console.log(err));
    } else {
      const newMemberDoc = new Member({
        username: member.tag,
        userID: targetId,
        bans: [banLog],
      });
      newMemberDoc.save().catch((err) => console.log(err));
    }
  } else {
    return interaction.reply({
      content: "Something went wrong with the modal.",
      ephemeral: true,
    });
  }
}
