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
    portada: type.string(),
    estado: type.boolean(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now()),
    id_categoria: type.string()

});
module.exports = Articulo;
var Detalle_Factura = require('./detalle_factura');
Articulo.hasMany(Detalle_Factura, "detalle_factura", "id", "id_articulo");
var Categoria = require('./categoria');
Articulo.belongsTo(Categoria, "categoria", "id_categoria", "id");
/**
 * Realacion con la tabla galeria art 
 */
var Galeria = require('./galeriaArticulo');
Articulo.hasMany(Galeria, "galeria", "id", "id_articulo");