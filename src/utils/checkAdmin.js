const config = require("../config");


module.exports = function checkAdmin(interaction) {


    if(!interaction.guild){

        return false;

    }



    if(!interaction.member){

        return false;

    }



    return interaction.member.roles.cache.has(

        config.adminRoleId

    );


};
