import { Request, Response } from "express";
import { validationResult } from 'express-validator';

export const validarCampos = (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);

    // const err = errors.array().map(err => err.msg); --obtener unicamente los errores

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}
