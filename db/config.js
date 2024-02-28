const mongoose = require('mongoose');
const Role = require ('../models/role');

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {});
        await insertarRoles();
        console.log('Base de datos conectada');
    }catch(e){
        throw new Error('Error al conectar la base de datos ', e)
    }
}

async function insertarRoles() {
    try {
        const existenRoles = await Role.find();
        if(existenRoles.length === 0) {
            await Role.create([
                { role: 'PROFESOR_ROLE' },
                { role: 'ESTUDIANTE_ROLE' }
            ]);
            console.log('Roles insertados automáticamente.');
        } else {
            console.log('Ya existen roles en la base de datos, no se insertaron automáticamente.');
        }
    } catch (error) {
        console.error('Error al insertar roles automáticamente:', error);
    }
}

module.exports = {
    dbConnection
}