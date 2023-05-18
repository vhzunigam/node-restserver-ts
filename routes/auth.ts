import { Router } from "express";
import { check } from 'express-validator';

import { auth, googleSignIn } from "../controller/auth";
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], auth);

router.post('/google', [
    check('id_token', 'ID_TOKEN es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

export default router;