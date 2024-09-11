import {
  ChatInputCommandInteraction,
  Embed,
  EmbedBuilder,
  InteractionResponse,
  ModalSubmitInteraction,
} from "discord.js";
import { Config } from "../schemas/config";
import { ConfigDocument } from "../types/Config";

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

export async function generateCaptchaImage(target: string) {
  //
}
