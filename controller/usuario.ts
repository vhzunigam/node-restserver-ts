import { Request, Response } from "express";

import Usuario from "../models/usuario";

export const obtenerUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {

        return res.status(400).json({ msg: `No existe el usuario con id ${id}` });
    }

    res.json(usuario);

}

export const obtenerUsuarios = async (req: Request, res: Response) => {

    const { count, rows } = await Usuario.findAndCountAll();

    res.json({
        total: count,
        usuarios: rows
    });

}

export const crearUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        // const usuario = await Usuario.create(body);

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if (existeEmail) {
            return res.status(400).json({ msg: `Ya existe el usuario con el email ${body.email}` });
        }

        const usuario = Usuario.build(body);
        await usuario.save();

        return res.json(usuario);
    } catch (error) {

        console.error(error);

        return res.status(500).json({ msg: `Mensaje inesperado` });
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

        const algo = await Usuario.update(body, { where: { id: id } });

        return res.json(algo);
    } catch (error) {

        console.error(error);

        return res.status(500).json({ msg: `Mensaje inesperado` });
    }

}

export const eliminarUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` });
    }

    // await usuario.destroy(); // Eliminación persistente

    await usuario.update({ estado: false });

    res.json({ msg: 'Usuarios', id })

}