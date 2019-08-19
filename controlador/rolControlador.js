'use strict';
var rol = require('../modelo/rol');
var Cuenta = require('../modelo/cuenta');
var Persona = require('../modelo/persona');
var bcrypt = require('bcrypt');
function crear_roles() {

    rol.run().then(function (roles) {
        if (roles.length <= 0) {
            rol.save([
                { nombre: "Administrador" },
                { nombre: "Usuario" }
            ]).then(function (result) {
                rol.filter({ nombre: "Administrador" }).run().then(function (rolesResul) {
                    //guardar usuario
                    var rol = rolesResul[0];
                    // var generateHash = function (clave) {
                    //     return bcrypt.hashSync(clave, bcrypt.genSaltSync(saltRounds), null);
                    // }
                    var datosP = {
                        cedula: "2222222222",
                        apellidos: "Administrador",
                        nombres: "Administrador",
                        direccion: "Administrador",
                        telefono: "0987654321",
                        celular: "0987654321",
                        estado: true,
                        id_Rol: rol.id
                    };
                    var datosC = {
                        correo: "test@gmail.com",
                        clave: "12345",
                        estado: true,
                        nombreUsuario: "Administrador"
                    }
                    var persona = new Persona(datosP);
                    var cuenta = new Cuenta(datosC);
                    persona.cuenta = cuenta;
                    persona.saveAll({ cuenta: true });
                    //finaliza guardar usuario
                }).error(function (error) {
                    res.send(error);
                });
            }).error(function (error) {
                res.send(error);
            })
        }
    }).error(function (error) {
        //console.log(error);
        res.send(error);
    });
}


module.exports = { crear_roles };