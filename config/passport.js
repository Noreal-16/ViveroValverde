//var bCrypt = require('bcrypt-nodejs'); //modulo para encriptar claves
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
        cuenta.get(id).getJoin({ persona: { rol: true } }).then(function (cuenta) {
            // console.log(Object.values(cuenta));
            console.log("llega nombre:  " + cuenta.persona.nombres);
            console.log("llega rol:  " + cuenta.persona.rol.nombre);
            if (cuenta) {
                var userinfo = {
                    id: cuenta.persona.external_id,
                    nombre: cuenta.persona.apellidos + " " + cuenta.persona.nombres,
                    rol:cuenta.persona.rol.nombre,
                    external_rol:cuenta.persona.rol.external_id,
                    correo: cuenta.correo,
                    telefono: cuenta.persona.telefono,
                    nombres: cuenta.persona.nombres,
                    apellidos: cuenta.persona.apellidos,
                    celular: cuenta.persona.celular,
                    direccion: cuenta.persona.direccion,
                    cedula: cuenta.persona.cedula,
                    exter: cuenta.persona.external_id
                    
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
        usernameField: 'correoInicio',
        passwordField: 'claveInicio',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            cuenta.filter({ correo: email }).then(function (cuentaP) {
                
                var cuenta = cuentaP[0];
                console.log(email + " " + password)
                console.log("Cuenta clave: " + cuenta.clave + " " + password)
                if (cuenta.estado!==true) {
                    return done(null, false, { message: req.flash('error', 'Su cuenta esta desacticada contacte al Administrador !.') });
                }
                if (!cuenta) {
                    return done(null, false, { message: req.flash('error', 'Cuenta no existe') });
                }
                if (cuenta.clave !== password) {
                    return done(null, false, { message: req.flash('error', 'Clave incorrecta') });
                }
                // var user = {id: profile.id, first_name: profile.name[1],
                // var userinfo = cuenta.get();
                var userinfo = cuenta;
                return done(null, userinfo);

            }).catch(function (err) {
                console.log("Error presenta:", err);
                return done(null, false, { message: req.flash('error', 'Cuenta erronea') });
            });
        }
    ));
}