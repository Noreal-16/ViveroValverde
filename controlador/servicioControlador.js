'use strict';
var Servicio = require('../modelo/servicio');
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
                    sesion:true,
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