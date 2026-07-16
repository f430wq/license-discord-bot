module.exports = {

    name:"ready",


    execute(client){


        console.log(
            `✅ Logged as ${client.user.tag}`
        );


        console.log(
            `📡 Servers: ${client.guilds.cache.size}`
        );


    }

};
