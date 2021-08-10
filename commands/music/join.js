const { User } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel } = require('../../stinges.json');

module.exports = class JoinCommand extends Command {
   constructor(client) {
       super(client, {
           name: 'join',
           aliases: ['j'],
           group: 'music',
           memberName: 'join',
           description: 'Fuku-chan vien dans le salon vocal'
       });
   }

   /**
    * 
    * @param {CommandoMessage} message 
    * @param {String} query
    */
    async run(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }

       await voiceChannel.join();

       return message.say(":thumbsup: j'ai rejoins" + "`" + voiceChannel.name + "`");
   }
}