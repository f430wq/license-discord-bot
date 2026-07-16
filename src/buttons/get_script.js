const axios = require("axios");

const config = require("../config");


module.exports = {

    id: "get_script",



    async execute(interaction) {


        try {


            // Vérifier la licence utilisateur

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
                    "❌ You don't have a license.",

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
                    "❌ Your license has been revoked.",

                    ephemeral:true

                });


            }





            // Récupérer le script

            const scriptResponse =
            await axios.post(

                `${config.apiUrl}/script/get`,

                {

                    key:
                    license.key

                }

            );





            if(!scriptResponse.data.success){


                return interaction.reply({

                    content:
                    "❌ Script unavailable.",

                    ephemeral:true

                });


            }





            const script =
            scriptResponse.data.script;




            // Envoyer en DM

            try {


                await interaction.user.send({

                    content:

                    "📜 **Your Roblox Script**\n\n" +

                    "```lua\n" +

                    script +

                    "\n```"

                });



                await interaction.reply({

                    content:
                    "✅ Script sent in your DM.",

                    ephemeral:true

                });



            }

            catch{


                await interaction.reply({

                    content:
                    "❌ I can't DM you. Enable private messages.",

                    ephemeral:true

                });


            }





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
