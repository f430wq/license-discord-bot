module.exports = {

    name:"error",


    execute(error){

        console.error(
            "Discord Client Error:"
        );

        console.error(error);

    }

};
