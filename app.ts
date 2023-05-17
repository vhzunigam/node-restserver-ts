import dotenv from "dotenv";
import Server from "./models/server";
dotenv.config();

console.clear();

const server = new Server();

server.listen();