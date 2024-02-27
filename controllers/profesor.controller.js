const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');
const { response } = require('express');

const profesorGet = async (req, res = response) => {

    const query = { estado: true };
    const [total, profesores] = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
    ]);

    res.status(200).json({
        total,
        profesores
    });
}

const getProfesorById = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findOne({ _id: id });

    res.status(200).json({
        profesor
    });
}

const profesorPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const profesor = new Profesor({ nombre, correo, password });

    const salt = bcryptjs.genSaltSync();
    profesor.password = bcryptjs.hashSync(password, salt);

    await profesor.save();
    res.status(202).json({
        msg: 'Profesor creado',
        profesor
    });
}

module.exports = {
    profesorPost,
    profesorGet,
    getProfesorById
}
