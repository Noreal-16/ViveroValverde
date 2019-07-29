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
    updatedAt: type.date().default(r.now()),
    id_servicio: type.string(),
    id_factura: type.string()
});
module.exports = Dettalle_Servicio;
var Factura = require('./factura');
Dettalle_Servicio.belongsTo(Factura, "factura", "id_factura", "id");
var Servicio = require('./servicio');
Dettalle_Servicio.belongsTo(Servicio, "servicio", "id_servicio", "id");