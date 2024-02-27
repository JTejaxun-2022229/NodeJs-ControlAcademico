const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, tieneRolAutorizado } = require('../middlewares');

const {
    cursoPost,
    cursoGet,
    getCursoById,
    putCurso,
    cursoDelete } = require('../controllers/curso.Controller');
const { existeCursoById, existenteCurso} = require('../helpers/db-validators');

const router = Router();

router.get("/", cursoGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], getCursoById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], putCurso
)

router.post(
    "/",
    [
        validarJWT,
        tieneRolAutorizado('PROFESOR_ROLE'),
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        //check("nombre").custom(existenteCurso),
        validarCampos
    ], cursoPost
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('MAESTRO_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], cursoDelete
);

module.exports = router;