import dotenv from 'dotenv';

dotenv.config();

export const secrets = {
    MONGO_URL : process.env.MONGO_URL,
    PORT: process.env.PORT,
}