const axios = require("axios");

const config = require("../config");
const checkAdmin = require("../utils/checkAdmin");



module.exports = {


    name:"deletekey",



    async execute(interaction){


        if(!checkAdmin(interaction)){


            return interaction.reply({

                content:
                "❌ You don't have permission.",

                ephemeral:true

            });

        }





        const key =
        interaction.options.getString(
            "key"
        );




        if(!key){


            return interaction.reply({

                content:
                "❌ Missing license key.",

                ephemeral:true

            });

        }





        try{


            const response =
            await axios.delete(

                `${config.apiUrl}/admin/delete`,

                {

                    data:{

                        key:key

                    },

                    headers:{

                        "x-api-secret":
                        config.apiSecret

                    }

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
                `🗑️ License deleted:\n\`${key}\``,

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
