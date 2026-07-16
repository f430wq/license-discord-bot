const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

require("dotenv").config();

const fs = require("fs");
const path = require("path");



const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers

    ]

});



// Collections

client.commands = new Collection();

client.buttons = new Collection();

client.modals = new Collection();




// Charger les commandes

const commandsPath = path.join(__dirname, "commands");

if(fs.existsSync(commandsPath)){

    const commandFiles = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));


    for(const file of commandFiles){

        const command = require(
            `./commands/${file}`
        );


        client.commands.set(
            command.name,
            command
        );

    }

}




// Charger les boutons

const buttonsPath = path.join(__dirname, "buttons");


if(fs.existsSync(buttonsPath)){


    const buttonFiles = fs.readdirSync(buttonsPath)
        .filter(file => file.endsWith(".js"));



    for(const file of buttonFiles){


        const button = require(
            `./buttons/${file}`
        );


        client.buttons.set(
            button.id,
            button
        );


    }


}




// Charger les modals

const modalsPath = path.join(__dirname, "modals");


if(fs.existsSync(modalsPath)){


    const modalFiles = fs.readdirSync(modalsPath)
        .filter(file => file.endsWith(".js"));



    for(const file of modalFiles){


        const modal = require(
            `./modals/${file}`
        );


        client.modals.set(
            modal.id,
            modal
        );


    }


}





// Interaction Handler

client.on("interactionCreate", async interaction => {


    try {


        // Slash commands

        if(interaction.isChatInputCommand()){


            const command =
                client.commands.get(
                    interaction.commandName
                );


            if(command){

                await command.execute(interaction);

            }


        }




        // Buttons

        if(interaction.isButton()){


            const button =
                client.buttons.get(
                    interaction.customId
                );


            if(button){

                await button.execute(interaction);

            }


        }




        // Modals

        if(interaction.isModalSubmit()){


            const modal =
                client.modals.get(
                    interaction.customId
                );


            if(modal){

                await modal.execute(interaction);

            }


        }



    } catch(error){

        console.error(error);


        if(!interaction.replied){

            await interaction.reply({

                content:"❌ An error occurred.",
                ephemeral:true

            });

        }

    }


});





client.once("ready",()=>{


    console.log(
        `✅ Logged as ${client.user.tag}`
    );


});





client.login(
    process.env.DISCORD_TOKEN
);
