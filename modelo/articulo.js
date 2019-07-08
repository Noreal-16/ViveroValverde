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
    updatedAt: type.date().default(r.now()),
    id_detalleServicio: type.string()
});
module.exports = Articulo;
var Detalle_Servicio = require('./detalle_servicio');
Articulo.belongsTo(Detalle_Servicio, "detalle_Servicio", "id", "id_detalleServicio");
var Categoria = require('./categoria');
Articulo.hasMany(Categoria, "categoria", "id_articulo", "id");