const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next)=>{

    //leer token
    const token =  req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        });
    }

    try {
        //validando el token
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;


        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    

}

module.exports = {
    validarJWT
    
}