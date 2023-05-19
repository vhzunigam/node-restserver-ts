import bcryptjs from 'bcryptjs';
import { Request, Response } from "express";

import Usuario from "../models/usuario";

class UsuarioController {
    public async obtenerUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);

            console.log(usuario);

            if (!usuario) {

                return res.status(400).json({ msg: `No existe el usuario con id ${id}` });
            }

            return res.json(usuario);
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async obtenerUsuarios(req: Request, res: Response) {
        try {
            const { limite = 5, desde = 0 } = req.query;

            const { count, rows } = await Usuario.findAndCountAll({
                limit: parseInt(limite.toString()),
                offset: parseInt(desde.toString())
            });

            return res.json({
                total: count,
                usuarios: rows
            });
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async crearUsuario(req: Request, res: Response) {
        try {
            const { password, ...data } = req.body;
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            data.password = bcryptjs.hashSync(password, salt);

            const usuario = Usuario.build(data);
            await usuario.save();

            return res.json(usuario);
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async actualizarUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` });
            }

            const usuarioActualizado = await Usuario.update(body, { where: { id: id } });

            return res.json(usuarioActualizado);
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async eliminarUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` });
            }

            // await usuario.destroy(); // Eliminación persistente

            await usuario.update({ estado: false });

            return res.json({ msg: 'Usuarios', id })
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }
}

export const usuarioController = new UsuarioController();