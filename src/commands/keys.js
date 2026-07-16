const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


const axios = require("axios");

const config = require("../config");
const checkAdmin = require("../utils/checkAdmin");



module.exports = {


    data:

    new SlashCommandBuilder()

    .setName("keys")

    .setDescription("List licenses"),





    async execute(interaction){


        if(!checkAdmin(interaction)){


            return interaction.reply({

                content:"❌ No permission.",

                ephemeral:true

            });

        }





        try{


            const response =
            await axios.get(

                `${config.apiUrl}/admin/licenses`,

                {

                    headers:{

                        "x-api-secret":
                        config.apiSecret

                    }

                }

            );




            const licenses =
            response.data.licenses;




            if(!licenses.length){


                return interaction.reply({

                    content:
                    "No licenses found.",

                    ephemeral:true

                });

            }





            let text = "";



            for(
                const license of licenses.slice(0,10)
            ){


                text +=

                `🔑 ${license.key}\n`+

                `📌 ${license.status}\n`+

                `🎟️ ${license.type}\n`+

                `👤 ${license.discord_id || "None"}\n\n`;


            }




            const embed =
            new EmbedBuilder()

            .setTitle(
                "🔐 Licenses"
            )

            .setDescription(
                text
            )

            .setColor(
                0x5865F2
            );




            await interaction.reply({

                embeds:[
                    embed
                ],

                ephemeral:true

            });



        }

        catch(error){


            console.log(error);


            await interaction.reply({

                content:
                "❌ API error.",

                ephemeral:true

            });


        }


    }


};
