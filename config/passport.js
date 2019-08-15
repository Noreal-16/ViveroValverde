//var bCrypt = require('bcrypt-nodejs'); //modulo para encriptar claves
// var models = require('./../models');
var cuenta = require('../modelo/cuenta');
var persona = require('../modelo/persona');
var rol = require('../modelo/rol');
module.exports = function (passport) {
    var LocalStrategy = require('passport-local').Strategy;
    //Permite serializar los datos de cuenta
    passport.serializeUser(function (cuenta, done) {
        done(null, cuenta.id);
    });
    // Permite deserialize la cuenta de usuario
    passport.deserializeUser(function (id, done) {
        cuenta.getJoin({ persona: true }).filter({ id: id }).then(function (cuenta) {
            // var cuenta = cuenta[0];
            console.log("llega a validar"+ cuenta);
            if (cuenta) {
                var userinfo = {
                    id: cuenta.persona.external_id,
                    nombre: cuenta.persona.apellidos + " " + cuenta.persona.nombres
                };
                console.log("Informacion Usuario: " + userinfo);
                done(null, userinfo);
            } else {
                done(cuenta.errors, null);
            }
        });
    });
    //inicio de sesion
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'correo',
        passwordField: 'clave',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            cuenta.filter({ correo: email }).then(function (cuentaP) {
                var cuenta = cuentaP[0];
                console.log(email + " " + password)
                console.log("Cuenta clave: " + cuenta.clave + " " + password)
                if (!cuenta) {
                    return done(null, false, { message: req.flash('error', 'Cuenta no existe') });
                }
                if (cuenta.clave !== password) {
                    return done(null, false, { message: req.flash('error', 'Clave incorrecta') });
                }
               
                var userinfo = cuentaP.get();

                return done(null, userinfo);

            }).catch(function (err) {
                console.log("Error presenta:", err);
                return done(null, false, { message: req.flash('error', 'Cuenta erronea') });
            });
        }
    ));
}