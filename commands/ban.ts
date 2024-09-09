import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ChatInputCommandInteraction,
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
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target");

    const reasonInput = new TextInputBuilder()
      .setCustomId("banReason")
      .setLabel("Reason for the ban")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      reasonInput
    );

    const banModal = new ModalBuilder()
      .setCustomId("banModal")
      .setTitle("Ban User")
      .addComponents(actionRow);

    await interaction.showModal(banModal);
  },
};
