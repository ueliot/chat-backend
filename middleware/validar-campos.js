
const { validationResult } = require("express-validator");

const validarCampos = (req , res, next) => {
// el campo next es un callback que le indica a express que  si todo sale bien continue con el siguiente midleware
// el check en auth.js internamente llama a next para continuar con el siguiente
     const errores = validationResult(req);
     if (!errores.isEmpty()) {
       return res.status(400).json({
         ok: false,
         errors: errores.mapped(),
       });
     }

    next();    //le indica a express que debe continuar hacia el siguiente validador en este caso es el controller   

}

module.exports = {

    validarCampos,

}