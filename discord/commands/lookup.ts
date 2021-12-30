import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import Charm from "../../services/Charm.js";
import N3Service from "../../services/n3.js";
import fetch from "node-fetch";

let store = N3Service.createStore([]);

export default {
  data: new SlashCommandBuilder()
    .setName("ex")
    .setDescription("Looks up an Exalted reference")
    .addStringOption((option) =>
      option
        .setName("resource")
        .setDescription("resource to look up")
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    try {
      // const charms = await Charm.load();
      // store.addQuads(charms);
      const uri = interaction.options.getString("resource");
      const r = await fetch(uri?.endsWith(".ttl") ? uri : `${uri}.ttl`);
      const body = await r.text()
      console.log(body)
      const charm = Charm.from(body);
      console.log(charm)
      // const lookup = store.getQuads(uri, null, null, null);
      return await interaction.reply({ embeds: [charm.discordEmbed] });
    } catch (ex) {
      console.error(ex);
    }
  },
} as const;
