'use strict';

function crear_roles() {
    var rol = require('../modelo/rol');
    rol.run().then(function(roles) {
        if (roles.length <= 0) {
            rol.save([
                { nombre: "Administrador" },
                { nombre: "Usuario" }
            ]);
        }

    }).error(function(error) {
        //console.log(error);
        res.send(error);
    });
}
// function crearRol() {
//     var Rol = require('../modelo/rol')
//     Rol.run().then(function(result) {
//         if (result.length <= 0) {
//             Rol.save([{
//                 nombre: "Administrador"
//             }, {
//                 nombre: "Usuario"
//             }]);
//             console.log(result);
//         }
//     }).error(function(error) {
//         res.send(error);
//     });
// }

module.exports = { crear_roles };