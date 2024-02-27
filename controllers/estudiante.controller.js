const bcryptjs = require('bcryptjs');
const Estudiante = require('../models/estudiante');
const { response } = require('express');

const estudianteGet = async (req, res = response) => {

    const query = { estado: true };
    const [total, estudiantes] = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
    ]);

    res.status(200).json({
        total,
        estudiantes
    });
}

const getEstudianteById = async (req, res) => {
    const { id } = req.params;
    const estudiante = await Estudiante.findOne({ _id: id });

    res.status(200).json({
        estudiante
    });
}

const putEstudiante = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const estudiante = await Estudiante.findByIdAndUpdate(id, resto);
    
    res.status(200).json({
        msg: 'Estudiante Actualizado',
        estudiante
    });
};

const estudianteDelete = async (req, res) => {
    const { id } = req.params;
    const estudiante = await Estudiante.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Estudiante a eliminar',
        estudiante
    });
}

const estudiantePost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const estudiante = new Estudiante({ nombre, correo, password });

    const salt = bcryptjs.genSaltSync();
    estudiante.password = bcryptjs.hashSync(password, salt);

    await estudiante.save();
    res.status(202).json({
        msg: 'Estudiante creado',
        estudiante
    });
}

module.exports = {
    estudiantePost,
    estudianteGet,
    getEstudianteById,
    putEstudiante,
    estudianteDelete
}
