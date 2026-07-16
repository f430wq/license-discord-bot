const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");


module.exports = {


    name:"ready",



    async execute(client){


        console.log(
            `✅ Logged as ${client.user.tag}`
        );



        const channel =
        client.channels.cache.get(
            config.panelChannelId
        );



        if(!channel){

            console.log(
                "❌ Panel channel not found"
            );

            return;

        }




        const embed =
        new EmbedBuilder()

        .setTitle(
            config.panel.title
        )

        .setDescription(
            config.panel.description
        )

        .setColor(
            config.panel.color
        )

        .setFooter({

            text:"License System"

        });





        const row =
        new ActionRowBuilder()

        .addComponents(


            new ButtonBuilder()

            .setCustomId(
                config.buttons.redeem
            )

            .setLabel("Redeem Key")

            .setEmoji("🔑")

            .setStyle(
                ButtonStyle.Primary
            ),



            new ButtonBuilder()

            .setCustomId(
                config.buttons.script
            )

            .setLabel("Get Script")

            .setEmoji("📜")

            .setStyle(
                ButtonStyle.Success
            ),



            new ButtonBuilder()

            .setCustomId(
                config.buttons.role
            )

            .setLabel("Get Role")

            .setEmoji("🎖️")

            .setStyle(
                ButtonStyle.Secondary
            ),



            new ButtonBuilder()

            .setCustomId(
                config.buttons.reset
            )

            .setLabel("Reset HWID")

            .setEmoji("🔄")

            .setStyle(
                ButtonStyle.Danger
            )


        );





        await channel.send({

            embeds:[
                embed
            ],

            components:[
                row
            ]

        });



        console.log(
            "✅ Panel sent"
        );


    }


};
