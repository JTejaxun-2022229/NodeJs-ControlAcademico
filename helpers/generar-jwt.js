const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid,};
        jwt.sign(
            payload,
            process.env.SECRETPRIVATEKEY,
            {
                expiresIn: '24h',
            },
            (err,token)=>{
                err ? (console.log(err),reject('Nose se puede generar el token')): resolve(token);
            }
        );
    });
};

module.exports = {
    generarJWT
}