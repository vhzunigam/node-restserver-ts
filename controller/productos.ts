import { Request, Response } from "express";

import Producto from "../models/producto";

class ProductoController {
    public async obtenerProducto(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // findAll({ include: { all: true }})
            const producto = await Producto.findByPk(id, {
                include: { all: true }
            });

            if (!producto) {
                return res.status(400).json({ msg: `No se encontro el producto con id ${id}` });
            }

            return res.json(producto);
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async obtenerProductos(req: Request, res: Response) {
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

    public async crearProducto(req: Request, res: Response) {
        try {
            const { estado, ...data } = req.body;
            data.usuario = req.usuario.dataValues.id;
            data.nombre = data.nombre.toUpperCase();

            const existeProducto = await Producto.findOne({
                where: {
                    nombre: data.nombre,
                    marca: data.marca
                }
            });

            if (existeProducto) {
                return res.status(400).json({ msg: `Ya existe el producto ${existeProducto.dataValues.nombre}` });
            }

            const producto = await Producto.create(data);

            return res.json(producto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async actualizarProducto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { estado, ...data } = req.body;

            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.status(400).json({ msg: `No existe el producto con el id ${id}` });
            }

            if (!producto.dataValues.estado) {
                return res.status(400).json({ msg: `Producto no disponible para la solicitud` });
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

    public async eliminarProducto(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const existeProducto = await Producto.findByPk(id);

            if (!existeProducto) {
                return res.status(400).json({ msg: `No existe el producto con id ${id}` });
            }

            existeProducto.dataValues.estado = false;
            existeProducto.dataValues.usuario = req.usuario.dataValues.id;

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
}

export const productoController = new ProductoController();