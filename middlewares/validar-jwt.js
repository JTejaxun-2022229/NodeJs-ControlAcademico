const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const {request, response} = require('express');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({
                msg: "El usuario no existe en la base de datos"
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no valido, usuario con esto false"
            });
        }

        req.usuario = usuario;
        next();
    }catch(e){

        console.log(e);
        res.status(401).json({
            msg: "Token no valido"
        })
        
    };
    
}

module.exports = {
    validarJWT
}