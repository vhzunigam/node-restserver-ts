import { Request, Response } from "express";

import Marca from "../models/marca";

class MarcaController {
    public async obtenerMarca(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log(id);

            const marca = await Marca.findByPk(id);

            return res.json(marca);

        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async obtenerMarcas(req: Request, res: Response) {
        try {
            const { limite = 5, desde = 0 } = req.query;

            const { count, rows } = await Marca.findAndCountAll({
                offset: parseInt(desde.toString()),
                limit: parseInt(limite.toString())
            });

            return res.json({
                total: count,
                marcas: rows
            });

        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async crearMarca(req: Request, res: Response) {
        try {
            const { estado, ...data } = req.body;

            data.nombre = data.nombre.toUpperCase();
            data.usuario = req.usuario.dataValues.id;

            const marca = await Marca.findOne({
                where: {
                    nombre: data.nombre
                }
            });

            if (marca) {
                return res.status(400).json({ msg: `La marca [${data.nombre}] ya se encuenta registrada` });
            }

            const marcaCreada = await Marca.create(data);

            return res.json(marcaCreada);

        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async actualizarMarca(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { estado, ...data } = req.body;

            data.nombre = data.nombre.toUpperCase();
            data.usuario = req.usuario.dataValues.id;

            const marca = await Marca.update(data, {
                where: {
                    id: id
                }
            });

            return res.json(marca);

        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async eliminarMarca(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const marca = await Marca.update({
                estado: false
            }, {
                where: {
                    id: id
                }
            });

            return res.json(marca);

        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }
}

export const marcaController = new MarcaController();