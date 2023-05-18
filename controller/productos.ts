import { Request, Response } from "express";

import Producto from "../models/producto";
import Usuario from '../models/usuario';

export const obtenerProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id, { include: Usuario });

        if (!producto) {
            return res.status(400).json({ msg: `No se encontro el producto con id ${id}` });
        }

        return res.json(producto);
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        return res.status(500).json({ msg: 'Ocurrio un problema interno' });
    }
}

export const obtenerProductos = async (req: Request, res: Response) => {
    try {

        const { limite = 5, desde = 0 } = req.query;

        const { count, rows } = await Producto.findAndCountAll({
            limit: parseInt(limite.toString()),
            offset: parseInt(desde.toString())
        });

        return res.json({
            total: count,
            productos: rows
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Ocurrio un problema interno' });
    }
}

export const crearProducto = async (req: Request, res: Response) => {
    try {
        const { estado, ...data } = req.body;
        data.usuario = req.usuario.dataValues.id;
        data.nombre = data.nombre.toUpperCase();

        const existeProducto = await Producto.findOne({
            where: {
                nombre: data.nombre
            }
        });

        if (existeProducto) {
            return res.status(400).json({ msg: `Ya existe el producto ${existeProducto.dataValues.nombre}` });
        }

        const producto = await Producto.create(data);

        return res.json(producto);
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        return res.status(500).json({ msg: 'Ocurrio un problema interno' });
    }
}

export const actualizarProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { estado, ...data } = req.body;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(400).json({ msg: `No existe el producto con el id ${id}` });
        }

        data.usuario = req.usuario.dataValues.id;

        const prodActualizado = await Producto.update(data, {
            where: {
                id: id
            }
        });


        return res.json(data);
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        return res.status(500).json({ msg: 'Ocurrio un problema interno' });
    }
}

export const eliminarProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existeProducto = await Producto.findByPk(id);

        if (!existeProducto) {
            return res.status(400).json({ msg: `No existe el producto con id ${id}` });
        }

        existeProducto.dataValues.estado = false;
        const usuario = req.usuario.dataValues.id;

        const producto = await Producto.update(existeProducto.dataValues, {
            where: {
                id: id
            }
        });

        return res.json(existeProducto);
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        return res.status(500).json({ msg: 'Ocurrio un problema interno' });
    }
}