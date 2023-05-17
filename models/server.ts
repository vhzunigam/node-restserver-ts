import cors from "cors";
import express, { Application } from "express";
import usuarioRoutes from "../routes/usuario";

import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // Cors
        this.app.use(cors({}));

        // Lecturadel body
        this.app.use(express.json());

        // Carpeta publica
        this.app.use(express.static('public'));
    }

    async dbConnection(){
        try {

            await db.authenticate();

            console.log('Database online');
        } catch (error) {
            throw new Error(error+'');
        }
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, usuarioRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;