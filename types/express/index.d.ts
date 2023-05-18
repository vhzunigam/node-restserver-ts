import Usuario from "../../models/usuario"

export {}

declare global {
  namespace Express {
    export interface Request {
        usuario: Usuario
    }
  }
}