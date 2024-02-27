const { Schema, model} = require('mongoose');

const EstudianteSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        default: 'ESTUDIANTE_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    }
});

EstudianteSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...estudiante} = this.toObject();
    estudiante.uid = _id;
    return estudiante;
};

module.exports = model('Estudiante', EstudianteSchema);