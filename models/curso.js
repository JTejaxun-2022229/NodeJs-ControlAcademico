const {Schema, model} = require('mongoose')

const CursoSchema = Schema ({
    nombre:{
        type: String,
        require: [true, 'Un curso es obligatorio'],
        unique: true
    },
    estudiante:{
        type: String,
        enum: []
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Curso', CursoSchema);