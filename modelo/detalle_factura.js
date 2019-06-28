var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Dettalle_Factura = thinky.createModel("Dettalle_Factura", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    cantidad: type.number(),
    precio_unit: type.number(),
    precio_total: type.number(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now())
});
module.exports = Dettalle_Factura;