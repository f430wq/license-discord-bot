require("dotenv").config();

const {
    Client,
    Collection,
    GatewayIntentBits
} = require("discord.js");

const fs = require("fs");
const path = require("path");



const client = new Client({

    intents:[

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers

    ]

});




client.commands = new Collection();

client.buttons = new Collection();




// ======================
// COMMANDS LOADER
// ======================


const commandsPath =
path.join(__dirname,"commands");


if(fs.existsSync(commandsPath)){


    for(
        const file of fs.readdirSync(commandsPath)
    ){


        if(file.endsWith(".js")){


            const command =
            require(`./commands/${file}`);



            client.commands.set(

                command.data.name,

                command

            );


            console.log(
                `✅ Command loaded: ${command.data.name}`
            );


        }


    }


}





// ======================
// EVENTS LOADER
// ======================


const eventsPath =
path.join(__dirname,"events");



if(fs.existsSync(eventsPath)){


    for(
        const file of fs.readdirSync(eventsPath)
    ){


        if(file.endsWith(".js")){


            const event =
            require(`./events/${file}`);



            client.on(

                event.name,

                (...args)=>

                event.execute(
                    ...args
                )

            );


            console.log(
                `✅ Event loaded: ${event.name}`
            );


        }


    }


}





// ======================
// BUTTON LOADER
// ======================


const buttonsPath =
path.join(__dirname,"buttons");



if(fs.existsSync(buttonsPath)){


    for(
        const file of fs.readdirSync(buttonsPath)
    ){


        if(file.endsWith(".js")){


            const button =
            require(`./buttons/${file}`);



            client.buttons.set(

                button.id,

                button

            );


            console.log(
                `✅ Button loaded: ${button.id}`
            );


        }


    }


}






// ======================
// INTERACTIONS
// ======================


client.on(

"interactionCreate",

async interaction => {


    try{


        // Slash commands

        if(
            interaction.isChatInputCommand()
        ){


            const command =
            client.commands.get(

                interaction.commandName

            );



            if(command){

                await command.execute(
                    interaction
                );

            }


        }




        // Buttons

        if(
            interaction.isButton()
        ){


            const button =
            client.buttons.get(

                interaction.customId

            );



            if(button){

                await button.execute(
                    interaction
                );

            }


        }




    }


    catch(error){


        console.error(
            error
        );


        if(!interaction.replied){


            await interaction.reply({

                content:
                "❌ Internal error.",

                ephemeral:true

            });


        }


    }



});






// ======================
// LOGIN
// ======================


client.login(

    process.env.DISCORD_TOKEN

);
