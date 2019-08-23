'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
var factura = require('../modelo/factura');
class facturaControlador {

    /**
         *Metodo para presentacion de datos para la factura
         *  @param {solicitud} req 
         *  @param  {respuesta} res
         */

    visualizaFactura(req, res) {
        factura.then(function (resultFactura) {
            var nro = "0000" + (resultFactura.length + 1);
            articulo.getJoin({ categoria: true }).then(function (listaA) {
                if (req.session.factura == undefined) {
                    req.session.factura = [];
                }
                res.render('index1', {
                    layout: 'layout1', title: 'Facturación',
                    fragmento: 'vistaAdministrador/Factura/factura',
                    active: { factura: true },
                    sesion: true,
                    listaA: listaA,
                    usuario: { persona: req.user.nombre },
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
    /**
     * Metodo que permite caragar un articulo en la factura
     * @param {session,external} req 
     * @param {articulo} res 
     */
    agregarItem(req, res) {
        var factura = req.session.factura;
        var external = req.query.external;
        console.log(external);
        articulo.filter({ external_id: external }).getJoin({ categoria: true }).then(function (articl) {
            if (articl.length >= 0) {
                var artic = articl[0];
                console.log(artic);
                var pos = facturaControlador.verificar(factura, external);
                if (pos == -1) {
                    var datos = {
                        external: external,
                        nombre: artic.nonbre,
                        cantidad: 1,
                        precio: artic.precio,
                        precio_total: artic.precio,
                        stock: artic.stok,
                        categoria: artic.categoria.nombre
                    };
                    console.log(datos);
                    factura.push(datos);
                } else {
                    var dato = factura[pos];
                    if (dato.cantidad < dato.stock) {
                        dato.cantidad = dato.cantidad + 1;
                    }
                    dato.precio_total = dato.cantidad * dato.precio;
                    factura[pos] = dato;
                }
                req.session.factura = factura;
                console.log(req.session.factura);
                res.status(200).json(req.session.factura);
            }
        }).error(function (error) {
            req.flash('error', "Se produjo un error al enciar datos");
            res.redirect('/')
        });

    }
    /**
     * Metodo que permite quitar un articulo dela factura
     * @param {session,external} req 
     * @param {articulo} res 
     */
    quitarItem(req, res) {
        var factura = req.session.factura;
        var external = req.query.external;
        var pos = facturaControlador.verificar(factura, external);
        var dato = factura[pos];
        if (dato.cantidad > 1) {
            dato.cantidad = dato.cantidad - 1;
            dato.precio_total = dato.cantidad * dato.precio;
            factura[pos] = dato;
            req.session.factura = factura;
            res.status(200).json(req.session.factura);
        } else {
            var aux = [];
            for (var i = 0; i < factura.length; i++) {
                var items = factura[i];
                if (items.external != external) {
                    aux.push(items);
                }
            }
            req.session.factura = aux;
            res.status(200).json(req.session.factura);
        }

    }

    /**
     * Metodo que permite la visualizacion de datos en la factura
     */
    mostrarCarrito1(req, res) {
        res.status(200).json(req.session.factura);
    }

    /**
     * Verifica la cantida de articulos en la tabla
     */
    static verificar(lista, external) {
        var pos = -1;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].external == external) {
                pos = i;
                break;
            }
        }
        return pos;
    }

}
module.exports = facturaControlador;