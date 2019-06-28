var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Articulo = thinky.createModel("Articulo", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    nombre: type.string(),
    descripcion: type.string(),
    tamanio: type.number(),
    stok: type.number(),
    precio: type.number(),
    ruta_foto: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now())
});
module.exports = Articulo;