const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole, tieneRolAutorizado } = require('../middlewares');

const {
    cursoPost,
    cursoGet,
    getCursoById,
    putCurso,
    cursoDelete } = require('../controllers/curso.Controller');

const router = Router();

router.get("/", cursoGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        validarCampos
    ], getCursoById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        validarCampos
    ], putCurso
)

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        validarCampos
    ], cursoPost
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('MAESTRO_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        validarCampos
    ], cursoDelete
);

module.exports = router;