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
            res.redirect('/Administrador/categorias');

        }).error(function(error) {
            req.flash('error', 'No se pudo registrar!');
            res.redirect('/Administrador/categorias');
        });

    }

}
module.exports = categoriaControlador;