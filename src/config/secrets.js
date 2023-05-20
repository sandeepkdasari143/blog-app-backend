import dotenv from 'dotenv';

dotenv.config();

export const secrets = {
    MONGO_URL : process.env.MONGO_URL,
    PORT: process.env.PORT,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}