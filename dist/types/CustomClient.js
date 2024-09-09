import { Client, Collection } from "discord.js";
export class CustomClient extends Client {
    constructor(options) {
        super(options);
        this.commands = new Collection();
    }
}
