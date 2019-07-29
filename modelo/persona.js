var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Persona = thinky.createModel("Persona", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    cedula: type.string(),
    apellidos: type.string(),
    nombres: type.string(),
    direccion: type.string(),
    telefono: type.string(),
    celular: type.string(),
    estado: type.string(),
    correo: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now()),
    id_Rol: type.string()
});
module.exports = Persona;
var Cuenta = require("./cuenta");
Persona.hasOne(Cuenta, "cuenta", "id", "id_persona");
var Factura = require('./factura');
Persona.hasMany(Factura, "factura", "id", "id_persona");
var Rol = require('./rol');
Persona.belongsTo(Rol, "rol", "id", "id_Rol");