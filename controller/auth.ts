import bcryptjs from "bcryptjs";
import { Request, Response } from "express";

import { generaJWT } from '../helpers/generar-jwt';
import { googleVerify } from "../helpers/google-verify";
import Usuario from "../models/usuario";

export const auth = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email: email } });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }

        // Usuario activo

        if (!usuario?.dataValues.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password - false'
            });
        }

        // Verificar la contraseña

        const validPass = bcryptjs.compareSync(password, usuario?.dataValues.password);

        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }

        const token = await generaJWT(usuario?.dataValues.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).json({ msg: 'Error interno' });
    }

}

export const googleSignIn = async (req: Request, res: Response) => {
    const { id_token } = req.body;

    try {

        const { nombre, img, email } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ where: { email: email } });

        if (!usuario) {
            const data = {
                nombre,
                email,
                password: '',
                img,
                google: true
            };

            usuario = Usuario.build(data);

            await usuario.save();
        }

        // Si el usuario en bd
        if (!usuario.dataValues.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generaJWT(usuario.dataValues.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            msg: 'Ocurrio un error al autenticar el token de google'
        });
    }

}