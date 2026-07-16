const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");


module.exports = {

    name: "ready",


    async execute(client) {


        console.log(
            `✅ Logged as ${client.user.tag}`
        );



        const commands = [];

        const commandsPath = path.join(
            __dirname,
            "../commands"
        );



        const commandFiles = fs.readdirSync(commandsPath)
            .filter(file => file.endsWith(".js"));



        for(const file of commandFiles){


            const command = require(
                `../commands/${file}`
            );



            if(command.data){

                commands.push(
                    command.data.toJSON()
                );

            }

            else {


                commands.push(

                    new SlashCommandBuilder()

                    .setName(
                        command.name
                    )

                    .setDescription(
                        `Execute ${command.name}`
                    )

                    .toJSON()

                );

            }


        }





        const rest = new REST({

            version:"10"

        }).setToken(
            process.env.DISCORD_TOKEN
        );




        try {


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
                "✅ Slash commands registered"
            );


        } catch(error){

            console.error(
                error
            );

        }


    }

};
