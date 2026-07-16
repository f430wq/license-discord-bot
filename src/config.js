require("dotenv").config();


module.exports = {

    // Discord

    adminRoleId: process.env.ADMIN_ROLE_ID,


    // API

    apiUrl: process.env.API_URL,

    apiSecret: process.env.API_SECRET,


    // Panel

    panel: {

        title: "🔐 License Panel",

        description:
        "Use the buttons below to manage your license.",


        color: 0x5865F2

    },


    // Buttons

    buttons: {

        redeem: "redeem_key",

        script: "get_script",

        role: "get_role",

        reset: "reset_hwid"

    }


};
