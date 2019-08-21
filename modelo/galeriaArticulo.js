var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var GaleriaArt = thinky.createModel("GaleriaArt", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    nombre: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now()),
    id_articulo: type.string()
});
module.exports = GaleriaArt;
var Articulo = require("./articulo");
GaleriaArt.belongsTo(Articulo, "articulo", "id_articulo", "id");
