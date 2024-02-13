const {Schema, model} = require('mongoose')

const CursoSchema = Schema ({
    curso:{
        type: String,
        require: [true, 'Un curso es obligatorio']
    }
});

module.exports = model('Curso', CursoSchema);