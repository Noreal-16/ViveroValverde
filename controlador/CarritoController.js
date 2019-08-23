'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
var servicio = require('../modelo/servicio');

class CarritoController {
    /**
     * metodo para agregar articulos al carrito de compras
     * @param {*} req 
     * @param {*} res 
     */
    agregarItem(req, res) {
            var carrito = req.session.carrito;
            var external = req.params.external;
            articulo.filter({ external_id: external }).getJoin({ categoria: true }).then(function(articl) {
                if (articl.length >= 0) {
                    var artic = articl[0];
                    var pos = CarritoController.verificar(carrito, external);
                    if (pos == -1) {
                        var datos = {
                            external: external,
                            nombre: artic.nonbre,
                            cantidad: 1,
                            precio: artic.precio,
                            precio_total: artic.precio,
                            categoria: artic.categoria.nombre,
                            stock: artic.stok
                        };
                        console.log(datos);
                        carrito.push(datos);
                    } else {
                        var dato = carrito[pos];
                        if (dato.cantidad < dato.stock) {
                            dato.cantidad = dato.cantidad + 1;
                        }
                        dato.precio_total = dato.cantidad * dato.precio;
                        carrito[pos] = dato;

                    }
                    req.session.carrito = carrito;
                    console.log(req.session.carrito);
                    res.status(200).json(req.session.carrito);
                }
            }).error(function(error) {
                req.flash('error', "Se produjo un error al enciar datos");
                res.redirect('/')
            });

        }
        /**
         * metodo para agregar al carrito de compras los servicios
         * @param {M} req 
         * @param {*} res 
         */
    agregarServicio(req, res) {
            var carrito = req.session.carrito;
            var external = req.params.external;
            servicio.filter({ external_id: external }).then(function(serv) {
                if (serv.length >= 0) {
                    var itemServ = serv[0];
                    var pos = CarritoController.verificar(carrito, external);
                    if (pos == -1) {
                        var datos = {
                            external: external,
                            nombre: itemServ.nonbre,
                            cantidad: 1,
                            precio: itemServ.precio,
                            precio_total: itemServ.precio,
                            categoria: itemServ.descripcion,
                            stock: 1

                        };
                        console.log(datos);
                        carrito.push(datos);
                    } else {
                        var dato = carrito[pos];
                        dato.cantidad = 1;
                        dato.precio_total = dato.cantidad * dato.precio;
                        carrito[pos] = dato;
                    }
                    req.session.carrito = carrito;
                    console.log(req.session.carrito);
                    res.status(200).json(req.session.carrito);
                }
            }).error(function(error) {
                req.flash('error', "Se produjo un error al enciar datos");
                res.redirect('/')
            });
        }
        /**
         * metodo para disminuir unidades del carrito
         * @param {*} req 
         * @param {*} res 
         */
    quitarItem(req, res) {
            var carrito = req.session.carrito;
            var external = req.params.external;
            var pos = CarritoController.verificar(carrito, external);
            var dato = carrito[pos];
            if (dato.cantidad > 1) {
                dato.cantidad = dato.cantidad - 1;
                dato.precio_total = dato.cantidad * dato.precio;
                carrito[pos] = dato;
                req.session.carrito = carrito;
                res.status(200).json(req.session.carrito);
            } else {
                var aux = [];
                for (var i = 0; i < carrito.length; i++) {
                    var items = carrito[i];
                    if (items.external != external) {
                        aux.push(items);
                    }
                }
                req.session.carrito = aux;
                res.status(200).json(req.session.carrito);
            }

        }
        /**
         * metodo para mostar los datos en la tabla de pedidos
         * @param {*} req 
         * @param {*} res 
         */
    mostrarCarrito(req, res) {
            res.status(200).json(req.session.carrito);
        }
        /**
         * metodo para verificar si existen o no datos repetidos en el carrito
         * @param {*} lista 
         * @param {*} external 
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
         * metodo para llamar a la tabla del carrito con sus productos
         * @param {*} req 
         * @param {*} res 
         */
    carrito(req, res) {
        if (req.user != undefined && req.user.nombre != undefined) {

            res.render('index', {
                titulo: 'Panel de Usuario',
                fragmento: 'carrito/carritoPr',
                sesion: true,
                usuario: { persona: req.user.nombre },
                msg: { error: req.flash('error'), info: req.flash('info') }
            });
        } else {

            res.render('index', {
                titulo: 'Panel de Usuario',
                fragmento: 'carrito/carritoPr',
                sesion: false,
                msg: { error: req.flash('error'), info: req.flash('info') }
            });
        }
    }
}

module.exports = CarritoController;