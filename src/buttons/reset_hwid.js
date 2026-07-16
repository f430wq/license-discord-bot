const axios = require("axios");

const config = require("../config");


module.exports = {

    id: "reset_hwid",


    async execute(interaction) {


        try {


            // Trouver la licence de l'utilisateur

            const licenseResponse =
            await axios.post(

                `${config.apiUrl}/licenses/user`,

                {
                    discord_id:
                    interaction.user.id
                }

            );



            if(!licenseResponse.data.success){


                return interaction.reply({

                    content:
                    "❌ You don't have a redeemed license.",

                    ephemeral:true

                });


            }



            const key =
            licenseResponse.data.license.key;




            // Reset HWID

            const reset =
            await axios.post(

                `${config.apiUrl}/hwid/reset`,

                {
                    key:key
                }

            );




            if(!reset.data.success){


                return interaction.reply({

                    content:
                    `❌ ${reset.data.message}`,

                    ephemeral:true

                });


            }





            await interaction.reply({

                content:
                "✅ Your HWID has been reset.",

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
