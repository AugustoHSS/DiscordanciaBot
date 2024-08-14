const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config();

const token = process.env.TOKEN;
const audioFilePath = path.join(__dirname, 'hello.mp3');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once('ready', () => {
    console.log('Bot está online!');
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (!oldState.channelId && newState.channelId) {
        const connection = joinVoiceChannel({
            channelId: newState.channelId,
            guildId: newState.guild.id,
            adapterCreator: newState.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();
        const resource = createAudioResource(audioFilePath);

        player.play(resource);

        connection.on(VoiceConnectionStatus.Ready, () => {
            connection.subscribe(player);
        });

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });
    }

});



client.login(token);
