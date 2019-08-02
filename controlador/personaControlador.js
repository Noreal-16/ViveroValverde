'use strict';
var Rol = require('../modelo/rol');
var Persona = require('../modelo/persona');
var Cuenta = require('../modelo/cuenta');
class personaControlador {


    guardar(req, res) {

        Rol.filter({ nombre: "Usuario" }).run().then(function(result) {
            if (result.lenght > 0) {
                Cuenta.filter({ correo: req.body.correo }).run().then(function(result) {
                    if (result <= 0) {
                        var datosP = {
                            cedula: req.body.txtcedula,
                            apellidos: req.body.txtapellidos,
                            nombres: req.body.txtnombres,
                            fecha_nac: req.body.fecha,
                            edad: req.body.txtedad,
                            direccion: req.body.txtdir,
                        };
                        var datosC = {
                            correo: req.body.correo,
                            clave: req.body.clave
                        }
                        var persona = new Persona(datosP);
                        var cuenta = new Cuenta(datosC);
                        persona.cuenta = cuenta;
                        persona.saveAll({ cuenta: true }).then(function(result) {
                            // req.flash('info', 'Paciente registrado!');
                            res.redirect("/Paciente");
                            // res.render('principal', { title: 'Sistema Medico', session: false });
                        }).catch(function(error) {
                            req.flash('error', 'No se pudo registrar!');
                            res.redirect("/Paciente");
                        });
                    } else {
                        req.filter('error', 'Correo ya registrado!');
                        res.redirect('/');
                    }
                }).error(function(error) {
                    res.send(error);
                });
            } else {
                res.send("No exiter roles");
            }
        }).error(function(error) {

        });
    }

    visualizarCliente(req, res) {
        Persona.then(function(lista) {
            Rol.then(function(resultR) {
                res.render('index', {
                    title: 'Administra Persona',
                    fragmento: "cliente/cliente",
                    sesion: true,
                    lista: lista,
                    listaR: resultR,
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info')
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
}
module.exports = personaControlador;