console.log("READY FILE LOADED");


const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


const config = require("../config");



module.exports = {


    name:"ready",

    once:true,



    async execute(client){


        console.log(
            `✅ Logged as ${client.user.tag}`
        );



        const channel =

        await client.channels.fetch(

            config.panelChannelId

        ).catch(error=>{


            console.log(
                "Channel error:",
                error
            );


            return null;


        });




        if(!channel){

            console.log(
                "❌ Panel channel not found"
            );

            return;

        }





        const embed =
        new EmbedBuilder()

        .setTitle(
            "🔐 License Panel"
        )

        .setDescription(

            "Use the buttons below."

        )

        .setColor(
            0x5865F2
        );





        const row =
        new ActionRowBuilder()

        .addComponents(


            new ButtonBuilder()

            .setCustomId(
                "redeem_key"
            )

            .setLabel(
                "Redeem Key"
            )

            .setEmoji("🔑")

            .setStyle(
                ButtonStyle.Primary
            ),



            new ButtonBuilder()

            .setCustomId(
                "get_script"
            )

            .setLabel(
                "Get Script"
            )

            .setEmoji("📜")

            .setStyle(
                ButtonStyle.Success
            ),



            new ButtonBuilder()

            .setCustomId(
                "get_role"
            )

            .setLabel(
                "Get Role"
            )

            .setEmoji("🎖️")

            .setStyle(
                ButtonStyle.Secondary
            ),



            new ButtonBuilder()

            .setCustomId(
                "reset_hwid"
            )

            .setLabel(
                "Reset HWID"
            )

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
