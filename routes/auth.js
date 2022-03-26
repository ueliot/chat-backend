/*
   path: /api/login/new

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post("/new",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "la contraseña es obligatoria").not().isEmpty(), //crea un objeto para saber si hay algun error que usaremos en el controller
    check("email", "El correo es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),
  ],
  login
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;