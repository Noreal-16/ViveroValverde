'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');

class PrincipalController {


    cargarPrincipal(req, res) {
        articulo.getJoin({ categoria: true }).then(function(listaArt) {
            if (listaArt.length >= 0) {
                // if (req.session.carrito == undefined) {
                //     req.session.carrito = [];
                // }
                res.render('index', {
                    titulo: 'Panel de Usuario',
                    sesion: true,
                    fragmento: 'carrito/Articulos',
                    listaA: listaArt
                });
            } else {
                req.flash('error', "Ocurrio un error al cargar! ");
                res.redirect('/');
            }
        }).error(function() {

        });

    }

    carrito(req, res) {
        res.render('index', {
            titulo: 'Panel de Usuario',
            fragmento: 'carrito/carritoPr',
            sesion: true
        });
    }
}

module.exports = PrincipalController;