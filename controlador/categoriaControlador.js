'use strict';
var Categoria = require('../modelo/categoria');
class categoriaControlador {


    visualizar(req, res) {
        Categoria.then(function(result) {
            res.render('index', {
                title: 'Pacientes',
                andrea: "fragmentos/paciente/lista",
                sesion: true,
                listado: todos,
                nro: nro,
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