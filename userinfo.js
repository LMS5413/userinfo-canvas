const Discord = require('discord.js')
const Canvas = require('canvas')
const moment = require('moment')

exports.run = async (client, message) => {
    moment.locale('pt-br')
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');


        let fontSize = 89;

        do {

            ctx.font = `${fontSize -= 10}px sans-serif`;

        } while (ctx.measureText(text).width > canvas.width - 300);


        return ctx.font;
    };

    const membro = message.mentions.users.first() || message.author
    const data = moment(membro.createdAt).format('LL');
    const canvas = Canvas.createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./comandos/fotos/fundo.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.font = '60px sans-serif';
    ctx.font = applyText(canvas, membro.displayName);
    ctx.font = applyText(canvas, membro.id);
    ctx.fillStyle = '#325AFF';
    ctx.fillText(membro.username, canvas.width / 2.1, canvas.height / 2.7);
    ctx.fillStyle = '#FF3232';
    ctx.fillText(membro.id, canvas.width / 2.8, canvas.height / 1.45);
    ctx.fillStyle = '#C432FF';
    ctx.fillText(data, canvas.width / 2.99, canvas.height / 1.04);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(290, 330, 210, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();


    const avatar = await Canvas.loadImage(membro.displayAvatarURL({ format: 'png' }));

    ctx.drawImage(avatar, 75, 120, 480, 480);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'users.png');

    message.channel.send(`${message.author}`, attachment);

}
exports.help = {
    name: "userinfo"
}