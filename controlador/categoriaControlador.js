'use strict';
var Categoria = require('../modelo/categoria');

class categoriaControlador {

    visualizar(req, res) {
        Categoria.then(function(result) {
            res.render('index', {
                title: 'Articulos',
                fragmento: "articulo",
                sesion: true,
                lista: result,
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
    guardar(req, res) {
        var datosC = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            estado: true
        };
        var categoriaC = new Categoria(datosC);
        categoriaC.save().then(function(result) {
            req.flash('info', 'Se guardo correctamente');
            res.redirect('/Administra/categorias');

        }).error(function(error) {
            req.flash('error', 'No se pudo registrar!');
            res.redirect('/Administra/categorias');
        });

    }
    visualizarModificar(req, res) {
        var external = req.params.external;
        Categoria.filter({ external_id: external }).then(function(categoriaLista) {
            if (categoriaLista.length > 0) {
                var lista = categoriaLista[0];
                var msgListador = {
                    error: req.flash("error"),
                    info: req.flash("info")
                };
                res.render("index", {
                    title: "Listado de Categorias",
                    sesion: true,
                    fragmento: 'modificarArticulo',
                    msg: msgListador,
                    lista: lista,

                });

            } else {
                res.flash('error', 'Se produjo un error en categorias');
                res.redirect('/Administra/categorias');
            }
        }).error(function(erro) {
            res.send(erro);
        });
    }
    modificarCategoris(req, res) {
        Categoria.filter({ external_id: req.body.external }).then(function(categoriaLista) {
            if (categoriaLista.length > 0) {
                var catgLista = categoriaLista[0];
                catgLista.nombre = req.body.nombre;
                catgLista.descripcion = req.body.descripcion;
                catgLista.save().then(function(modificaLista) {
                    req.flash('info', 'Se guardo la categoria correctamente');
                    res.redirect('/Administra/categorias');
                }).error(function(error) {
                    res.flash('error', 'Se produjo un error en categorias');
                    res.redirect('/Administra/categorias');
                });

            } else {
                res.flash('error', 'Se produjo un error en categorias');
                res.redirect('/Administra/categorias');
            }
        }).error(function(error) {
            res.send(error);
        });
    }

}
module.exports = categoriaControlador;