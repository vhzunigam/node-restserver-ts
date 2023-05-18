import { Response, Router } from "express";

import { actualizarProducto, crearProducto, eliminarProducto, obtenerProducto, obtenerProductos } from '../controller/productos';
import { validarJWT } from "../middlewares/valida-jwt";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.get('/:id', obtenerProducto);
router.get('/', obtenerProductos);
router.post('/', [
    validarJWT,
    validarCampos
], crearProducto);
router.put('/:id', [
    validarJWT,
    validarCampos
], actualizarProducto);
router.delete('/:id', [
    validarJWT,
    validarCampos
], eliminarProducto);

export default router;