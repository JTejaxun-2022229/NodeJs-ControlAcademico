const jwt = require('jsonwebtoken');
const Estudiante = require('../models/estudiante');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const estudiante = await Estudiante.findById(uid);

        if(!estudiante){
            return res.status(401).json({
                msg: "Estudiante no existe en la base de datos"
            });
        }

        if(!estudiante.estado){
            return res.status(401).json({
                msg: "Token no válido, usuario con estado false"
            });
        }

        req.estudiante = estudiante;
        next();
        
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
} 

module.exports = {
    validarJWT
}