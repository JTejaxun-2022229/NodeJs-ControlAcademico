const Role = require('../models/role');
const Curso = require('../models/curso')
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

const existenteEmailEstudiante = async (correo = '') => {
    const existeEstudianteEmail = await Estudiante.findOne({ correo });
    if (existeEstudianteEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existenteEmailProfesor = async (correo = '') => {
    const existeProfesorEmail = await Profesor.findOne({ correo });
    if (existeProfesorEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}


const existenteCurso = async (curso = '') => {
    const existeCurso = await Curso.findOne({ nombre });
    if (existeCurso) {
        throw new Error(`El curso ${curso} ya esta registrado`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({ id });
    if (existeUsuario) {
        throw new Error(`El usuario con el ${id} no existe`)
    }
}

const existeEstudianteById = async (id = '') => {
    const existeEstudiante = await Estudiante.findOne({ id });
    if (existeEstudiante) {
        throw new Error(`El estudiante con el ${id} no existe`)
    }
}

const existeProfesorById = async (id = '') => {
    const existeProfesor = await Profesor.findOne({ id });
    if (existeProfesor) {
        throw new Error(`El profesor con el ${id} no existe`)
    }
}

const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({ id });
    if (existeCurso) {
        throw new Error(`El curso con el ${id} no existe`)
    }
}

module.exports = {
    esRoleValido,
    existenteEmailEstudiante,
    existenteEmailProfesor,
    existeUsuarioById,
    existeEstudianteById,
    existeProfesorById,
    existenteCurso,
    existeCursoById
}