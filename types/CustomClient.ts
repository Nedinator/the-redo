import { Client, Collection } from "discord.js";
import { Command } from "./Command.js";

export class CustomClient extends Client {
  commands: Collection<string, Command>;

  constructor(options: any) {
    super(options);
    this.commands = new Collection();
  }
}
