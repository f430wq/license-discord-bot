module.exports = function checkAdmin(interaction) {


    const adminRole =
    "1526978281725890581";


    return interaction.member.roles.cache.has(
        adminRole
    );


};
