'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
var factura = require('../modelo/factura');
class facturaControlador {



    /**
         *Metodo para presentacion de datos para la factura
         * @section Factura
         *  @type  get
         *  @param {solicitud} req 
         *  @url /Factura 
         *  @param  {respuesta} res
         */

    visualizaFactura(req, res) {
        factura.then(function (resultFactura) {
            var nro = "#0000" + (resultFactura.length + 1);
            articulo.getJoin({ categoria: true }).then(function (listaA) {
                res.render('index1', {
                    layout: 'layout1', title: 'Facturación',
                    fragmento: 'vistaAdministrador/Factura/factura',
                    active: { factura: true },
                    sesion: true,
                    listaA: listaA,
                    nro: nro,
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info'),
                        success: req.flash('success')
                    }
                });
            }).error(function (error) {
                req.flash('error', 'Hubo un error!');
                res.redirect('/Admin');
            });
        }).error(function (error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/Admin');
        });

    }



}
module.exports = facturaControlador;