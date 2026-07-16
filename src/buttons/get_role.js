const axios = require("axios");

const config = require("../config");


module.exports = {

    id: "get_role",


    async execute(interaction) {


        try {


            const response =
            await axios.post(

                `${config.apiUrl}/licenses/user`,

                {

                    discord_id:
                    interaction.user.id

                }

            );



            if(!response.data.success){


                return interaction.reply({

                    content:
                    "❌ You don't have a redeemed license.",

                    ephemeral:true

                });


            }




            const roleId =
            "1527345778610405496";



            const role =
            interaction.guild.roles.cache.get(
                roleId
            );



            if(!role){


                return interaction.reply({

                    content:
                    "❌ License role not found.",

                    ephemeral:true

                });


            }





            await interaction.member.roles.add(
                role
            );




            await interaction.reply({

                content:
                "✅ License role added!",

                ephemeral:true

            });



        }

        catch(error){


            console.error(error);


            await interaction.reply({

                content:
                "❌ Error while checking license.",

                ephemeral:true

            });


        }


    }

};
