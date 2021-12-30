// Require the necessary discord.js classes
import { Client, Collection, CommandInteraction, Intents } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
}) as Client<any> & {
  commands: Collection<
    string,
    { execute: (interaction: CommandInteraction) => Promise<void> }
  >;
};
const eventFiles = fs
  .readdirSync("./discord/events")
  .filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
  const event = await import(`./events/${file}`);
  if (event?.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./discord/commands")
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = (await import(`./commands/${file}`) ).default
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
