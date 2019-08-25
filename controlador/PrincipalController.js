'use strict';
var persona = require('../modelo/persona');
var rol = require('../modelo/rol');
var factura = require('../modelo/factura');
var detalleFcatura = require('../modelo/detalle_factura');
class PrincipalController {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    cargardatosPrincipal(req, res) {
        rol.filter({ nombre: "Usuario" }).then(function (resultR) {
            persona.filter({ id_Rol: resultR[0].id }).then(function (lista) {
                var listaClie = lista.length;
                factura.filter({ tipo_fact: "pedido" }).getJoin({ persona: true }).then(function (resulLista) {
                    var numPed = resulLista.length;
                    res.render(
                        'index1', {
                            layout: 'layout1',
                            title: 'Vivero Valverde',
                            fragmento: 'principal/principal',
                            usuario: { persona: req.user.nombre },
                            active: { inicio: true },
                            numeroCli: listaClie,
                            numeroPed: numPed,
                            usuario: { persona: req.user.nombre },
                            msg: {
                                error: req.flash('error'),
                                info: req.flash('info'),
                                success: req.flash('success')
                            },
                            listaPedidos: resulLista
                        })
                }).error(function (error) {
                    req.flash('error', 'Hubo un error!');
                    res.redirect('/Admin');
                })
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

module.exports = PrincipalController;