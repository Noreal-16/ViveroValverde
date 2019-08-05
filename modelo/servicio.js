var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Servicio = thinky.createModel("Servicio", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    nombre: type.string(),
    descripcion: type.string(),
    galeria: type.string(),
    medida: type.string(),
    precio: type.string(),
    estado: type.boolean(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now())
});
module.exports = Servicio;
var Detalle_Servicio = require('./detalle_servicio');
Servicio.hasMany(Detalle_Servicio, "detalle_servicio", "id", "id_servicio");