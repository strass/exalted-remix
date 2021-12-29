import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import Charm from "../../app/factory/Charm.js";
import { N3Service } from "../../app/services/n3.js";
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
    const charms = await Charm.load();
    store.addQuads(charms);

    const uri = interaction.options.getString("resource");
    console.log(uri);
    const r = await fetch(uri?.endsWith(".ttl") ? uri : `${uri}.ttl`);
    console.log(await r.text());
    const lookup = store.getQuads(uri, null, null, null);
    console.log(lookup);
    await interaction.reply(String(lookup.length));
  },
} as const;
