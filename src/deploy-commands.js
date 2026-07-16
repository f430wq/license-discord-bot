const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");

require("dotenv").config();



const commands = [];



const commandsPath =
path.join(__dirname, "commands");



const commandFiles =
fs.readdirSync(commandsPath)
.filter(file => file.endsWith(".js"));





for(const file of commandFiles){


    const command =
    require(`./commands/${file}`);



    let slash;



    switch(command.name){


        case "panel":

            slash =
            new SlashCommandBuilder()

            .setName("panel")

            .setDescription(
                "Send the license panel"
            );

            break;




        case "genkey":

            slash =
            new SlashCommandBuilder()

            .setName("genkey")

            .setDescription(
                "Generate a license key"
            );

            break;




        case "keys":

            slash =
            new SlashCommandBuilder()

            .setName("keys")

            .setDescription(
                "List all licenses"
            );

            break;




        case "revoke":

            slash =
            new SlashCommandBuilder()

            .setName("revoke")

            .setDescription(
                "Revoke a license"
            )

            .addStringOption(option =>

                option
                .setName("key")
                .setDescription("License key")
                .setRequired(true)

            );

            break;




        case "deletekey":

            slash =
            new SlashCommandBuilder()

            .setName("deletekey")

            .setDescription(
                "Delete a license"
            )

            .addStringOption(option =>

                option
                .setName("key")
                .setDescription("License key")
                .setRequired(true)

            );

            break;


    }



    if(slash){

        commands.push(
            slash.toJSON()
        );

    }


}





const rest =
new REST({

    version:"10"

})
.setToken(
    process.env.DISCORD_TOKEN
);





(async()=>{


    try{


        console.log(
            "⏳ Deploying commands..."
        );



        await rest.put(

            Routes.applicationGuildCommands(

                process.env.CLIENT_ID,

                process.env.GUILD_ID

            ),


            {

                body:commands

            }

        );



        console.log(
            "✅ Commands deployed"
        );


    }


    catch(error){

        console.error(error);

    }


})();
