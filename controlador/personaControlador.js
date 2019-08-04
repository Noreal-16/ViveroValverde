'use strict';
var Rol = require('../modelo/rol');
var Persona = require('../modelo/persona');
var Cuenta = require('../modelo/cuenta');
class personaControlador {

    visualizarCliente(req, res) {
        Persona.then(function(lista) {
            Rol.then(function(resultR) {
                res.render('index', {
                    title: 'Administra Persona',
                    fragmento: "cliente/cliente",
                    sesion: true,
                    listado: lista,
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

    guardar(req, res) {
        Rol.filter({ external_id: req.body.txtrol }).run().then(function(rolesResul) {
            if (rolesResul.length > 0) {
                Cuenta.filter({ correo: req.body.txtcorreo }).run().then(function(exite) {
                    if (exite.length <= 0) {
                        var role = rolesResul[0];
                        var datosP = {
                            cedula: req.body.txtCedula,
                            apellidos: req.body.txtnombre,
                            nombres: req.body.txtapellido,
                            direccion: req.body.txtdireccion,
                            telefono: req.body.txttelefono,
                            celular: req.body.txtcelular,
                            estado: true,
                            id_Rol: role.id
                        };
                        var datosC = {
                            correo: req.body.txtcorreo,
                            clave: req.body.clave,
                            estado: true,
                            nombreUsuario: req.body.usser
                        }
                        var persona = new Persona(datosP);
                        var cuenta = new Cuenta(datosC);
                        persona.cuenta = cuenta;
                        persona.saveAll({ cuenta: true }).then(function(result) {
                            req.flash('info', 'Cliente  registrado!');
                            res.redirect("/Administra/clientes");
                            // res.render('principal', { title: 'Sistema Medico', session: false });
                        }).catch(function(error) {
                            req.flash('error', 'No se pudo registrar!');
                            res.redirect("/Administra/clientes");
                        });
                    } else {
                        req.filter('error', 'Correo ya registrado!');
                        res.redirect('/');
                    }
                }).error(function(error) {
                    res.send(error);
                });
            } else {
                res.send("No exiten roles");
            }
        }).error(function(error) {

        });
    }


}
module.exports = personaControlador;