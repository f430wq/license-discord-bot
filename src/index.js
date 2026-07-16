const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

require("dotenv").config();

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
client.modals = new Collection();



// Commands

const commandsPath =
path.join(__dirname,"commands");


if(fs.existsSync(commandsPath)){

    for(const file of fs.readdirSync(commandsPath)
    .filter(f=>f.endsWith(".js"))){


        const command =
        require(`./commands/${file}`);


        client.commands.set(
            command.name,
            command
        );

    }

}




// Buttons

const buttonsPath =
path.join(__dirname,"buttons");


if(fs.existsSync(buttonsPath)){


    for(const file of fs.readdirSync(buttonsPath)
    .filter(f=>f.endsWith(".js"))){


        const button =
        require(`./buttons/${file}`);


        client.buttons.set(
            button.id,
            button
        );


    }

}





// Modals

const modalsPath =
path.join(__dirname,"modals");


if(fs.existsSync(modalsPath)){


    for(const file of fs.readdirSync(modalsPath)
    .filter(f=>f.endsWith(".js"))){


        const modal =
        require(`./modals/${file}`);


        client.modals.set(
            modal.id,
            modal
        );


    }

}




// Events

client.once(
"ready",
async ()=>{


    console.log(
        `✅ ${client.user.tag} online`
    );


});





// Interactions

client.on(
"interactionCreate",
async interaction=>{


    try {


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




        if(interaction.isModalSubmit()){


            const modal =
            client.modals.get(
                interaction.customId
            );


            if(modal){

                await modal.execute(
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
