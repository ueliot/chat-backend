
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {
   
  //antes estaba aqui lo que está en validar campos 

    const { email, password } = req.body;    //uso desestructuracion solo para extraer el email

    try {
      const existeEmail = await Usuario.findOne({ email }); 
      if(existeEmail){
          return res.status(400).json({
            ok: false,
            msg: 'El correo ya está registrado'

          });
      }
      
      //findOne({email: email}); en js es redundante asi que
      const usuario = new Usuario(req.body);

      //Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);

      await usuario.save();

      //Generar mi JWT
      const token = await generarJWT(usuario.id);


      res.json({
        ok: true,
        usuario,
        token
        // msg: "Crear Usuario",
      });
    } catch (error){
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el admin'
      })
    }

   
}


const login =  async (req, res) => {

  const { email, password } = req.body;

   try {
     const usuarioDB = await Usuario.findOne({email});
     if ( !usuarioDB) {
       return res.status(400).json({
         ok: false,
         msg: 'Email no encontrado'
       });
     }

     //validar password
     const validPassword = bcrypt.compareSync(password, usuarioDB.password);
     if(!validPassword){
       return res.status(400).json({
         ok: false,
         msg: 'la contraseña no es valida'
       });
     }


    //Generar el JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
      // msg: "Crear Usuario",
    });


     
   } catch (error) {
     console.log(error)
     
    return res.status(500).json({
      ok: false,
      msg: 'hable con el admin'
    })
   }

}


const renewToken = async(req, res = response) =>{

    const uid = req.uid;
    //generar un nuevo JWT
    const token = await generarJWT(uid);

    //obtener el usuario por el UID
    const usuario = await Usuario.findById( uid);
    
  return res.json({
    ok: true,
    usuario,
    token
  })


}

module.exports = { crearUsuario, login, renewToken }