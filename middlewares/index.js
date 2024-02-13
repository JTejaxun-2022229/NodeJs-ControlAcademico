const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const esAdminRole = require('../middlewares/validar-rol');
const tieneRolAutorizado = require('../middlewares/validar-rol')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esAdminRole,
    ...tieneRolAutorizado
}