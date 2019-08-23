'use strict';
var Servicio = require('../modelo/servicio');
var galeria = require('../modelo/galeriaServicio');

/**
 * Librerias para cargar imagenes 
 */
var formidable = require('formidable');
var fs = require('fs');
var extensiones = ["jpg", "png", "gif"];

class servicioControlador {

    /**
     * visualizar los datos de servicio en pantalla para el administrador
     * @param {*} req 
     * @param {*} res 
     */
    visualizarLista(req, res) {
        Servicio.then(function (resultS) {
            res.render('index1', {
                layout: 'layout1',
                title: 'Administra Servicio',
                fragmento: "vistaAdministrador/Servicio/servicio",
                listado: resultS,
                usuario: { persona: req.user.nombre },
                active: { servicio: true },
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
    }

    listagaleriaServico(req, res) {
        var external = req.query.external;
        var data;
        Servicio.filter({ external_id: external }).then(function (resulServ) {
            if (resulServ.length > 0) {
                var serviciol = resulServ[0];
                galeria.filter({ id_servicio: serviciol.id }).then(function (listgale) {
                    data = {
                        nombre: serviciol.nombre,
                        external_idArt: serviciol.external_id,
                        descripcion: serviciol.descripcion,
                        medida: serviciol.medida,
                        precio: serviciol.precio,
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
     * Presentacion de pantalla para el cliente
     * @param {*} req 
     * @param {*} res 
     */
    visualizarServicio(req, res) {
        Servicio.filter({ estado: true }).then(function (resultS) {
            if (req.user != undefined && req.user.nombre != undefined) {
                res.render('index', {
                    title: 'Servicio Jardineria',
                    fragmento: "servicio/servicio",
                    listado: resultS,
                    sesion: true,
                    usuario: { persona: req.user.nombre },
                    msg: { error: req.flash('error'), info: req.flash('info') }
                });
            } else {
                res.render('index', {
                    title: 'Servicio Jardineria',
                    fragmento: "servicio/servicio",
                    listado: resultS,
                    msg: { error: req.flash('error'), info: req.flash('info') }
                });
            }

        }).error(function (error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }

    /**
     * Permnite guardar los datos de servicio de jardineris
     * @param {*} req 
     * @param {*} res 
     */
    guardar(req, res) {
        var datos = {
            nombre: req.body.nombre,
            medida: req.body.medida,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            estado: true
        };
        var servicio = new Servicio(datos);
        servicio.save().then(function (result) {
            req.flash('success', 'Servicio registrado!');
            res.redirect("/Administra/Servicios");
        }).catch(function (error) {
            req.flash('error', 'No se pudo registrar!');
            res.redirect("/Administra/Servicios");
        });

    }
    /**
     * Permite cargar datos en el modal de modificar servicio
     * @param {*} req 
     * @param {*} res 
     */
    cargarServicio(req, res) {
        var external = req.query.external;
        var data = {};
        Servicio.filter({ external_id: external }).then(function (result) {
            var item = result[0];
            data = {
                external_id: item.external_id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                medida: item.medida,
                precio: item.precio
            };
            res.json(data);
        }).error(function (error) {
            req.flash('error', 'No se pudo encontrar el registro!');
            res.redirect('/Admin');
        });
    }

    /**
     * Permite modificar datos del servicio deacuerdo al external
     * @param {external} req 
     * @param {*} res 
     */
    modificar(req, res) {
        Servicio.filter({ external_id: req.body.external }).then(function (data) {
            if (data.length > 0) {
                var arreglo = data[0];
                arreglo.nombre = req.body.nombrem;
                arreglo.medida = req.body.medidam;
                arreglo.precio = req.body.preciom;
                arreglo.descripcion = req.body.descripcionm;
                arreglo.saveAll().then(function (result) {
                    req.flash('success', 'Se ha modificado correctamente');
                    res.redirect('/Administra/Servicios');
                }).error(function (error) {
                    console.log(error);
                    req.flash('error', 'No se pudo modificar');
                    res.redirect('/Administra/Servicios');
                });
            } else {
                req.flash('error', 'No existe el dato a buscar');
                res.redirect('/Administra/Servicios');
            }
        }).error(function (error) {
            req.flash('error', 'se produjo un error');
            res.redirect('/Administra/Servicios');
        });
    }

    /**
     * metodo para listar las imagenes del servicio
     * @param {external de servicio} req 
     * @param {data json} res 
     */
    listarGaleria(req, res) {
        var external = req.query.external;
        var data;
        Servicio.filter({ external_id: external }).then(function (resulServicio) {
            if (resulServicio.length > 0) {
                var serv = resulServicio[0];
                galeria.filter({ id_servicio: serv.id }).then(function (listgale) {
                    data = {
                        nombre: serv.nombre,
                        external_idServ: serv.external_id,
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
    cargarImagenes(req, res) {

        var form = new formidable.IncomingForm();
        form.maxFileSize = 200 * 1024 * 1024;
        form.parse(req, function (err, fiels, files) {
            if (files.archivo.size <= form.maxFileSize) {
                var extension = files.archivo.name.split(".").pop().toLowerCase();
                if (extensiones.includes(extension)) {
                    var external = fiels.externalServicio;
                    var nombrefoto = new Date().toISOString() + "." + extension;
                    fs.rename(files.archivo.path, "public/images/uploadsServicio/" + nombrefoto, function (err) {
                        if (err) {
                            req.flash('error', "El tipo de archvo tiene que ser de imagen: " + err);
                            res.redirect("/Administra/Servicios");
                        } else {
                            Servicio.filter({ external_id: external }).then(function (resultServ) {
                                if (resultServ.length > 0) {
                                    var datosGa = {
                                        nonbre: nombrefoto,
                                        id_servicio: resultServ[0].id
                                    };
                                    var galeriaS = new galeria(datosGa);
                                    galeriaS.save().then(function (galeriaSave) {
                                        req.flash('success', 'La imagen se guardo correctamente');
                                        res.redirect('/Administra/Servicios');
                                    }).error(function (error) {
                                        req.flash('error', 'Ocurrio un error al guardar Imagen');
                                        res.redirect('/Administra/Servicios');
                                    });
                                } else {

                                }
                            }).error(function (error) {
                                req.flash('error', "El tipo de archvo tiene que ser de imagen");
                                res.redirect('/Administra/Servicios');
                            });
                        }
                    });
                } else {
                    req.flash('error', "El tipo de archvo tiene que ser de imagen");
                    res.redirect('/Administra/Servicios');
                }
            } else {
                req.flash('error', "El tamaño no puede superar a 1MB");
                res.redirect('/Administra/Servicios');
            }
        });
    }
    /**
     * permite buscar los servicios que se encuentran activos
     * @param {*} req 
     * @param {*} res 
     */
    buscador(req, res) {
        var texto = req.query.texto;
        Servicio.filter(function (data) {
            return data('nombre').match(texto);
        }).then(function (busca) {
            res.json(busca);
        }).error(function (error) {
            req.flash('error', 'se produjo un error al busca');
            res.redirect('/Servicios')
        });
    }

}
module.exports = servicioControlador;