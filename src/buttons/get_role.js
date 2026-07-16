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




            const role =
            interaction.guild.roles.cache.get(
                config.licenseRoleId
            );



            if(!role){


                return interaction.reply({

                    content:
                    "❌ License role not found.",

                    ephemeral:true

                });


            }




            if(
                interaction.member.roles.cache.has(
                    config.licenseRoleId
                )
            ){


                return interaction.reply({

                    content:
                    "✅ You already have the license role.",

                    ephemeral:true

                });


            }





            await interaction.member.roles.add(
                role
            );





            await interaction.reply({

                content:
                "🎖️ License role added successfully!",

                ephemeral:true

            });



        }


        catch(error){


            console.error(error);


            await interaction.reply({

                content:
                "❌ Error while giving role.",

                ephemeral:true

            });


        }



    }

};
