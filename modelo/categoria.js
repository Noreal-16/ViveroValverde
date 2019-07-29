var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Categoria = thinky.createModel("Categoria", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    nombre: type.string(),
    descripcion: type.string(),
    estado: type.boolean(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now())
});
module.exports = Categoria;
var Articulo = require('./articulo');
Categoria.hasMany(Articulo, "articulo", "id", "id_articulo");