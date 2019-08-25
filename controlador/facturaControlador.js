'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
var factura = require('../modelo/factura');
var persona = require('../modelo/persona');
var detalleFactura = require('../modelo/detalle_factura');
class facturaControlador {

    /**
     *Metodo para presentacion de datos para la factura
     *  @param {solicitud} req 
     *  @param  {respuesta} res
     */

    visualizaFactura(req, res) {
        factura.then(function (resultFactura) {
            var valor = 0;
            var nro = resultFactura.length + 1;
            if (nro < 10) {
                valor = '0000000' + nro;
            } else if (nro >= 10 || nro <= 99) {
                valor = '000000' + nro;
            } else if (nro >= 100 || nro <= 9999) {
                valor = '00000' + nro;
            }
            nro = valor;

            articulo.getJoin({ categoria: true }).then(function (listaA) {
                if (req.session.factura == undefined) {
                    req.session.factura = [];
                }
                res.render('index1', {
                    layout: 'layout1',
                    title: 'Facturación',
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
    /**
     * Guardar factura
     */
    guardar(req, res) {
        var datosFact = JSON.parse(req.body.dataA);
        console.log("Presenta datos factura: ");
        console.log(datosFact);
        console.log("Presenta datos factura: ");
        console.log(datosFact.external_id);
        console.log(datosFact.fecha_pedido);
        console.log(datosFact.fecha_entrga);
        console.log(datosFact.subtotal);
        console.log(datosFact.total);
        console.log(datosFact.iva);
        console.log(datosFact.descuento);
        console.log(datosFact.tipo_pago);
        console.log(datosFact.tipo_fact);
        persona.filter({ external_id: datosFact.external_id }).then(function (personaFactura) {
            if (personaFactura.length >= 0) {
                var personaF = personaFactura[0];
                var datosFactura = {
                    fecha_pedido: datosFact.fecha_pedido,
                    fecha_entrga: datosFact.fecha_entrga,
                    iva: datosFact.iva,
                    subtotal: datosFact.subtotal,
                    total: datosFact.total,
                    decuento: datosFact.descuento,
                    tipo_pago: datosFact.tipo_pago,
                    tipo_fact: datosFact.tipo_fact,
                    id_persona: personaF.id
                }
                var facturaS = new factura(datosFactura);
                facturaS.save().then(function (facturaSave) {
                    res.json({ data: "Factura guardada con exito", idFactura: facturaSave.id });
                }).error(function (error) {

                    res.json({ data: "error al guardar factura" });
                });
            } else {
                req.flash('error', "Ocurrio un error con la persona");
                res.redirect('/');
            }

        }).error(function (error) {
            req.flash('error', "Ocurrio un error contactarse con el desarrollador del sistema");
            res.redirect('/');
        });
    }
    guardaDetalle(req, res) {
        var data = req.body.item;
        var datos = JSON.parse('{"' + data.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) });
        var id = req.body.id;
        console.log(id);
        console.log(datos);
        articulo.filter({ external_id: datos.external }).then(function (articuloDetalle) {
            console.log(articuloDetalle);
            if (articuloDetalle.length >= 0) {
                var articulo = articuloDetalle[0];
                var dataDetalle = {
                    cantidad: datos.cantidad,
                    precio_unit: datos.precio,
                    precio_total: datos.precio_total,
                    id_articulo: articulo.id,
                    id_factura: id
                }
                var detalleS = new detalleFactura(dataDetalle);
                detalleS.save().then(function (detalleSave) {
                    articulo.stok = (articulo.stok - datos.cantidad);
                    articulo.save().then(function (resultArticulo) {
                        req.session.carrito=[];
                        req.session.carritoServicio=[];
                        res.json({ data: " Detalle Factura guardada con exito" });
                    }).error(function (error) {
                        res.json({ data: " error al actualizar articulo" });
                    });
                }).error(function (error) {
                    res.json({ data: " error en detalle Detalle Factura" + error});
                });
            } else {
                res.json({ data: " error en detalle Detalle Factura" + error});
            }
        }).error(function (error) {
            res.json({ data: " error en detalle Detalle Factura" + error});
        });


    }

}
module.exports = facturaControlador;