'use strict';
var servicio = require('../modelo/servicio');

class servicioCarrito {

    /**
     * metodo para agregar al carrito de compras los servicios
     * @param {M} req 
     * @param {*} res 
     */
    agregarServicio(req, res) {
            var carritoServicio = req.session.carritoServicio;
            console.log("Este es de Servicio =============> " + carritoServicio);
            var external = req.params.external;
            console.log("Este es de Servicio =============> " + external);
            servicio.filter({ external_id: external }).then(function(serv) {
                if (serv.length >= 0) {
                    var itemServ = serv[0];
                    var pos = servicioCarrito.verificar(carritoServicio, external);
                    if (pos == -1) {
                        var datos = {
                            external: external,
                            nombre: itemServ.nombre,
                            cantidad: 1,
                            precio: itemServ.precio,
                            precio_total: itemServ.precio,
                            descripcion: itemServ.descripcion,
                            stock: 1
                        };
                        console.log(datos);
                        carritoServicio.push(datos);
                    } else {
                        var dato = carritoServicio[pos];
                        dato.cantidad = 1;
                        dato.precio_total = dato.cantidad * dato.precio;
                        carritoServicio[pos] = dato;
                    }
                    req.session.carritoServicio = carritoServicio;
                    console.log(req.session.carritoServicio);
                    res.status(200).json(req.session.carritoServicio);
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
    quitarServicio(req, res) {
            var carritoServicio = req.session.carritoServicio;
            var external = req.params.external;
            var pos = servicioCarrito.verificar(carritoServicio, external);
            var dato = carritoServicio[pos];
            if (dato.cantidad > 1) {
                dato.cantidad = dato.cantidad - 1;
                dato.precio_total = dato.cantidad * dato.precio;
                carritoServicio[pos] = dato;
                req.session.carritoServicio = carritoServicio;
                res.status(200).json(req.session.carritoServicio);
            } else {
                var aux = [];
                for (var i = 0; i < carritoServicio.length; i++) {
                    var items = carritoServicio[i];
                    if (items.external != external) {
                        aux.push(items);
                    }
                }
                req.session.carritoServicio = aux;
                res.status(200).json(req.session.carritoServicio);
            }

        }
        /**
         * metodo para mostar los datos en la tabla de pedidos
         * @param {*} req 
         * @param {*} res 
         */
    mostrarCarritoServicio(req, res) {
            res.status(200).json(req.session.carritoServicio);
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

}

module.exports = servicioCarrito;