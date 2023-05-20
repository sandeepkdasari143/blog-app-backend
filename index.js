import mongoose from "mongoose";
import app from "./app.js";

( async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/blogs");
        console.log("DB CONNECTED SUCCESSFULLY :)");

        const onListening = () => {
            console.log("Listening on PORT :: 369");
        }

        app.listen(369, onListening);

    } catch (error) {
        console.error("DB Connection Error: ", error.message);
        throw error;
    }
})()