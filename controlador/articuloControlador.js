'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
class articuloControlador {

    visualizarRegistro(req, res) {
        categoria.filter({ estado: true }).then(function(lista) {
            res.render('index', {
                title: 'Articulos',
                fragmento: "articulo",
                sesion: true,
                lista: lista,
                msg: {
                    error: req.flash('error'),
                    info: req.flash('info')
                }
            });
        }).error(function(error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }

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
    visualizarModificar(req, res) {
        var external = req.param.external;
        articulo.getJoin({ categoria: true }).filter({ external_id: external }).then(function(listaArticulo) {
            if (listaArticulo.length > 0) {
                var artc = listaArticulo[0];
                categoria.filter({ estado: true }).then(function(lista) {
                    var msgListador = {
                        error: req.flash("error"),
                        info: req.flash("info")
                    };

                    res.render("index", {
                        title: "lista Articulos",
                        sesion: true,
                        fragmento: 'modificarArticulo',
                        msg: msgListador,
                        listado: artc,
                        lista: lista
                    });
                }).error(function(error) {
                    req.flash('error', 'error al encontran la categoria');
                    res.redirect('/');
                });

            } else {
                req.flash('error', 'error no existen datos ');
                res.redirect('/');
            }
        }).error(function(error) {
            req.flash('error', 'Ocurrio un error comunicarse con el desarrollador');
            res.redirect('/');
        });
    }
}
module.exports = articuloControlador;