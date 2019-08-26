'use strict';
var persona = require('../modelo/persona');
var rol = require('../modelo/rol');
var articulo = require('../modelo/articulo');
var factura = require('../modelo/factura');
var detalleFcatura = require('../modelo/detalle_factura');
class reportesControlador {
    /**
     * Metodo para presentar reportes de factura
     * @param {fecha} req 
     * @param {*} res 
     */
    reporteFactura(req, res) {
        factura.then(function (resultFact) {
            res.render(
                'index1', {
                    layout: 'layout1',
                    title: 'Reporte factura',
                    fragmento: 'vistaAdministrador/Reportes/repfactura',
                    usuario: { persona: req.user.nombre },
                    active: { reportef: true, menu1: true },
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info'),
                        success: req.flash('success')
                    },
                    listaf: resultFact
                })
        }).error(function (error) {
            req.flash('error', "Error al presentar vista de reportes de factura");
            res.redirect("/Admin");
        })

    }
    reporteCliente(req, res) {
        persona.getJoin({ cuenta: true }).then(function (resultPers) {
            res.render(
                'index1', {
                    layout: 'layout1',
                    title: 'Reporte Clientes',
                    fragmento: 'vistaAdministrador/Reportes/repcliente',
                    usuario: { persona: req.user.nombre },
                    active: { reporteC: true, menu1: true },
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info'),
                        success: req.flash('success')
                    },
                    listaP: resultPers

                })
        }).error(function (error) {
            req.flash('error', "Error al presentar vista de reportes de cliente");
            res.redirect("/Admin");
        })

    }
    reporteArticulo(req, res) {
        articulo.getJoin({ categoria: true }).then(function (resultArt) {
            res.render(
                'index1', {
                    layout: 'layout1',
                    title: 'Reporte Articulo',
                    fragmento: 'vistaAdministrador/Reportes/repArticulo',
                    usuario: { persona: req.user.nombre },
                    active: { reporteA: true, menu1: true },
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info'),
                        success: req.flash('success')
                    },
                    listaArt: resultArt
                })
        }).error(function (error) {
            req.flash('error', "Error al presentar vista de reportes de cliente");
            res.redirect("/Admin");
        })
    }
}

module.exports = reportesControlador;