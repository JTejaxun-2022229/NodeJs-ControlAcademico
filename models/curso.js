const {Schema, model} = require('mongoose');

const CursoSchema = Schema ({
    nombre:{
        type: String,
        require: [true, 'Un curso es obligatorio'],
        unique: true
    },
    estudiante:{
        type: Array
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Curso', CursoSchema);