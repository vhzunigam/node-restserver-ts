import bcryptjs from 'bcryptjs';
import { Request, Response } from "express";

import Usuario from "../models/usuario";

export const obtenerUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    console.log(usuario);

    if (!usuario) {

        return res.status(400).json({ msg: `No existe el usuario con id ${id}` });
    }

    return res.json(usuario);

}

export const obtenerUsuarios = async (req: Request, res: Response) => {
    const { limite = 5, desde = 0 } = req.query;

    const { count, rows } = await Usuario.findAndCountAll({
        limit: parseInt(limite.toString()),
        offset: parseInt(desde.toString())
    });

    return res.json({
        total: count,
        usuarios: rows
    });

}

export const crearUsuario = async (req: Request, res: Response) => {

    const { password, ...data } = req.body;

    try {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);

        const usuario = Usuario.build(data);
        await usuario.save();

        return res.json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error });
    }

}

export const actualizarUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` });
        }

        const usuarioActualizado = await Usuario.update(body, { where: { id: id } });

        return res.json(usuarioActualizado);
    } catch (error) {

        console.error(error);

        return res.status(500).json({ msg: `Mensaje inesperado` });
    }

}

export const eliminarUsuario = async (req: Request, res: Response) => {

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

        console.error(error);

        return res.status(500).json({ msg: `Mensaje inesperado` });
    }

}