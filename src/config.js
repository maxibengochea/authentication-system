import { config } from "dotenv"

config()
export const { PORT, MONGO_URL, MONGO_USER, MONGO_PASSWORD, MONGO_DB_NAME } = process.env