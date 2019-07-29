'use strict';
var servicio = require('../modelo/servicio');
class servicioControlador {

    /**
     * visualizar los datos de servicio en pantalla
     * @param {*} req 
     * @param {*} res 
     */
    visualizar(req, res) {
        servicio.then(function(resultS) {
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
            cedula: req.body.txtcedula,
            apellidos: req.body.txtapellidos,
            nombres: req.body.txtnombres,
            fecha_nac: req.body.fecha,
            edad: req.body.txtedad,
            direccion: req.body.txtdir,
        };


        //then es una promesa que si no hay erro se guarda
        // Medico.save().then(function(result) {//
        Categoria.save().then(function(result) {
            // req.flash('info', 'Paciente registrado!');
            res.redirect("/Paciente");
            // res.render('principal', { title: 'Sistema Medico', session: false });
        }).catch(function(error) {
            req.flash('error', 'No se pudo registrar!');
            res.redirect("/Paciente");
        });

    }
}
module.exports = servicioControlador;