const Curso = require('../models/curso');
const Usuario = require('../models/usuario');
const { response } = require('express');

const cursoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true }

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

const getCursoById = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findOne({ _id: id });

    res.status(200).json({
        curso
    });
}

const putCurso = async (req, res = response) => {
    const { id } = req.params;
    await Curso.findByIdAndUpdate(id);
    const curso = curso.findOne({ id });
    const usuarioAutenticado = req.usuario

    res.status(200).json({
        msg: "Curso Actualizado",
        usuarioAutenticado
    });
}

const cursoDelete = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Curso a eliminar',
        curso,
        usuarioAutenticado
    });
}

const cursoPost = async (req,res) => {
    const {nombre} = req.body;
    const curso = new Curso({nombre});

    await curso.save();
    res.status(202).json({
        curso
    });
}

module.exports = {
    cursoPost,
    cursoGet,
    getCursoById,
    putCurso,
    cursoDelete
}