'use strict';

const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');

class LoginController {
    async postJWT(req, res, next) {
        try {
          const { email, password } = req.body;
          
       
          // buscar el usuario en la BD
          const usuario = await Usuario.findOne({ email });
         
    
          // si no lo encuentro o no coincide la contraseña --> error
          if (!usuario || !(await usuario.comparePassword(password))) {
            res.statusCode = 401;
            res.json({ error: 'Invalid credentials'})
            return;
          }
    
          // si existe y la contraseña coincide 
    
          // generar un token JWT con su _id
          const token = jwt.sign({ _id: usuario._id}, process.env.JWT_SECRET, {
            expiresIn: '2d'
          });
          
          //--> responder al usuario con el token
          res.json({ token });
        } catch (err) {
          next(err);
        }
      }
    
};

module.exports = LoginController;