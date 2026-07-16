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



        console.log(
            "Searching panel channel..."
        );



        const channel =
        await client.channels.fetch(
            config.panelChannelId
        )
        .catch(err => {


            console.log(
                "❌ Channel fetch error:"
            );


            console.log(err);


            return null;


        });




        if(!channel){


            console.log(
                "❌ Panel channel not found"
            );


            return;

        }




        console.log(
            `✅ Channel found: ${channel.name}`
        );





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

        })
        .then(()=>{


            console.log(
                "✅ Panel sent successfully"
            );


        })
        .catch(error=>{


            console.log(
                "❌ Send error:"
            );


            console.log(error);


        });



    }


};
