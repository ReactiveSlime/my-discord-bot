const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const i18n = require("i18n");
module.exports = {
   name: "cryptotest",
   aliases: ["test"],
   cooldowns: 3000,
   description: "TEST COMMAND (ONLY DEVELOPERS HAS ACCESS)",
   usage: "",
   toggleOff: false,
   developersOnly: true,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   description: "TEST COMMAND (ONLY DEVELOPERS HAS ACCESS)",
   
   
   run: async (client, message, args) => {

    fetch('https://api.coingecko.com/api/v3/simple/price?ids=dogecoin,dogecash,zenzo,flits,pivx,hive_dollar,tron,hive,blurt,steem,bitcoin,litecoin,ethereum,ripple,bitcoin-cash,monero,stellar,eos,cardano,iota,dash,neo,nem,binance-usd&vs_currencies=usd,gbp,eur')
    .then(res => res.json())
    .then(async json => {


        var arraydata = [{
            "curr": "USD",
            "image": "https://www.pngitem.com/pimgs/m/55-557586_gold-dollar-sign-png-gold-dollar-sign-clipart.png",
            "bitcoin": json.bitcoin.usd,
            "ethereum": json.ethereum.usd,
            "ripple": json.ripple.usd,
            "bitcoincash": json['bitcoin-cash'].usd,
            "litecoin": json.litecoin.usd,
            "eos": json.eos.usd,
            "stellar": json.stellar.usd,
            "cardano": json.cardano.usd,
            "monero": json.monero.usd,
            "iota": json.iota.usd,
            "tron": json.tron.usd,
            "dash": json.dash.usd,
            "neo": json.neo.usd,
            "nem": json.nem.usd,
            "steem": json.steem.usd,
            "hive": json.hive.usd,
            "hivedollar": json['hive_dollar'].usd,
            "blurt": json.blurt.usd,
            "zenzo": json.zenzo.usd,
            "flits": json.flits.usd,
            "dogecash": json.dogecash.usd,
            "pivx": json.pivx.usd,
            "dogecoin": json.dogecoin.usd,
            "binanceusd": json['binance-usd'].usd
            },
            {
            "curr": "GBP",
            "image": "https://www.pngitem.com/pimgs/m/5-58865_gold-pound-sign-transparent-image-pound-sign-no.png",
            "bitcoin": json.bitcoin.gbp,
            "ethereum": json.ethereum.gbp,
            "ripple": json.ripple.gbp,
            "bitcoincash": json['bitcoin-cash'].gbp,
            "litecoin": json.litecoin.gbp,
            "eos": json.eos.gbp,
            "stellar": json.stellar.gbp,
            "cardano": json.cardano.gbp,
            "monero": json.monero.gbp,
            "iota": json.iota.gbp,
            "tron": json.tron.gbp,
            "dash": json.dash.gbp,
            "neo": json.neo.gbp,
            "nem": json.nem.gbp,
            "steem": json.steem.gbp,
            "hive": json.hive.gbp,
            "hivedollar": json['hive_dollar'].gbp,
            "blurt": json.blurt.gbp,
            "zenzo": json.zenzo.gbp,
            "flits": json.flits.gbp,
            "dogecash": json.dogecash.gbp,
            "pivx": json.pivx.gbp,
            "dogecoin": json.dogecoin.gbp,
            "binanceusd": json['binance-usd'].gbp
            },
            {
            "curr": "EUR",
            "image": "https://www.freeiconspng.com/thumbs/euro-icon-png/euro-icon-24.png",
            "bitcoin": json.bitcoin.eur,
            "ethereum": json.ethereum.eur,
            "ripple": json.ripple.eur,
            "bitcoincash": json['bitcoin-cash'].eur,
            "litecoin": json.litecoin.eur,
            "eos": json.eos.eur,
            "stellar": json.stellar.eur,
            "cardano": json.cardano.eur,
            "monero": json.monero.eur,
            "iota": json.iota.eur,
            "tron": json.tron.eur,
            "dash": json.dash.eur,
            "neo": json.neo.eur,
            "nem": json.nem.eur,
            "steem": json.steem.eur,
            "hive": json.hive.eur,
            "hivedollar": json['hive_dollar'].eur,
            "blurt": json.blurt.eur,
            "zenzo": json.zenzo.eur,
            "flits": json.flits.eur,
            "dogecash": json.dogecash.eur,
            "pivx": json.pivx.eur,
            "dogecoin": json.dogecoin.eur,
            "binanceusd": json['binance-usd'].eur
            }];

        let currentPage = 0;
        const embeds = generateQueueEmbed(message, arraydata);

        const queueEmbed = await message.channel.send({
			content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
            embeds: [embeds[currentPage]]
		});

        try {
            await queueEmbed.react("⬅️");
            await queueEmbed.react("⏹");
            await queueEmbed.react("➡️");
        } catch (error) {
            console.error(error);
            message.channel.send(error.message).catch(console.error);
        }

        const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
        const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

        collector.on("collect", async(reaction, user) => {
            try {
                if (reaction.emoji.name === "➡️") {
                    if (currentPage < embeds.length - 1) {
                        currentPage++;
                        queueEmbed.edit({
							content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
							embeds: [embeds[currentPage]]
						});
                    }
                } else if (reaction.emoji.name === "⬅️") {
                    if (currentPage !== 0) {
                        --currentPage;
                        queueEmbed.edit({
							content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
							embeds: [embeds[currentPage]]
						});
                    }
                } else {
                    collector.stop();
                    reaction.message.reactions.removeAll();
                }
                await reaction.users.remove(message.author.id);
            } catch (error) {
                console.error(error);
                return message.channel.send(error.message).catch(console.error);
            }
        });
    })

   },
};

function generateQueueEmbed(message, queue) {
    let embeds = [];
    let k = 10;

    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;

        current.map((json) => {


            const embed = new MessageEmbed()
            .setTitle(`Crypto Prices (${json.curr})`)
            .setThumbnail(`${json.image}`)
            .setColor("#0099ff")
            .addField("Bitcoin", `${json.bitcoin}`, true)
            .addField("Ethereum", `${json.ethereum}`, true)
            .addField("Ripple", `${json.ripple}`, true)
            .addField("Bitcoin Cash", `${json.bitcoincash}`, true)
            .addField("Litecoin", `${json.litecoin}`, true)
            .addField("EOS", `${json.eos}`, true)
            .addField("Stellar", `${json.stellar}`, true)
            .addField("Cardano", `${json.cardano}`, true)
            .addField("Monero", `${json.monero}`, true)
            .addField("IOTA", `${json.iota}`, true)
            .addField("TRON", `${json.tron}`, true)
            .addField("Dash", `${json.dash}`, true)
            .addField("NEO", `${json.neo}`, true)
            .addField("NEM", `${json.nem}`, true)
            .addField("STEEM", `${json.steem}`, true)
            .addField("HIVE", `${json.hive}`, true)
            .addField("HBD", `${json.hivedollar}`, true)
            .addField("BLURT", `${json.blurt}`, true)
            .addField("ZNZ", `${json.zenzo}`, true)
            .addField("FLS", `${json.flits}`, true)
            .addField("DOGEC", `${json.dogecash}`, true)
            .addField("PIVX", `${json.pivx}`, true)
            .addField("DOGE", `${json.dogecoin}`, true)
            .addField("BUSD", `${json.binanceusd}`, true)
            .setTimestamp()
            .setFooter({ text: 'API BEEN PULLED FROM COINGEKO'});
            embeds.push(embed);
        });
    }

    return embeds;
}
