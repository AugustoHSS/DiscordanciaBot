const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv')

dotenv.config();

const token = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once('ready', () => {
    console.log('Bot está online!');
});


client.login(token);
