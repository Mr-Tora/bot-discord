const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel } = require('../../stinges.json');

module.exports = class StopCommand extends Command {
   constructor(client) {
       super(client, {
           name: 'stop',
           aliases: ['s'],
           group: 'music',
           memberName: 'stop',
           description: 'Fuku-chan se déconnecte du salon vocal'
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

       await voiceChannel.leave();
       return message.say(":thumbsup: déconnecte" + "`" + voiceChannel.name + "`");
   }
}