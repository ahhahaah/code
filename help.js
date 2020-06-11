
// This is trying to fetch the property MessageEmbed out of the discord.js package you installed.
const { MessageEmbed } = require("discord.js");
// This is trying to fetch the property prefix out of the botconfig.json file you created.
const { prefix } = require("../../botconfig.json");
// This is trying to fetch the property readdirSync from the fs package you installed.
const { readdirSync } = require("fs");
// This is trying to fetch the property stripIndents from the common-tags property you installed.
const { stripIndents } = require("common-tags");
// This is trying to fetch the property cyan out of the colours.json file you created.
const { cyan } = require("../../colours.json")

// This is exporting the function thus the command.
module.exports = {
	// In config, you can set the name, aliases, usage, category, description and stuff.
	config: {
		name: "help",
		aliases: ["h", "halp", "commands"],
		usage: "!help",
		category: "info",
		description: "Displays all commands that the bot has.",
		accessableby: "Members"
	},
	// Run will run function with the bot, message and args parameters.
	run: async (bot, message, args) => {
		// Here you create a new embed with the property MessageEmbed that you fetched on the top of the code (const { MessageEmbed } = require("discord.js");).
		const embed = new MessageEmbed()
			.setColor(cyan) // This will set the embeds colour.
			.setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL) // This will set the embeds author.
			.setThumbnail(bot.user.displayAvatarURL) // This will set the embeds thumbnail

		// This if statement checks if args[0] thus the user input on the first place doesn't exists.
		if(!args[0]) {
		    
		    bot.category.forEach(cmd => {
		           const category = bot.commands.filter(c => cmd.config.category === c.config.category);
		           const catMap = category.map(cat => `${cat.config.name}`).join(" ");
		           
		           embed.addField(`${cmd.config.category}`, `${catMap}`);
		    })

			// Here you set the embeds description and the footer.
			embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix is: **${prefix}**`)
			embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

			// Here we send the embed to the channel.
			return message.channel.send(embed)
		} else {
			let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
			if(!command) {return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))}
			command = command.config

			embed.setDescription(stripIndents`The bot's prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

			return message.channel.send(embed)
		}
	}
}