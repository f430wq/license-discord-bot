const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");


module.exports = {

    id: "redeem_key",


    async execute(interaction) {


        const modal = new ModalBuilder()

            .setCustomId(
                "redeem_modal"
            )

            .setTitle(
                "Redeem License Key"
            );



        const keyInput =
            new TextInputBuilder()

            .setCustomId(
                "license_key"
            )

            .setLabel(
                "License Key"
            )

            .setPlaceholder(
                "LIC-XXXX-XXXX"
            )

            .setStyle(
                TextInputStyle.Short
            )

            .setRequired(true);



        const row =
        new ActionRowBuilder()
        .addComponents(
            keyInput
        );



        modal.addComponents(
            row
        );



        await interaction.showModal(
            modal
        );


    }

};
