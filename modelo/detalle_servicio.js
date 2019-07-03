var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Dettalle_Servicio = thinky.createModel("Dettalle_Servicio", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    cantidad: type.number(),
    precio_unit: type.number(),
    precio_total: type.number(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now())
});
module.exports = Dettalle_Servicio;
var Factura = require('./factura');
Dettalle_Servicio.hasMany(Factura, "factura", "id", "id_detalleServicio");
var Articulo = require('./articulo');
Dettalle_Servicio.hasMany(Articulo, "articulo", "id", "id_detalleServicio");