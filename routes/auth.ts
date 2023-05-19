import { Router } from "express";
import { check } from 'express-validator';

import { authController } from "../controller";
import { validarCampos } from '../middlewares';

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], authController.auth);

router.post('/google', [
    check('id_token', 'ID_TOKEN es necesario').not().isEmpty(),
    validarCampos
], authController.googleSignIn);

export default router;