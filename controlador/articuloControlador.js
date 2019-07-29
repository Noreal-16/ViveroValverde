'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
class articuloControlador {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */

    guardar(req, res) {
        categoria.filter({ external_id: req.body.categoria }).then(function(catg) {
            if (catg.length > 0) {
                var datosA = {
                    nonbre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    tamanio: req.body.tamanio,
                    stok: req.body.stock,
                    precio: req.body.precio,
                    id_categoria: catg[0].id
                }
                var articuloC = new articulo(datosA);
                articuloC.save().then(function(articuloSave) {
                    res.send(articuloSave);
                }).error(function(error) {
                    res.send(error);
                });
            } else {
                req.flash('error', 'No existe la categoria!');
                res.redirect('/');
            }

        }).error(function(error) {
            req.flash('error', 'Se produjo un error comunicarse con el desarrollador!');
            res.redirect('/');
        });

    }
}
module.exports = articuloControlador;