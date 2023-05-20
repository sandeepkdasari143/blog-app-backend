import mongoose from "mongoose";
import { secrets } from "./src/config/secrets.js";
import app from "./src/app.js";
import cloudinary from 'cloudinary';

( async () => {
    try {
        await mongoose.connect(secrets.MONGO_URL);
        console.log("DB CONNECTED SUCCESSFULLY :)");

        cloudinary.config({
            cloud_name: secrets.CLOUDINARY_NAME,
            api_key: secrets.CLOUDINARY_API_KEY,
            api_secret:secrets.CLOUDINARY_API_SECRET
        })

        const onListening = () => {
            console.log(`Listening on PORT :: ${secrets.PORT}`);
        }

        app.listen(secrets.PORT, onListening);

    } catch (error) {
        console.error("DB Connection Error: ", error.message);
        throw error;
    }
})()