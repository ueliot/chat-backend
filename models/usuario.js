const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema ({

    nombre: {
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true

    },
    online:{
        type: Boolean,
        default: false

    },

   


});



 UsuarioSchema.method("toJSON", function () {
   //aqui no usaremos funcion de flecha mas bien usamos una funcion tradicional
   //debido a que las funciones de flecha no modifican el valor al que apunta el this (Cuesta entender el this y su scope en javascript)
   const { __v, _id, password, ...object } = this.toObject(); //esta es la instancia del objeto que está creado en este momento ,
   //estraigo lo que no me interesa devolver en la llamada el resto lo coloco en object u otra variable
   //uso el spread operator ...object
    object.uid = _id;
    return object;

 });

module.exports = model('Usuario', UsuarioSchema);