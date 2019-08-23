'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
var servicio = require('../modelo/servicio');

class PrincipalController {

    carrito(req, res) {
        res.render('index', {
            titulo: 'Panel de Usuario',
            fragmento: 'carrito/carritoPr',
            sesion: true
        });
    }

    carritoServ(req, res) {
        res.render('index', {
            titulo: 'Panel de servicio',
            fragmento: 'carrito/carritoServicio',
            sesion: true
        });
    }
}

module.exports = PrincipalController;