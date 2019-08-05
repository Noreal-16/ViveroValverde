'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
class articuloControlador {

    /**
     * Visualizacion de datos para el cliente
     * @param {*} req 
     * @param {*} res 
     */
    visualizarRegistro(req, res) {
        categoria.filter({ estado: true }).then(function(lista) {
            res.render('index', {
                title: 'Plantas y Flores',
                fragmento: "articulo/articulo",
                sesion: true,
                lista: lista,
                msg: {
                    error: req.flash('error'),
                    info: req.flash('info')
                }
            });
        }).error(function(error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }

    /**
     * Visualizacion de datos para el administrador
     * @param {*} req 
     * @param {*} res 
     */
    visualizarLista(req, res) {
        articulo.getJoin({ categoria: true }).then(function(listaA) {
            categoria.filter({ estado: true }).then(function(listaC) {
                res.render('index', {
                    title: 'Administra Articulos',
                    fragmento: "articulo/listaArticulo",
                    sesion: true,
                    listaA: listaA,
                    lista: listaC,
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info'),
                        success: req.flash('success')
                    }
                });
            }).error(function(error) {
                req.flash('error', 'Hubo un error!');
                res.redirect('/');
            });
        }).error(function(error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }

    /**
     * Guardar datos de los articulos deacuerdo a la categoria seleccionada
     * @param {*} req 
     * @param {*} res 
     */

    guardar(req, res) {
        categoria.filter({ external_id: req.body.categoria }).then(function(catg) {
            if (catg.length > 0) {
                var datosA = {
                    nonbre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    tamanio: req.body.tamanio,
                    stok: req.body.stock,
                    precio: req.body.precio,
                    estado: true,
                    id_categoria: catg[0].id
                }
                var articuloC = new articulo(datosA);
                articuloC.save().then(function(articuloSave) {
                    req.flash('success', 'El articulo se guardo correctamente');
                    res.redirect('/Administra/Articulo');
                }).error(function(error) {
                    req.flash('error', 'Ocurrio un error al guardar articulo');
                    res.redirect('/Administra/Articulo');
                });
            } else {
                req.flash('error', 'No existe la categoria!');
                res.redirect('/');
            }

        }).error(function(error) {
            req.flash('error', 'Se produjo un error comunicarse con el desarrollador!');
            res.redirect('/');
        });

    }

    /**
     * Permite obtener los datos de articulo con su categoria para modificarlo
     * @param {*} req 
     * @param {*} res 
     */
    cargarArticulo(req, res) {
        var external = req.param.external;
        var data;
        articulo.getJoin({ categoria: true }).filter({ external_id: external }).then(function(resultAr) {
            var artc = resultAr[0];
            categoria.filter({ estado: true }).then(function(listaC) {
                data = {
                    nombre: artc.nonbre,
                    descripcion: artc.descripcion,
                    tamanio: artc.tamanio,
                    stok: artc.stok,
                    precio: artc.precio,
                    external_id: artc.external_id,
                    external_idC: artc.categoria.external_id,
                    lista: listaC
                };
                res.json(data);
            }).error(function(error) {
                req.flash('error', 'error al encontran la categoria');
                res.redirect('/');
            });
        }).error(function(error) {
            req.flash('error', 'Ocurrio un error comunicarse con el desarrollador');
            res.redirect('/');
        });
    }

    /**
     * Metodo que permite modificar los datos del articulo
     * @param {*} req 
     * @param {*} res 
     */
    modificar(req, res) {
            articulo.filter({ external_id: req.body.external }).then(function(resultAr) {
                if (resultAr.length > 0) {
                    var articulo = resultAr[0];
                    categoria.filter({ external_id: req.body.categoria1 }).then(function(resultC) {
                        articulo.nonbre = req.body.nombreA;
                        articulo.descripcion = req.body.descripcionA;
                        articulo.tamanio = req.body.tamanioA;
                        articulo.precio = req.body.precioA;
                        articulo.stok = req.body.stockA;
                        articulo.id_categoria = resultC[0].id;
                        articulo.save().then(function(resultArticulo) {
                            req.flash('success', 'Articulo modificado correctamente');
                            res.redirect('/Administra/Articulo');
                        }).error(function(error) {
                            res.flash('error', 'Se produjo un error al modificar articulo');
                            res.redirect('/Administra/Articulo');
                        });
                    }).error(function(error) {
                        res.flash('error', 'Se produjo un error en categorias');
                        res.redirect('Administra/Articulo');
                    });
                } else {
                    res.flash('error', 'Se produjo un error en categorias');
                    res.redirect('Administra/Articulo');
                }
            }).error(function(error) {
                res.send(error);
            });
        }
        /**
         * Metodo permite desactivar articulo 
         * @param {*} req 
         * @param {*} res 
         */
    descativar(req, res) {
        var external = req.param.external;
        var data;
        articulo.filter({ external_id: external }).then(function(resultAr) {
            var articulo = resultAr[0];
            if (articulo.estado) {
                articulo.estado = false;
            } else {
                articulo.estado = true;
            }
            articulo.save().then(function(resultArticulo) {
                req.flash('info', 'Ariculo Activado/desactivado correctamente');
                res.redirect('/Administra/Articulo');
            }).error(function(error) {
                res.flash('error', 'Se produjo un error al guardar');
                res.redirect('/Administra/Articulo');
            });
            // res.json(data);
        }).error(function(error) {
            res.send(error);
        });
    }


}
module.exports = articuloControlador;