const {
    SlashCommandBuilder
} = require("discord.js");

const axios = require("axios");

const config = require("../config");
const checkAdmin = require("../utils/checkAdmin");


module.exports = {


    data:

    new SlashCommandBuilder()

    .setName("genkey")

    .setDescription("Generate a license key"),




    async execute(interaction){


        if(!checkAdmin(interaction)){


            return interaction.reply({

                content:"❌ No permission.",

                ephemeral:true

            });

        }



        try{


            const response =
            await axios.post(

                `${config.apiUrl}/licenses/generate`,

                {

                    type:"lifetime",

                    created_by:
                    interaction.user.id

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

                `✅ Generated:\n\`${response.data.license.key}\``,

                ephemeral:true

            });



        }

        catch(error){


            console.log(error);


            await interaction.reply({

                content:"❌ API Error",

                ephemeral:true

            });


        }


    }


};
