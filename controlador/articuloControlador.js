'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
var galeria = require('../modelo/galeriaArticulo');

/**
 * Librerias para cargar imagenes 
 */
var formidable = require('formidable');
var fs = require('fs');
var extensiones = ["jpg", "png", "gif"];

class articuloControlador {

    /**
     * Visualizacion de datos para el cliente
     * @param {*} req 
     * @param {*} res 
     */
    visualizarRegistro(req, res) {
        articulo.getJoin({ categoria: true }).filter({ estado: true }).then(function (listaArt) {
            if (req.user != undefined && req.user.nombre != undefined) {
                res.render('index', {
                    title: 'Plantas y Flores',
                    fragmento: "articulo/articulo",
                    sesion: true,
                    listaA: listaArt,
                    usuario: { persona: req.user.nombre },
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info')
                    }
                });
            } else {
                res.render('index', {
                    title: 'Plantas y Flores',
                    fragmento: "articulo/articulo",
                    sesion: false,
                    listaA: listaArt,
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info')
                    }
                });
            }
        }).error(function (error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }
    /**
     * Metodo que permite listar las imagenes de los articulos en la vista cliente
     * @param {external articulo} req 
     * @param {json [data]} res 
     */
    listargaleriaArticulo(req, res) {
        var external = req.query.external;
        var data;
        articulo.filter({ external_id: external }).then(function (resulArt) {
            if (resulArt.length > 0) {
                var artic = resulArt[0];
                galeria.filter({ id_articulo: artic.id }).then(function (listgale) {
                    data = {
                        nombre: artic.nonbre,
                        external_idArt: artic.external_id,
                        descripcion: artic.descripcion,
                        tamanio: artic.tamanio,
                        stok: artic.stok,
                        precio: artic.precio,
                        lista: listgale
                    };
                    res.json(data);
                }).error(function () {

                });
            } else {

            }
        }).error(function (error) {
            req.flash('error', "Se ha registrado correctamente");
            res.redirect("/Admin");
        })
    }








    /**
     * Visualizacion de datos para el administrador
     * @param {*} req 
     * @param {*} res 
     */
    visualizarLista(req, res) {
        articulo.getJoin({ categoria: true }).then(function (listaA) {
            categoria.filter({ estado: true }).then(function (listaC) {
                res.render('index1', {
                    layout: 'layout1',
                    title: 'Administra Articulos',
                    fragmento: "vistaAdministrador/Articulo/articulo",
                    sesion: true,
                    listaA: listaA,
                    lista: listaC,
                    usuario: { persona: req.user.nombre },
                    active: { articulo: true },
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
     * Guardar datos de los articulos deacuerdo a la categoria seleccionada
     * @param {*} req 
     * @param {*} res 
     */

    guardar(req, res) {
        categoria.filter({ external_id: req.body.categoria }).then(function (catg) {
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
                articuloC.save().then(function (articuloSave) {
                    req.flash('success', 'El articulo se guardo correctamente');
                    res.redirect('/Administra/Articulo');
                }).error(function (error) {
                    req.flash('error', 'Ocurrio un error al guardar articulo');
                    res.redirect('/Administra/Articulo');
                });
            } else {
                req.flash('error', 'No existe la categoria!');
                res.redirect('/');
            }

        }).error(function (error) {
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
        var external = req.query.external;
        var data;
        articulo.getJoin({ categoria: true }).filter({ external_id: external }).then(function (resultAr) {
            var artc = resultAr[0];
            categoria.filter({ estado: true }).then(function (listaC) {
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
            }).error(function (error) {
                req.flash('error', 'error al encontran la categoria');
                res.redirect('/Admin');
            });
        }).error(function (error) {
            req.flash('error', 'Ocurrio un error comunicarse con el desarrollador');
            res.redirect('/Admin');
        });
    }

    /**
     * Metodo que permite modificar los datos del articulo
     * @param {*} req 
     * @param {*} res 
     */
    modificar(req, res) {
        articulo.filter({ external_id: req.body.external }).then(function (resultAr) {
            if (resultAr.length > 0) {
                var articulo = resultAr[0];
                categoria.filter({ external_id: req.body.categoria1 }).then(function (resultC) {
                    articulo.nonbre = req.body.nombreA;
                    articulo.descripcion = req.body.descripcionA;
                    articulo.tamanio = req.body.tamanioA;
                    articulo.precio = req.body.precioA;
                    articulo.stok = req.body.stockA;
                    articulo.id_categoria = resultC[0].id;
                    articulo.save().then(function (resultArticulo) {
                        req.flash('success', 'Articulo modificado correctamente');
                        res.redirect('/Administra/Articulo');
                    }).error(function (error) {
                        res.flash('error', 'Se produjo un error al modificar articulo');
                        res.redirect('/Administra/Articulo');
                    });
                }).error(function (error) {
                    res.flash('error', 'Se produjo un error en categorias');
                    res.redirect('Administra/Articulo');
                });
            } else {
                res.flash('error', 'Se produjo un error en categorias');
                res.redirect('Administra/Articulo');
            }
        }).error(function (error) {
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
        articulo.filter({ external_id: external }).then(function (resultAr) {
            var articulo = resultAr[0];
            if (articulo.estado) {
                articulo.estado = false;
            } else {
                articulo.estado = true;
            }
            articulo.save().then(function (resultArticulo) {
                req.flash('info', 'Ariculo Activado/desactivado correctamente');
                res.redirect('/Administra/Articulo');
            }).error(function (error) {
                res.flash('error', 'Se produjo un error al guardar');
                res.redirect('/Administra/Articulo');
            });
            // res.json(data);
        }).error(function (error) {
            res.send(error);
        });
    }

    buscador(req, res) {
        var texto = req.query.texto;
        articulo.getJoin({ categoria: true }).filter(function (data) {
            return data('nonbre').match(texto);
        }).then(function (busca) {
            res.json(busca);
        }).error(function (error) {
            req.flash('error', 'se produjo un error al busca');
            res.redirect('/Articulo')
        });
    }
    /**
     * Metodo permite visualizar imagenes
     * @param {external} req 
     * @param {list} res 
     */

    visualizarGaleria(req, res) {
        var external = req.query.external;
        var data;
        articulo.filter({ external_id: external }).then(function (resulArt) {
            if (resulArt.length > 0) {
                var artic = resulArt[0];
                galeria.filter({ id_articulo: artic.id }).then(function (listgale) {
                    data = {
                        nombre: artic.nonbre,
                        external_idArt: artic.external_id,
                        lista: listgale
                    };
                    res.json(data);
                }).error(function () {

                });
            } else {

            }
        }).error(function (error) {
            req.flash('error', "Se ha registrado correctamente");
            res.redirect("/Admin");
        })
    }

    /**
     * Metodo para guradar imagen el base de datos
     * @param {file} req 
     * @param {*} res 
     */
    subirImagenes(req, res) {
        var form = new formidable.IncomingForm();
        form.maxFileSize = 200 * 1024 * 1024;
        form.parse(req, function (err, fiels, files) {
            console.log("llega 2");
            var external1 = fiels.externalArticulo;
            console.log("EXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:     " + external1);
            console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT     " + files.archivo.size);

            if (files.archivo.size <= form.maxFileSize) {
                var extension = files.archivo.name.split(".").pop().toLowerCase();
                if (extensiones.includes(extension)) {
                    var external = fiels.externalArticulo;
                    var nombrefoto = new Date().toISOString() + "." + extension;
                    fs.rename(files.archivo.path, "public/images/uploads/" + nombrefoto, function (err) {
                        if (err) {
                            req.flash('error', "El tipo de archvo tiene que ser de imagen: " + err);
                            res.redirect("/Foto");
                        } else {
                            articulo.filter({ external_id: external }).then(function (resultArt) {
                                if (resultArt.length > 0) {
                                    var datosGa = {
                                        nonbre: nombrefoto,
                                        id_articulo: resultArt[0].id
                                    };
                                    var galeriaC = new galeria(datosGa);
                                    galeriaC.save().then(function (galeriaSave) {
                                        req.flash('success', 'La imagen se guardo correctamente');
                                        res.redirect('/Administra/Articulo');
                                    }).error(function (error) {
                                        req.flash('error', 'Ocurrio un error al guardar Imagen');
                                        res.redirect('/Administra/Articulo');
                                    });
                                } else {

                                }
                            }).error(function (error) {
                                req.flash('error', "El tipo de archvo tiene que ser de imagen");
                                res.redirect('/Administra/Articulo');
                            });
                        }
                    });
                } else {
                    req.flash('error', "El tipo de archvo tiene que ser de imagen");
                    res.redirect('/Administra/Articulo');
                }
            } else {
                req.flash('error', "El tamaño no puede superar a 1MB");
                res.redirect('/Administra/Articulo');
            }

        });
    }

}
module.exports = articuloControlador;