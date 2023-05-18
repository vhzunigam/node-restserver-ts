import jwt from "jsonwebtoken";

export const generaJWT = (id: string) => {

    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });

}