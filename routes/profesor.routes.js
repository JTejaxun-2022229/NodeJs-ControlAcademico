const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares');
const {
    profesorPost,
    profesorGet,
    getProfesorById } = require('../controllers/profesor.controller');
const { existenteEmail, existeProfesorById } = require('../helpers/db-validators');

const router = Router();

router.get("/", profesorGet)

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProfesorById),
        validarCampos
    ], getProfesorById
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos
    ], profesorPost
);

module.exports = router;