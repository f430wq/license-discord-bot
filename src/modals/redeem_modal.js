const axios = require("axios");

const config = require("../config");


module.exports = {

    id: "redeem_modal",


    async execute(interaction) {


        const key =
        interaction.fields.getTextInputValue(
            "license_key"
        );


        try {


            const response =
            await axios.post(

                `${config.apiUrl}/licenses/redeem`,

                {

                    key:key,

                    discord_id:
                    interaction.user.id

                }

            );



            if(!response.data.success){


                return interaction.reply({

                    content:
                    `❌ ${response.data.message}`,

                    ephemeral:true

                });


            }




            await interaction.reply({

                content:
                "✅ Your license has been redeemed successfully!",

                ephemeral:true

            });



        }

        catch(error){


            console.error(error);


            await interaction.reply({

                content:
                "❌ API error. Please try again later.",

                ephemeral:true

            });


        }


    }

};
