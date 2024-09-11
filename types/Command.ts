import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  InteractionResponse,
} from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute: (
    interaction: ChatInputCommandInteraction
  ) => Promise<InteractionResponse>;
}
