import cors from "cors";
import express, { Application } from "express";

import authRoutes from "../routes/auth";
import productosRoutes from "../routes/productos";
import usuariosRoutes from "../routes/usuarios";

import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        productos: '/api/productos',
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
            // if(error instanceof Error)
            //     throw new Error(error.message);
        }
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.productos, productosRoutes);
        this.app.use(this.apiPaths.usuarios, usuariosRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;
