import mongoose from "mongoose";
import { secrets } from "./src/config/secrets.js";
import app from "./src/app.js";

( async () => {
    try {
        await mongoose.connect(secrets.MONGO_URL);
        console.log("DB CONNECTED SUCCESSFULLY :)");

        const onListening = () => {
            console.log(`Listening on PORT :: ${secrets.PORT}`);
        }

        app.listen(secrets.PORT, onListening);

    } catch (error) {
        console.error("DB Connection Error: ", error.message);
        throw error;
    }
})()