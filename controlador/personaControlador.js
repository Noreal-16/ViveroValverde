'use strict';
var Rol = require('../modelo/rol');
var Persona = require('../modelo/persona');
var Cuenta = require('../modelo/cuenta');
class personaControlador {

    /**
     * Presentacion de usuario en la tabla
     */
    visualizarCliente(req, res) {
        Persona.then(function (lista) {
            Rol.then(function (resultR) {
                res.render('index1', {
                    layout: 'layout1',
                    title: 'Administra Cliente',
                    fragmento: "vistaAdministrador/Persona/cliente",
                    sesion: true,
                    listado: lista,
                    listaR: resultR,
                    active: { cliente: true, menu: true },
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

    guardar(req, res) {
        console.log(req.body.txtrol);
        Rol.filter({ external_id: req.body.txtrol }).run().then(function (rolesResul) {
            if (rolesResul.length > 0) {
                Cuenta.filter({ correo: req.body.txtcorreo }).run().then(function (exite) {
                    if (exite.length <= 0) {
                        var role = rolesResul[0];
                        var datosP = {
                            cedula: req.body.txtcedula,
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
                        persona.saveAll({ cuenta: true }).then(function (result) {
                            req.flash('info', 'Cliente  registrado!');
                            res.redirect("/Administra/clientes");
                            // res.render('principal', { title: 'Sistema Medico', session: false });
                        }).catch(function (error) {
                            req.flash('error', 'No se pudo registrar!');
                            res.redirect("/Administra/clientes");
                        });
                    } else {
                        req.flash('error', 'Correo ya registrado!');
                        res.redirect('/Administra/clientes');
                    }
                }).error(function (error) {
                    res.send(error);
                });
            } else {
                res.send("No exiten roles");
            }
        }).error(function (error) {

        });
    }

    /**
     * Permite obtener datos del cleinte y cargarlos en la vista
     * @param {*} req 
     * @param {*} res 
     */
    cargarPersona(req, res) {
        var external = req.query.external;
        var data;
        Persona.getJoin({ cuenta: true }).filter({ external_id: external }).then(function (resultPers) {
            var persona = resultPers[0];
            Rol.filter({ id: persona.id_Rol }).then(function (resultR) {
                // console.log(resultR);
                Rol.then(function (listaR) {
                    data = {
                        cedula: persona.cedula,
                        nombre: persona.nombres,
                        apellido: persona.apellidos,
                        direccion: persona.direccion,
                        telefono: persona.telefono,
                        celular: persona.celular,
                        external_id: persona.external_id,
                        correo: persona.cuenta.correo,
                        clave: persona.cuenta.clave,
                        usuario: persona.cuenta.nombreUsuario,
                        external_idR: resultR[0].external_id,
                        lista: listaR
                    };
                    res.json(data);
                }).error(function (error) {

                })
            }).error(function (error) {
                req.flash('error', 'error al encontran la categoria');
                res.redirect('/');
            });
        }).error(function (error) {
            req.flash('error', 'Ocurrio un error comunicarse con el desarrollador');
            res.redirect('/');
        });
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    cedulaRepetida(req, res) {
        var cedula = req.query.cedula;
        var data = true;
        Persona.filter({ cedula: cedula }).then(function (resultPers) {
            if (resultPers.length > 0) {
                data = false;
            }
            res.json(data);
        }).error(function (error) {
            req.flash('error', 'Ocurrio un error comunicarse con el desarrollador');
            res.redirect('/Admin');
        });
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    correoRepetida(req, res) {
        var correo = req.query.correo;
        var data = true;
        Cuenta.filter({ correo: correo }).then(function (resultC) {
            if (resultC.length > 0) {
                data = false;
            }
            res.json(data);
        }).error(function (error) {
            req.flash('error', 'Ocurrio un error comunicarse con el desarrollador');
            res.redirect('/Admin');
        });
    }
    /**
     * Metodo que permite modificar los datos de la persona 
     * @param {*} req 
     * @param {*} res 
     */
    modificar(req, res) {
        Persona.filter({ external_id: req.body.external }).getJoin({ cuenta: true }).then(function (resultPer) {
            if (resultPer.length > 0) {
                var person = resultPer[0];
                Rol.filter({ external_id: req.body.txtrolM }).then(function (resultRol) {
                    person.cedula = req.body.txtCedulaM;
                    person.nombres = req.body.txtnombreM;
                    person.apellidos = req.body.txtapellidoM;
                    person.direccion = req.body.txtdireccionM;
                    person.telefono = req.body.txttelefonoM;
                    person.celular = req.body.txtcelularM;
                    person.cuenta.correo = req.body.txtcorreoM;
                    person.cuenta.clave = req.body.claveM;
                    person.cuenta.nombreUsuario = req.body.userM;
                    person.id_Rol = resultRol[0].id;
                    person.saveAll({ cuenta: true }).then(function (resultPersona) {
                        req.flash('success', 'Persona modificado correctamente');
                        res.redirect('/Administra/clientes');
                    }).error(function (error) {
                        req.flash('error', 'Se produjo un error al modificar persona');
                        res.redirect('/Administra/clientes');
                    });
                }).error(function (error) {
                    req.flash('error', 'Se produjo un error en Rol');
                    res.redirect('/Administra/clientes');
                });
            } else {
                req.flash('error', 'Se produjo un error en Persona');
                res.redirect('/Administra/clientes');
            }
        }).error(function (error) {
            res.send(error);
        });
    }


}
module.exports = personaControlador;