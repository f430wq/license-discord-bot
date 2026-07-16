const axios = require("axios");

const config = require("../config");


module.exports = {

    id: "get_script",


    async execute(interaction) {


        try {


            // Vérifier si l'utilisateur possède une licence

            const check =
            await axios.post(

                `${config.apiUrl}/licenses/user`,

                {

                    discord_id:
                    interaction.user.id

                }

            );



            if(!check.data.success){


                return interaction.reply({

                    content:
                    "❌ You don't have a valid license.",

                    ephemeral:true

                });


            }




            // Demander le script à l'API

            const script =
            await axios.post(

                `${config.apiUrl}/script/get`,

                {

                    key:
                    check.data.license.key

                }

            );




            if(!script.data.success){


                return interaction.reply({

                    content:
                    `❌ ${script.data.message}`,

                    ephemeral:true

                });


            }




            await interaction.reply({

                content:

                "✅ Your script:\n\n```lua\n" +
                script.data.script +
                "\n```",

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
