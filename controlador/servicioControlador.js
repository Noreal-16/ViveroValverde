'use strict';
var Servicio = require('../modelo/servicio');
class servicioControlador {

    /**
     * visualizar los datos de servicio en pantalla
     * @param {*} req 
     * @param {*} res 
     */
    visualizarLista(req, res) {
        Servicio.then(function(resultS) {
            res.render('index', {
                title: 'Administra Servicio',
                fragmento: "servicio/listaServicio",
                listado: resultS,
                msg: { error: req.flash('error'), info: req.flash('info') }
            });
        }).error(function(error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }

    visualizarServicio(req, res) {
        Servicio.then(function(resultS) {
            res.render('index', {
                title: 'Servicio Jardineria',
                fragmento: "servicio/servicio",
                listado: resultS,
                msg: { error: req.flash('error'), info: req.flash('info') }
            });
        }).error(function(error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }


    guardar(req, res) {
        var datos = {
            nombre: req.body.nombre,
            medida: req.body.medida,
            descripcion: req.body.descripcion,
            precio: req.body.precio
        };
        var servicio = new Servicio(datos);


        //then es una promesa que si no hay erro se guarda
        // Medico.save().then(function(result) {//
        servicio.save().then(function(result) {
            // req.flash('info', 'Paciente registrado!');
            res.redirect("/Administra/Servicios");
            // res.render('principal', { title: 'Sistema Medico', session: false });
        }).catch(function(error) {
            req.flash('error', 'No se pudo registrar!');
            res.redirect("/");
        });

    }
    modificar(req, res) {
        Servicio.filter({id: req.body.id}).then(function (data) {
            if (data.length > 0) {
                var arreglo = data[0];
                arreglo.nombre = req.body.nombrem;
                arreglo.medida = req.body.medidam;
                arreglo.precio = req.body.preciom;
                arreglo.descripcion = req.body.descripcionm;
                

                arreglo.saveAll().then(function (result) {
                    req.flash('info', 'Se ha modificado correctamente');
                    res.redirect('/Administra/Servicios');
                }).error(function (error) {
                    console.log(error);
                    req.flash('error', 'No se pudo modificar');
                    res.redirect('/');
                });


            } else {
                req.flash('error', 'No existe el dato a buscar');
                res.redirect('/administracion/pacientes');
            }
        }).error(function (error) {
            req.flash('error', 'se produjo un error');
            res.redirect('/administracion/pacientes');
        });
    }
   
}
module.exports = servicioControlador;