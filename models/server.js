const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.cursoPath = '/api/curso';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usuarioPath, require('../routes/usuario.routes'));
        this.app.use(this.cursoPath, require('../routes/curso.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose y escuchando el puerto', this.port); 
        });
    }
}

module.exports = Server;