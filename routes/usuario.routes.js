const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole, tieneRolAutorizado } = require('../middlewares');
const { usuariosPost, usuariosGet, getUsuarioById, putUsuarios, usuariosDelete } = require('../controllers/usuario.controller');
const { existenteEmail, esRoleValido, existeUsuarioById } = require('../helpers/db-validators');

const router = Router();

router.get("/", usuariosGet);

router.get("/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById
);

router.put(
    "/:id",
    [
        check('id','No es un  id valido').isMongoId(),
        check('id').custom(existeUsuarioById),
        check('role').custom(esRoleValido),
        validarCampos
    ], putUsuarios
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password","El password debe ser mayot a 6 caracteres"),
        check("correo","Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos
    ], usuariosPost
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('MAESTRO_ROLE'),
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete
);

module.exports = router;