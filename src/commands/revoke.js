const {
    SlashCommandBuilder
} = require("discord.js");

const axios = require("axios");

const config = require("../config");
const checkAdmin = require("../utils/checkAdmin");


module.exports = {


    data:

    new SlashCommandBuilder()

    .setName("revoke")

    .setDescription("Revoke a license")

    .addStringOption(option =>

        option

        .setName("key")

        .setDescription("License key")

        .setRequired(true)

    ),




    async execute(interaction){


        if(!checkAdmin(interaction)){


            return interaction.reply({

                content:"❌ No permission.",

                ephemeral:true

            });

        }




        const key =
        interaction.options.getString("key");




        try{


            const response =
            await axios.post(

                `${config.apiUrl}/admin/revoke`,

                {

                    key:key

                },

                {

                    headers:{

                        "x-api-secret":
                        config.apiSecret

                    }

                }

            );




            await interaction.reply({

                content:
                response.data.success

                ? `✅ Revoked \`${key}\``

                : `❌ ${response.data.message}`,

                ephemeral:true

            });



        }

        catch(error){


            console.log(error);


            await interaction.reply({

                content:"❌ API error.",

                ephemeral:true

            });


        }


    }


};
