import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import Charm from "../../app/factory/Charm.js";
import n3, { N3Service } from "../../app/services/n3.js";
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
      const charms = await Charm.load();
      store.addQuads(charms);
      const uri = interaction.options.getString("resource");
      console.log(uri);
      const r = await fetch(uri?.endsWith(".ttl") ? uri : `${uri}.ttl`);

      // const lookup = store.getQuads(uri, null, null, null);
      return await interaction.reply(await r.text());
    } catch (ex) {
      console.error(ex);
    }
  },
} as const;
