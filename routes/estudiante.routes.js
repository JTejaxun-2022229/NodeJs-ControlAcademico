const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, tieneRolAutorizado } = require('../middlewares');
const {
    estudiantePost,
    estudianteGet,
    getEstudianteById,
    putEstudiante,
    estudianteDelete } = require('../controllers/estudiante.controller');
const { existenteEmailEstudiante, existeEstudianteById, existenteEmailEstudiante } = require('../helpers/db-validators');

const router = Router();

router.get("/", estudianteGet)

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], getEstudianteById
);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('ESTUDIANTE_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], putEstudiante
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmailEstudiante),
        validarCampos
    ], estudiantePost
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('ESTUDIANTE_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], estudianteDelete
);

module.exports = router;