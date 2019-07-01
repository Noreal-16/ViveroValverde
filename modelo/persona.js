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
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now())
});
module.exports = Persona;
var Cuenta = require("./cuenta");
Persona.hasOne(Cuenta, "cuenta", "id", "id_persona");

// // //realacion medico historialclinico
// var HistoriaClinica = require("./historiaclinica");
// Medico.hasMany(HistoriaClinica, "historiaclinica", "id", "id_medico");