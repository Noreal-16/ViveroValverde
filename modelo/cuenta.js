var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Cuenta = thinky.createModel("Cuenta", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    correo: type.string(),
    clave: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now()),
    id_medico: type.string()
});
module.exports = Cuenta;
var Medico = require("./medico");
Cuenta.belongsTo(Medico, "medico", "id_medico", "id");