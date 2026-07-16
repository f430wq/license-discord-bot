require("dotenv").config();


module.exports = {


    adminRoleId:
    process.env.ADMIN_ROLE_ID,


    licenseRoleId:
    process.env.LICENSE_ROLE_ID,


    panelChannelId:
    process.env.PANEL_CHANNEL_ID,



    apiUrl:
    process.env.API_URL,


    apiSecret:
    process.env.API_SECRET,



    panel: {

        title:
        "🔐 License Panel",

        description:
        "Use the buttons below to manage your license.",

        color:
        0x5865F2

    },



    buttons:{


        redeem:
        "redeem_key",


        script:
        "get_script",


        role:
        "get_role",


        reset:
        "reset_hwid"


    }



};
