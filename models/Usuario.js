'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fsPromises = require('fs').promises;

// Creo el esquema de usuarios
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true},
    password: String
});

// metodo estatico para hashear password
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
    return bcrypt.hash(passwordEnClaro, 5);
};

usuarioSchema.statics.cargaJson = async function (fichero) {

    const data = await fsPromises.readFile(fichero, {
        encoding: 'utf8'
    });

    if (!data) {
        throw new Error(fichero + ' está vacio!');
    }

    const usuarios = JSON.parse(data).usuarios;
    

    for (var i = 0; i < usuarios.length; i++) {
        usuarios[i].password = await Usuario.hashPassword(usuarios[i].password)
        await (new Usuario(usuarios[i])).save();
      }

    return usuarios
}

// metodo de instancia para comprobar password
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
    return bcrypt.compare(passwordEnClaro, this.password);
};

// Creo el modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exporto el modelo
module.exports = Usuario;
