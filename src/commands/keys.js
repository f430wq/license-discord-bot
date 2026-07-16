const axios = require("axios");

const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");
const checkAdmin = require("../utils/checkAdmin");



module.exports = {


    name:"keys",



    async execute(interaction){


        if(!checkAdmin(interaction)){


            return interaction.reply({

                content:
                "❌ You don't have permission.",

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




            if(!response.data.success){


                return interaction.reply({

                    content:
                    "❌ Failed to fetch licenses.",

                    ephemeral:true

                });

            }





            const licenses =
            response.data.licenses;




            if(licenses.length === 0){


                return interaction.reply({

                    content:
                    "No licenses found.",

                    ephemeral:true

                });


            }





            let description = "";



            for(const license of licenses.slice(0,10)){


                description +=

                `🔑 \`${license.key}\`\n` +

                `📌 Status: **${license.status}**\n` +

                `🎟️ Type: **${license.type}**\n` +

                `👤 Discord: ${license.discord_id || "None"}\n\n`;


            }





            const embed =
            new EmbedBuilder()

            .setTitle(
                "🔐 License List"
            )

            .setDescription(
                description
            )

            .setColor(
                0x5865F2
            )

            .setFooter({

                text:
                `Showing ${Math.min(licenses.length,10)} licenses`

            });





            await interaction.reply({

                embeds:[
                    embed
                ],

                ephemeral:true

            });



        }


        catch(error){


            console.error(error);


            await interaction.reply({

                content:
                "❌ API error.",

                ephemeral:true

            });


        }



    }


};
