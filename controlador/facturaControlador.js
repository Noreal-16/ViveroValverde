'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
var factura = require('../modelo/factura');
var persona = require('../modelo/persona');
var servicio = require('../modelo/servicio');
var detalleFactura = require('../modelo/detalle_factura');
var detalleServicio = require('../modelo/detalle_servicio');
/**
 * @class {*} {facturaControlador}
 */
class facturaControlador {

    /**
     *Metodo para presentacion de datos para la factura
     *  @param {solicitud} req requiere una solicitud de redireccionamiento 
     *  @param  {respuesta} res solo redirije
     */

    visualizaFactura(req, res) {
        if (req.session.factura == undefined) {
            req.session.factura = [];
        }
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
            persona.getJoin({ cuenta: true }).then(function (resultLista) {
                articulo.getJoin({ categoria: true }).then(function (listaA) {
                    res.render('index1', {
                        layout: 'layout1',
                        title: 'Facturación',
                        fragmento: 'vistaAdministrador/Factura/factura',
                        active: { factura: true },
                        sesion: true,
                        listaA: listaA,
                        listaCli: resultLista,
                        usuario: { persona: req.user.nombre },
                        nro: nro,
                        msg: {
                            error: req.flash('error'),
                            info: req.flash('info'),
                            success: req.flash('success')
                        }
                    });
                }).error(function (error) {
                    req.flash('error', 'Hubo un error!' + error);
                    res.redirect('/Admin');
                })
            }).error(function (error) {
                req.flash('error', 'Hubo un error!' + error);
                res.redirect('/Admin');
            });
        }).error(function (error) {
            req.flash('error', 'Hubo un error!' + error);
            res.redirect('/Admin');
        });

    }
    /**
     * Metodo que permite caragar un articulo en la factura
     * @param {session,external} req  requiere la session y external para agregar item a la tabla
     * @param {articulo} res  envia el articulo
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
            res.redirect('/Admin')
        });

    }
    /**
     * Metodo que permite quitar un articulo dela factura
     * @param {session,external} req  requiere la session y external para agregar item a la tabla
     * @param {articulo} res  envia el articulo
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
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    mostrarCarrito1(req, res) {
        res.status(200).json(req.session.factura);
    }

    /**
     * Verifica la cantida de articulos en la tabla
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
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
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    guardar(req, res) {
        var datosFact = JSON.parse(req.body.dataA);
        var datosArt = JSON.parse(req.body.listaArt);
        var datosServ = JSON.parse(req.body.listaSer);
        console.log("factura");
        console.log(datosFact)
        console.log("Articulo");
        console.log(datosArt.length)
        console.log("Servicio");
        console.log(datosServ.length);
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
                    if (datosArt.length > 0) {
                        datosArt.forEach(elementItem => {
                            articulo.filter({ external_id: elementItem.external }).then(function (articuloArt) {
                                if (articuloArt.length >= 0) {
                                    var articulo = articuloArt[0];
                                    var dataDetalle = {
                                        cantidad: elementItem.cantidad,
                                        precio_unit: elementItem.precio,
                                        precio_total: elementItem.precio_total,
                                        id_articulo: articulo.id,
                                        id_factura: facturaSave.id
                                    }
                                    var detalleS = new detalleFactura(dataDetalle);
                                    detalleS.save().then(function (detalleSave) {
                                        articulo.stok = (articulo.stok - elementItem.cantidad);
                                        articulo.save().then(function (resultArticulo) {
                                            req.session.carrito = [];
                                            res.json({ data: "ok" });
                                        }).error(function (error) {
                                            res.json({ data: "error" });
                                        });
                                    }).error(function (error) {
                                        res.json({ data: " error en detalle Detalle Factura" + error });
                                    });
                                } else {
                                    res.json({ data: " error en detalle Detalle Factura" + error });
                                }
                            }).error(function (error) {
                                res.json({ data: " error en detalle Detalle Factura" + error });
                            });
                        });
                    }
                    if (datosServ.length > 0) {
                        datosServ.forEach(elementItem => {
                            servicio.filter({ external_id: elementItem.external }).then(function (servicioResult) {
                                if (servicioResult.length >= 0) {
                                    var servic = servicioResult[0];
                                    var dataDetalle = {
                                        cantidad: elementItem.cantidad,
                                        precio_unit: elementItem.precio,
                                        precio_total: elementItem.precio_total,
                                        id_servicio: servic.id,
                                        id_factura: facturaSave.id
                                    }
                                    var detalleS = new detalleServicio(dataDetalle);
                                    detalleS.save().then(function (detalleSave) {
                                        req.session.carritoServicio = [];
                                        res.json({ data: "ok" });
                                    }).error(function (error) {
                                        res.json({ data: " error en detalle Detalle Factura" + error });
                                    });
                                } else {
                                    res.json({ data: " error en detalle Detalle Factura" + error });
                                }
                            }).error(function (error) {
                                res.json({ data: " error en detalle Detalle Factura" + error });
                            });


                        });
                    }
                    // res.json({ data: "Factura guardada con exito", idFactura: facturaSave.id });
                }).error(function (error) {
                    res.json({ data: "error al guardar factura" + error });
                });
            } else {
                res.json({ data: "Ocurrio un error con la persona" });
            }

        }).error(function (error) {
            res.json({ data: "Ocurrio un error contactarse con el desarrollador del sistema" + error });
        });
    }
    /**
     * Metodo para guardar detalle de factura y actualizar stock de articulo
     * @param {data json} req 
     * @param {data mensaje} res 
     */
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
                        req.session.carrito = [];
                        req.session.carritoServicio = [];
                        res.json({ data: " Detalle Factura guardada con exito" });
                    }).error(function (error) {
                        res.json({ data: " error al actualizar articulo" });
                    });
                }).error(function (error) {
                    res.json({ data: " error en detalle Detalle Factura" + error });
                });
            } else {
                res.json({ data: " error en detalle Detalle Factura" + error });
            }
        }).error(function (error) {
            res.json({ data: " error en detalle Detalle Factura" + error });
        });
    }

    /**
     *  Metodo para guardar factura desde la vista del administrador
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    guardarFcaturaAdmin(req, res) {
        var datosFact = JSON.parse(req.body.dataF);
        var lista = JSON.parse(req.body.listaArt);
        console.log("Giardar factura desde administrador")
        console.log(datosFact);
        console.log(lista);
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
                    lista.forEach(elementItem => {
                        articulo.filter({ external_id: elementItem.external }).then(function (articuloArt) {
                            if (articuloArt.length >= 0) {
                                var articulo = articuloArt[0];
                                var dataDetalle = {
                                    cantidad: elementItem.cantidad,
                                    precio_unit: elementItem.precio,
                                    precio_total: elementItem.precio_total,
                                    id_articulo: articulo.id,
                                    id_factura: facturaSave.id
                                }
                                var detalleS = new detalleFactura(dataDetalle);
                                detalleS.save().then(function (detalleSave) {
                                    articulo.stok = (articulo.stok - elementItem.cantidad);
                                    articulo.save().then(function (resultArticulo) {
                                        req.session.factura = [];
                                        res.json({ data: "ok" });
                                    }).error(function (error) {
                                        res.json({ data: "error" });
                                    });
                                }).error(function (error) {
                                    res.json({ data: " error en detalle Detalle Factura" + error });
                                });
                            } else {
                                res.json({ data: " error en detalle Detalle Factura" + error });
                            }
                        }).error(function (error) {
                            res.json({ data: " error en detalle Detalle Factura" + error });
                        });
                    });
                }).error(function (error) {
                    res.json({ data: "error al guardar factura" });
                });
            } else {
                res.json({ data: "error al guardar factura" });
            }
        }).error(function (error) {
            res.json({ data: "Ocurrio un error contactarse con el desarrollador del sistema: ", error: error });
        });
    }

    /**
     * Metodo para visualizar pedidos en la tabla
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */

    visualizarPedidos(req, res) {
        factura.filter({ tipo_fact: "pedido" }).getJoin({ persona: true }).then(function (resulLista) {
            console.log(resulLista);
            var numero = resulLista.length;
            res.render('index1', {
                layout: 'layout1',
                title: 'Pedidos',
                sesion: true,
                fragmento: 'vistaAdministrador/Pedidos/pedidos',
                active: { pedido: true },
                usuario: { persona: req.user.nombre },
                nro: numero,
                lista: resulLista,
                msg: {
                    error: req.flash('error'),
                    info: req.flash('info'),
                    success: req.flash('success')
                }
            });
        }).error(function (error) {
            req.flash('error', 'Hubo un error!' + error);
            res.redirect('/Admin');
        })
    }
    /**
     * Metodo para caragar clientes en la tabla de pedidos
     * @param {external cliente} req 
     * @param {json cliente} res 
     */
    cargarClientePedido(req, res) {
        var external = req.query.external;
        var data;
        persona.get(external).then(function (persona) {
            data = {
                cedula: persona.cedula,
                nombre: persona.nombres,
                apellido: persona.apellidos,
                direccion: persona.direccion,
                telefono: persona.telefono,
                celular: persona.celular,
                external_id: persona.external_id
            };
            res.json(data);
        }).error(function (error) {
            res.json({ data: "Error al traer cliente" });
        })
    }


    /**
     * metodo que permite caragar datos del pedido y su detalle eb la vista
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    cargarPedidoDetalle(req, res) {
        var external = req.query.external;
        var data;
        factura.get(external).then(function (resultFac) {
            console.log("Presenta factura ");
            console.log(resultFac);
            persona.get(resultFac.id_persona).getJoin({ cuenta: true }).then(function (resultPers) {
                console.log("Presenta datos persona");
                console.log(resultPers);
                detalleFactura.filter({ id_factura: resultFac.id }).getJoin({ articulo: true }).then(function (resultDetalle) {
                    console.log("Presenta detalle");
                    console.log(resultDetalle);
                    detalleServicio.filter({ id_factura: resultFac.id }).getJoin({ servicio: true }).then(function (resultServicio) {
                        console.log("Presenta detalle");
                        console.log(resultServicio);
                        data = {
                            factura: resultFac,
                            persona: resultPers,
                            detalle: resultDetalle,
                            detalleS: resultServicio
                        };
                        res.json(data);
                    }).error(function (error) {
                        res.json({ data: "Error al traer detalle de factura" });
                    })
                }).error(function (error) {
                    res.json({ data: "Error al traer detalle de factura" });
                })
            }).error(function (error) {
                res.json({ data: "Error al traer persona" });
            })
        }).error(function (error) {
            res.json({ data: "Error al traer factura" });
        })
    }


    /**
     * Metodo que permite despachar el pedido 
     * @param {external factura} req requiere el external de factura para despachar pedido
     * @param {*} res 
     */
    despacharPedido(req, res) {
        var external = req.body.externalFcatura;
        factura.get(external).then(function (resultFac) {
            resultFac.tipo_fact = "factura";
            resultFac.save().then(function (save) {
                req.flash('success', 'Pedido despachado correctamente!');
                res.redirect('/Pedido');
            }).error(function (error) {
                req.flash('error', 'Hubo un error!' + error);
                res.redirect('/Admin');
            })
        }).error(function (error) {
            req.flash('error', 'Hubo un error!' + error);
            res.redirect('/Admin');
        });
    }
}
module.exports = facturaControlador;