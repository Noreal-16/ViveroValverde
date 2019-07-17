'use strict'
var Rol = require('../modelo/rol')

class rolControlador {

    crearRol(req, res) {

        Rol.then(function(result) {
            if (result.lenght <= 0) {
                Rol.save({ nombre: "Administrador" }, { nombre: "Usuario" });
            }
        }).error(function(error) {
            res.send(error);
        });
    }
}
module.exports = rolControlador;