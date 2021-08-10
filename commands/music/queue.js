const { MessageEmbed } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");
const { BotNotInVoiceChannel } = require('../../stinges.json');

module.exports = class ListeCommand extends Command {
   constructor(client) {
       super(client, {
           name: 'liste',
           aliases: ['l'],
           group: 'music',
           memberName: 'liste',
           description: "Affiche la file d'attente. Pour afficher les différetens pages, tape la commande avec le numéro de la page spécifié aprés (-queue 2)",
           args: [
               {
                   key: 'page',
                   prompt: "Quel page veux-tu afficher ?",
                   default: 1,
                   type: 'integer'
               }
           ]
       });
   }

   /**
    * 
    * @param {CommandoMessage} message 
    * @param {Number} page
    */
    async run(message, { page }) {
        const server = message.client.server;

        if (!message.client.voice.connections.first()) {
            return message.say(":x: Je ne suis pas connecté à un salon vocal tape `-join` pour m'ajouter.");
        }
        
        const numberOfItems = 10;
        const startingItem = (page - 1) * numberOfItems;
        const queueLength = server.queue.length;

        var itemsPerPage = startingItem + numberOfItems;
        var totalPages = 1;

        var embed = new MessageEmbed()
            .setTitle(`File d'attente pour ${message.author.username}`)
            .setColor("BLUE")
            .addField('En train de jouer : ',` [${server.currentVideo.title}]`  + `(${server.currentVideo.url})`);

        if (queueLength > 0) {
            var value = "";

            if (queueLength > numberOfItems){
                totalPages = Math.ceil(queueLength / numberOfItems);
            }

            if (page <= 0 || (page) > totalPages) {
                return message.say(":x: Cette page n'existe pas");
            }

            if ( (queueLength - startingItem ) < numberOfItems ) {
                itemsPerPage = (queueLength - startingItem) + startingItem;
            }
            // [titre de la video] (url)     
            for (let i = startingItem; i < itemsPerPage; i++) {
                const video = server.queue[i];
                value += "`" + (i + 1) + ".` [" + video.title + "](" + video.url + ")\n";
            }
            embed.addField("A venir :", value);
        }

        embed.setFooter(`page ${page}/${totalPages}`);

        return message.say(embed);
   }
}