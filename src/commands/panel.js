const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");


module.exports = {


    data:

    new SlashCommandBuilder()

    .setName("panel")

    .setDescription("Send the license panel"),




    async execute(interaction){


        const embed = new EmbedBuilder()

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

            .setLabel(
                "Redeem Key"
            )

            .setEmoji("🔑")

            .setStyle(
                ButtonStyle.Primary
            ),



            new ButtonBuilder()

            .setCustomId(
                config.buttons.script
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
                config.buttons.role
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
                config.buttons.reset
            )

            .setLabel(
                "Reset HWID"
            )

            .setEmoji("🔄")

            .setStyle(
                ButtonStyle.Danger
            )


        );





        await interaction.reply({

            embeds:[
                embed
            ],

            components:[
                row
            ]

        });


    }


};
