import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  ModalSubmitInteraction,
} from "discord.js";
import { Config } from "../schemas/config";
import { ConfigDocument } from "../types/Config";
import { Canvas, createCanvas } from "canvas";

export async function getCaptchaStatus(
  interaction: ChatInputCommandInteraction | ModalSubmitInteraction
): Promise<boolean | InteractionResponse<boolean>> {
  const conf = await Config.findOne({ guildID: interaction.guildId }).catch(
    (err) => console.error(err)
  );

  if (!conf) {
    return interaction.reply({
      content: "Something went wrong, try again please.",
      ephemeral: true,
    });
  } else {
    return conf.captcha_switch;
  }
}

export async function getConfig(
  interaction: ChatInputCommandInteraction | ModalSubmitInteraction
): Promise<InteractionResponse | ConfigDocument> {
  const conf = await Config.findOne({ guildID: interaction.guildId }).catch(
    (err) => console.error(err)
  );

  if (!conf) {
    return interaction.reply({
      content: "No config found...",
      ephemeral: true,
    });
  } else {
    return conf;
  }
}

export async function getConfigAndReply(
  interaction: ChatInputCommandInteraction | ModalSubmitInteraction
): Promise<InteractionResponse<boolean>> {
  const conf = await getConfig(interaction);
  const confEmbed = new EmbedBuilder()
    .setTitle(`${interaction.guild?.name} config`)
    .setDescription(
      `This is the configuration file for ${interaction.client.user.displayName}.`
    )
    .addFields(
      {
        name: "Captcha Activated",
        value: `${conf.captcha_switch}`,
      },
      {
        name: "Unverified Role ID",
        value: `${conf.unverified_role_id}`,
      }
    );

  return interaction.reply({ embeds: [confEmbed], ephemeral: true });
}

const WIDTH = 200;
const HEIGHT = 100;
const FONT_SIZE = 40;

export function generateCaptchaText(length: number): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captchaText = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    captchaText += charset[randomIndex];
  }
  return captchaText;
}

export function createCaptchaImage(text: string): Buffer {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "#000000";
  ctx.font = `${FONT_SIZE}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, WIDTH / 2, HEIGHT / 2);

  return canvas.toBuffer();
}
