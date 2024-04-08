import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Chat } from "./entities/Chat"
import { Message } from "./entities/Message"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [`${__dirname}/entities/**/*.js`],
})

export const userRepository = AppDataSource.getRepository(User)
export const chatRepository = AppDataSource.getRepository(Chat)
export const messageRepository = AppDataSource.getRepository(Message)

AppDataSource.initialize()
  .then(() => console.log("Connected to the DB"))
  .catch((e) => console.log("Error connection to the DB", e))
