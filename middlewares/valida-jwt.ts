import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import Usuario from "../models/usuario";


export const validarJWT = async (req: Request, res: Response, next: Function) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Sin token en la petición'
        });
    }

    try {

        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '') as JwtPayload;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            });
        }

        // Verificar si el uid esta activo

        if (!usuario.dataValues.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo'
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }

}

interface JwtPayload {
    id: string
  }