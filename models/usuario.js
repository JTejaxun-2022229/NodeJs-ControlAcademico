const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
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
    curso:{
        type: String,
        required: [true, 'Un curso es obligatorio']
    },
    role:{
        type: String,
        require: true,
        enum: ["ALUMNO_ROLE","MAESTRO_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
})

UsuarioSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema)