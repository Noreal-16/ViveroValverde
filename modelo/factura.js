var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Factura = thinky.createModel("Factura", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    fecha_pedido: type.date(),
    fecha_entrga: type.date(),
    iva: type.number(),
    subtotal: type.number(),
    total: type.number(),
    decuento: type.number(),
    tipo_pago: type.string(),
    tipo_fact: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now()),
    id_persona: type.string(),
    id_detalle: type.string(),
    id_detalleServicio: type.string()
});
module.exports = Factura;
var Persona = require('./persona');
Factura.belongsTo(Persona, "persona", "id", "id_persona");
var Detalle_Factura = require('./detalle_factura');
Factura.belongsTo(Detalle_Factura, "detalle_factura", "id", "id_detalle");
var Detalle_Servicio = require('./detalle_servicio');
Factura.belongsTo(Detalle_Servicio, "detalle_servicio", "id", "id_detalleServicio");