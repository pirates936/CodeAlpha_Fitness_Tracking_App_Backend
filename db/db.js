const mongoose = require("mongoose");

const connection = mongoose.createConnection("mongodb://localhost:27017/fitness-app-vishu").on(
    "open", () => {
        console.log("connected to database");
    }
).on("error", (eroor) => {
    console.log("Error connecting to the database:${error}");
});

module.exports = connection;