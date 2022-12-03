'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Creo el esquema de usuarios
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true},
    password: String
});

// metodo estatico para hashear password
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
    return bcrypt.hash(passwordEnClaro, 5);
};

// metodo de instancia para comprobar password
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
    return bcrypt.compare(passwordEnClaro, this.password);
};

// Creo el modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exporto el modelo
module.exports = Usuario;
