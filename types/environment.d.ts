
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: string;
        DATA_FILE: string;
        ONTOLOGY_URI: string;

        // Discord Bot
        DISCORD_TOKEN: string;
        CLIENT_ID?: string;
        GUILD_ID?: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}