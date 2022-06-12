const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "vrchatuploadimg",
    aliases: ["uploadchisvrcimg"],
    cooldowns: 3000,
    description: "Images of ChisVR VRchat Image (ONLY BOT OWNER ABLE DUMP IMAGES SERVER)",
    usage: "",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {

        async function uploadme(sec) {
            message.channel.send("IMPORTING CHISVR VRCHAT IMAGES (Give me Few Moments on cooldown 10 Sec Uploading)");
                message.channel.send({
                  files:[{
                      attachment: "https://apps.chisdealhd.co.uk/apps/gallery/images/VRChat_1920x1080_2020-09-13_14-10-38.778.png"
                  }]
                });
                await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://apps.chisdealhd.co.uk/apps/gallery/images/VRChat_1920x1080_2020-09-13_18-55-35.831.png"
                  }]
                });
                await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://apps.chisdealhd.co.uk/apps/gallery/images/VRChat_1920x1080_2020-09-15_16-39-00.300.png"
                  }]
                });
                await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://apps.chisdealhd.co.uk/apps/gallery/images/VRChat_1920x1080_2020-09-22_13-04-19.089_1.png"
                  }]
                });
                await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://apps.chisdealhd.co.uk/apps/gallery/images/VRChat_1920x1080_2020-11-14_08-29-21.051.png"
                  }]
                });
            await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://apps.chisdealhd.co.uk/apps/gallery/images/VRChat_1920x1080_2020-12-18_19-25-53.931.png"
                  }]
                });
            await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://apps.chisdealhd.co.uk/apps/gallery/images/VRChat_1920x1080_2021-11-17_20-38-01.759.png"
                  }]
                });
            await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://apps.chisdealhd.co.uk/apps/gallery/images/VRChat_1920x1080_2021-11-17_21-12-54.823.png"
                  }]
                });
            await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://cdn.discordapp.com/attachments/794229972490387496/957071618121801808/VRChat_1920x1080_2022-01-20_21-25-59.882.png"
                  }]
                });
            await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://cdn.discordapp.com/attachments/794229972490387496/957070929802977300/VRChat_1920x1080_2022-03-23_20-14-28.894.png"
                  }]
                });
            await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://cdn.discordapp.com/attachments/794229972490387496/957054144345161809/VRChat_1920x1080_2022-03-25_21-36-3.png"
                  }]
                });
            await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://cdn.discordapp.com/attachments/794229972490387496/939119497502158848/VRChat_1920x1080_2022-02-02_14-17-33.166.png"
                  }]
                });
                await sleep(sec);
                message.channel.send({
                  files:[{
                      attachment: "https://cdn.discordapp.com/attachments/794229972490387496/794233913097846814/VRChat_1920x1080_2020-12-18_19-25-53.png"
                  }]
                });
            await sleep(1000);
                message.channel.send("DONE IMPORTING CHISVR VRCHAT IMAGES :)");
            }
        
            function sleep(ms) {
              return new Promise((resolve) => {
                setTimeout(resolve, ms);
              });
            }
            
            if (message.author.id == "100463282099326976") {
        
                uploadme(10000);
                
            }

    }
}