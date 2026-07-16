require("dotenv").config();


const {
    Client,
    Collection,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


const fs = require("fs");
const path = require("path");

const config = require("./config");



const client = new Client({

    intents:[

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers

    ]

});



client.commands = new Collection();

client.buttons = new Collection();



// ======================
// LOAD COMMANDS
// ======================


const commandsPath =
path.join(__dirname,"commands");



if(fs.existsSync(commandsPath)){


    for(const file of fs.readdirSync(commandsPath)){


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
// LOAD BUTTONS
// ======================


const buttonsPath =
path.join(__dirname,"buttons");



if(fs.existsSync(buttonsPath)){


    for(const file of fs.readdirSync(buttonsPath)){


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
// BOT READY
// ======================


client.once("ready", async ()=>{


    console.log(
        `✅ Logged as ${client.user.tag}`
    );



    const channel =
    await client.channels.fetch(

        config.panelChannelId

    )
    .catch(error=>{


        console.log(
            "❌ Channel fetch error:",
            error
        );


        return null;


    });




    if(!channel){


        console.log(
            "❌ Panel channel not found"
        );


        return;


    }





    const embed =
    new EmbedBuilder()

    .setTitle(
        "🔐 License Panel"
    )

    .setDescription(

        "Choose an option below."

    )

    .setColor(
        0x5865F2
    );





    const row =
    new ActionRowBuilder()

    .addComponents(


        new ButtonBuilder()

        .setCustomId(
            "redeem_key"
        )

        .setLabel(
            "Redeem Key"
        )

        .setEmoji(
            "🔑"
        )

        .setStyle(
            ButtonStyle.Primary
        ),



        new ButtonBuilder()

        .setCustomId(
            "get_script"
        )

        .setLabel(
            "Get Script"
        )

        .setEmoji(
            "📜"
        )

        .setStyle(
            ButtonStyle.Success
        ),



        new ButtonBuilder()

        .setCustomId(
            "get_role"
        )

        .setLabel(
            "Get Role"
        )

        .setEmoji(
            "🎖️"
        )

        .setStyle(
            ButtonStyle.Secondary
        ),



        new ButtonBuilder()

        .setCustomId(
            "reset_hwid"
        )

        .setLabel(
            "Reset HWID"
        )

        .setEmoji(
            "🔄"
        )

        .setStyle(
            ButtonStyle.Danger
        )


    );




    await channel.send({

        embeds:[

            embed

        ],

        components:[

            row

        ]

    })
    .then(()=>{


        console.log(
            "✅ Panel sent"
        );


    })
    .catch(error=>{


        console.log(
            "❌ Panel send error:",
            error
        );


    });



});






// ======================
// INTERACTIONS
// ======================


client.on(

"interactionCreate",

async interaction=>{


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



        if(!interaction.replied){


            await interaction.reply({

                content:
                "❌ Error",

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
