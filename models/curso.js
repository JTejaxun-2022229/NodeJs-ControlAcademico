const {Schema, model} = require('mongoose');
const { putUsuarios } = require('../controllers/usuario.controller');

const CursoSchema = Schema ({
    nombre:{
        type: String,
        require: [true, 'Un curso es obligatorio'],
        unique: true
    },
    estudiante:{
        type: Array,
        default: []
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Curso', CursoSchema);