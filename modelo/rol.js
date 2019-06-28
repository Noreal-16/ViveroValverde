var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Rol = thinky.createModel("Rol", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    nombre: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now())
});
module.exports = Rol;