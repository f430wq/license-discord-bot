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




// Load commands

const commandsPath =
path.join(__dirname,"commands");


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


    }

}




// Load events

const eventsPath =
path.join(__dirname,"events");


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


    }

}





// Buttons

const buttonsPath =
path.join(__dirname,"buttons");


client.buttons =
new Collection();



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


    }

}





// Interactions

client.on(
"interactionCreate",

async interaction => {


    try{


        if(interaction.isChatInputCommand()){


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



        if(interaction.isButton()){


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

        console.error(error);

    }


});







client.login(
    process.env.DISCORD_TOKEN
);
