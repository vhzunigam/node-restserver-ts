import bcryptjs from "bcryptjs";
import { Request, Response } from "express";

import { generaJWT, googleVerify } from '../helpers';
import Usuario from "../models/usuario";

class AuthController {
    public async auth(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
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
            if (error instanceof Error) console.error(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }

    public async googleSignIn(req: Request, res: Response) {
        try {
            const { id_token } = req.body;
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
            if (error instanceof Error) console.error(error.message);
            return res.status(500).json({ msg: 'Ocurrio un problema interno' });
        }
    }
}

export const authController = new AuthController();