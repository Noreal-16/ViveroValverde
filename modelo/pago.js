var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Pago = thinky.createModel("Pago", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    paymentBrand: type.string(),
    last4Digits: type.string(),
    code: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now()),

});
module.exports = Pago;
var Factura = require("./factura");
Pago.hasOne(Factura, "pago", "id", "id_factura");

