const axios = require("axios");

const config = require("../config");


module.exports = {

    id:"reset_hwid",



    async execute(interaction){


        try{


            // Trouver la licence utilisateur

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





            const license =
            licenseResponse.data.license;




            if(
                license.status === "revoked"
            ){


                return interaction.reply({

                    content:
                    "❌ Your license is revoked.",

                    ephemeral:true

                });


            }





            // Reset HWID

            const response =
            await axios.post(

                `${config.apiUrl}/hwid/reset`,

                {

                    key:
                    license.key

                }

            );





            if(!response.data.success){


                return interaction.reply({

                    content:
                    `❌ ${response.data.message || "Reset failed."}`,

                    ephemeral:true

                });


            }





            await interaction.reply({

                content:
                "✅ Your HWID has been reset successfully.",

                ephemeral:true

            });




        }


        catch(error){


            console.error(error);



            await interaction.reply({

                content:
                "❌ API error while resetting HWID.",

                ephemeral:true

            });


        }



    }


};
