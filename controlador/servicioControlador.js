'use strict';
var Servicio = require('../modelo/servicio');
class servicioControlador {

    /**
     * visualizar los datos de servicio en pantalla
     * @param {*} req 
     * @param {*} res 
     */
    visualizar(req, res) {
        Servicio.then(function(resultS) {
            res.render('index', {
                title: 'Servicio',
                fragmento: "servicio",
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
            res.redirect("/");
            // res.render('principal', { title: 'Sistema Medico', session: false });
        }).catch(function(error) {
            req.flash('error', 'No se pudo registrar!');
            res.redirect("/");
        });

    }
}
module.exports = servicioControlador;