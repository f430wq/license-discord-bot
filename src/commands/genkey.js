const axios = require("axios");

const config = require("../config");
const checkAdmin = require("../utils/checkAdmin");



module.exports = {


    name:"genkey",



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

                `✅ License generated:\n\`\`\`${response.data.license.key}\`\`\``,

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
