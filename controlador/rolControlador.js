function crearRol() {
    var Rol = require('../modelo/rol')
    Rol.run().then(function(result) {
        if (result.length <= 0) {
            Rol.save([{ nombre: "Administrador" }, { nombre: "Usuario" }]);
            console.log(result);
        }
    }).error(function(error) {
        res.send(error);
    });
}

module.exports = { crearRol };