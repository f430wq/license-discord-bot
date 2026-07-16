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




// Events

const eventsPath =
path.join(__dirname,"events");


if(fs.existsSync(eventsPath)){


    for(const file of fs.readdirSync(eventsPath)
        .filter(f=>f.endsWith(".js"))){


        const event =
        require(`./events/${file}`);


        client.once(
            event.name,
            (...args)=>
            event.execute(...args, client)
        );


    }


}





// Interaction

client.on(
"interactionCreate",
async interaction=>{


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


});





client.login(
    process.env.DISCORD_TOKEN
);
