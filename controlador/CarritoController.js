'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
var utilidades = require('../controlador/rolControlador');

/**
 * @class {*} {CarritoController}
 */
class CarritoController {

    /**
     * metodo para agregar articulos al carrito de compras
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
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
     * metodo para disminuir unidades del carrito
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
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
         * @param {*} req para pedidos al servidor
         * @param {*} res para respuesta
         */
    mostrarCarrito(req, res) {
            res.status(200).json(req.session.carrito);
        }
        /**
         * metodo para verificar si existen o no datos repetidos en el carrito
         * @param {*} lista verifica el tamanio de la lista
         * @param {*} external verifica si encuentra la lista del external
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
         * @param {*} req para pedidos al servidor
         * @param {*} res para respuesta
         */
    carrito(req, res) {
        utilidades.crearsessiones(req);
        if (req.session.carrito.length >= 1 || req.session.carritoServicio.length >= 1) {
            if (req.user != undefined && req.user.nombre != undefined) {

                //console.log(" Este es la variable session " + req.session.carrito);
                res.render('index', {
                    titulo: 'Panel de Usuario',
                    fragmento: 'carrito/carritoPr',
                    sesion: true,
                    usuario: { persona: req.user.nombre, external: req.user.exter },
                    msg: { error: req.flash('error'), info: req.flash('info') }
                });
            } else {
                //console.log(" Este es la variable session " + req.session.carrito.length);
                res.render('index', {
                    titulo: 'Panel de Usuario',
                    fragmento: 'carrito/carritoPr',
                    sesion: false,
                    msg: { error: req.flash('error'), info: req.flash('info') }
                });
            }
        } else {
            req.flash('info', "Por favor agregue un producto al carrito de compras");
            res.redirect('/');
        }

    }
}

module.exports = CarritoController;