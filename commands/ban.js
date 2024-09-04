import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("who are you banning")
        .setRequired(true)
    ),
  async execute(interaction) {
    const target = interaction.options.getUser("target");

    const banModal = new ModalBuilder()
      .setCustomId(`banModal_${target.id}`)
      .setTitle("Ban a member");

    const reasonInput = new TextInputBuilder()
      .setCustomId("banReason")
      .setLabel("Reason for Ban")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("Enter the reason for banning the user");

    const actionRow = new ActionRowBuilder().addComponents(reasonInput);

    banModal.addComponents(actionRow);

    await interaction.showModal(banModal);
  },
};
