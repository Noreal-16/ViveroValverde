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
    updatedAt: type.date().default(r.now())
});
module.exports = Factura;