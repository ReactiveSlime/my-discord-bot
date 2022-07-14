// Currenly on hold
// https://www.youtube.com/watch?v=N7xn5zeJ4D4

module.exports = {
    name: "download",
    description: "Gets the World Download",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
const axios = require('axios');
var botconfig = require('../config.json');
const fs = require('fs');


module.exports.run = async (client, message, args) => {
    message.channel.send("Getting World Download...");


    /*
    download from servertap with random name
    hold file
    upload file
    pharse json response + delete local file
    give dl link to user
    */

    //use a read stream to download a file from a url then to upload the file to another url
    var date = new Date();
    var timestamp = date.getTime();

    axios.get(`${botconfig.url}` + `/v1/worlds/download`, {
        responseType: 'stream',
        headers: { "Content-Type": "application/zip", "key": `${botconfig.key}` }
    })
        .then((res) => {
            //download zip file from res localy to /temp/timestamp.zip

            var file = fs.createWriteStream(`./temp/${timestamp}.zip`);
            res.data.pipe(file);
            file.on('finish', function () {
                file.close(); // close() is async, call callback after close completes.
                //upload zip file to dl.reactivesli.me/upload with http headers



            });
        })
        //upload file to dl.reactivesli.me/upload with http headers
        .then(() => {
            axios.post(`https://dl.reactivesli.me/upload/`, {
                headers: { "accepts": "application/zip", "Linx-Expiry": 86400, "Linx-Randomize": "yes" },
                data: fs.createReadStream(`./temp/${timestamp}.zip`)
            })
                .then((res) => {
                    //parse json response
                    var json = res.data;
                    var dlLink = json.url;
                    //delete local file
                    fs.unlink(`./temp/${timestamp}.zip`, (err) => {
                        if (err) throw err;
                        //send dl link to user
                        message.channel.send(`Download Link: ${dlLink}`);
                    }
                    );
                })
                .catch((err) => {
                    console.log(err);
                }
                );
        }
        )
        .catch((err) => {
            console.log(err);
        }
        );
}





/*
//upload the stream
var uploadUrl = "https://dl.reactivesli.me/upload/";
var uploadFile = fs.createReadStream(filePath);
var upload = axios.post(uploadUrl, uploadFile, {
headers: {
'Content-Type': 'application/zip',
"Linx-Expiry": 86400,
"Linx-Randomize": "yes"
}
});
upload.then(function(response) {
console.log(response.data);
var dlUrl = "https://dl.reactivesli.me/" + response.data;
message.channel.send("World Download: " + dlUrl);
fs.unlink(file, (err) => {
if (err) throw err;
console.log('successfully deleted');
}
);
}
).catch(function(error) {
console.log(error);
}
);
*/



module.exports.help = {
    name: "download",
    description: "Gets the World Download",
}
