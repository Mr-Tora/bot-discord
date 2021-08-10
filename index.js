const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const RPC = require("discord-rpc");

const client = new CommandoClient({
    commandPrefix: '-',
    owner: '697738944967606322',
    invite: 'https://discord.gg/jSQz3jmBtS'
}); 

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music', 'Music')
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.server = {
    queue: [],
    currentVideo: {url: "", title: "Rien pour le moment !"},
    dispatcher: null,
    connection: null,
};

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
})

client.on('error', (error) => console.error(error));

client.login(porcess.env.TOKEN);