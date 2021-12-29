import { Interaction } from "discord.js";

export default {
  name: "interactionCreate",
  execute(interaction: Interaction) {
    console.log(
      `${interaction.user.tag} in #${
        // @ts-ignore
        interaction?.channel?.name
      } triggered an interaction.`
    );
  },
} as const;
