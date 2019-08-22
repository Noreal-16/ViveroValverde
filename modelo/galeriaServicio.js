var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var GaleriaServ = thinky.createModel("GaleriaServ", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    nombre: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now()),
    id_servicio: type.string()
});
module.exports = GaleriaServ;
var Servicio = require("./servicio");
GaleriaServ.belongsTo(Servicio, "servicio", "id_servicio", "id");