'use strict';
var Rol = require('../modelo/rol');
var Persona = require('../modelo/persona');
var Cuenta = require('../modelo/cuenta');
/**
 * @class {*} {personaControlador}
 */
class personaControlador {

    /**
     * Metodo para visualizacion de la vista administracion cliente
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    visualizarCliente(req, res) {
        Rol.filter({ nombre: "Usuario" }).then(function (resultR) {
            Persona.filter({ id_Rol: resultR[0].id }).then(function (lista) {
                res.render('index1', {
                    layout: 'layout1',
                    title: 'Administra Cliente',
                    fragmento: "vistaAdministrador/Persona/cliente",
                    sesion: true,
                    listado: lista,
                    listaR: resultR,
                    usuario: { persona: req.user.nombre },
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
    /**
     * Metodo para visualizacion de la vista administracion de usuarios
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    visualizarUsuario(req, res) {

        Rol.filter({ nombre: "Administrador" }).then(function (resultR) {
            Persona.filter({ id_Rol: resultR[0].id }).then(function (lista) {
                res.render('index1', {
                    layout: 'layout1',
                    title: 'Administra Usuario',
                    fragmento: "vistaAdministrador/Persona/usuario",
                    sesion: true,
                    listado: lista,
                    listaR: resultR,
                    usuario: { persona: req.user.nombre },
                    active: { usuario: true, menu: true },
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
     * Metodo para vicualizar el perfil del cliente desde la vista cliente
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    visualizarPerfil(req, res) {
        res.render('index', {
            layout: 'layout',
            title: 'Perfil Cliente',
            fragmento: "clientes/Perfil",
            sesion: true,
            usuario: {
                persona: req.user.nombre,
                correo: req.user.correo,
                telefono: req.user.telefono,
                nombres: req.user.nombres,
                apellidos: req.user.apellidos,
                celular: req.user.celular,
                direccion: req.user.direccion,
                cedula: req.user.cedula,
                exter: req.user.exter,
                external_rol: req.user.external_rol
            }
        });
    }
    /** 
     * Metodo para modificar el perfil del cliente
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    modificarvistacliente(req, res) {
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
                        req.flash('success', 'Su Cuenta Ha sido Modificada');
                        res.redirect('/');
                    }).error(function (error) {
                        console("PROBLEMA EN MODIFICAR PERSONAAAA");
                        req.flash('error', 'Se produjo un error al modificar persona');
                        res.redirect('/Perfil');
                    });
                }).error(function (error) {
                    req.flash('error', 'Se produjo un error en Rol');
                    console("PROBLEMA EN rolllllllllllllllllllllllllll");
                    res.redirect('/Perfil');
                });
            } else {
                req.flash('error', 'Se produjo un error en Persona');
                console("PROBLEMA EN perrrrrrrrrrrrrrrrrrrrrrrrrrr");
                res.redirect('/Perfil');
            }
        }).error(function (error) {
            res.send(error);
        });
    }
    /**
     * Metodo para registrar cliente desde la vista Cliente
     * @param {rol,correo} req recoge el rol desde el formulario
     * @param {*result} res  envia resultado
     */
    guardarCliente(req, res) {
        console.log(req.body.txtrol);
        Rol.filter({ nombre: "Usuario" }).run().then(function (rolesResul) {
            if (rolesResul.length > 0) {
                Cuenta.filter({ correo: req.body.txtcorreo }).run().then(function (exite) {
                    if (exite.length <= 0) {
                        var rol = rolesResul[0];
                        var datosP = {
                            cedula: req.body.txtcedula,
                            apellidos: req.body.txtnombre,
                            nombres: req.body.txtapellido,
                            direccion: req.body.txtdireccion,
                            telefono: req.body.txttelefono,
                            celular: req.body.txtcelular,
                            estado: true,
                            id_Rol: rol.id
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
                            res.redirect("/Inicio/Sesion");
                            // res.render('principal', { title: 'Sistema Medico', session: false });
                        }).catch(function (error) {
                            req.flash('error', 'No se pudo registrar!');
                            res.redirect("/Inicio/Sesion");
                        });
                    } else {
                        req.flash('error', 'Correo ya registrado!');
                        res.redirect('/Inicio/Sesion');
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
     * Metodo para registrar cliente desde la vista Administrador
     * @param {rol,correo} req para hacer busqueda por rol y correo
     * @param {*result} res envia la data 
     */
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
     * Permite obtener datos del cliente y cargarlos en la vista
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
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
                        external_idLogin: req.user.exter,
                        rolnombre: resultR[0].nombre,
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
     * Permite verificar si la cedula ingresada esta repetida
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
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
     * Permite verificar si el correo  ingresada esta repetido
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
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
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
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
                        console("PROBLEMA EN MODIFICAR PERSONAAAA");
                        req.flash('error', 'Se produjo un error al modificar persona');
                        res.redirect('/Admin');
                    });
                }).error(function (error) {
                    req.flash('error', 'Se produjo un error en Rol');
                    console("PROBLEMA EN rolllllllllllllllllllllllllll");
                    res.redirect('/Admin');
                });
            } else {
                req.flash('error', 'Se produjo un error en Persona');
                console("PROBLEMA EN perrrrrrrrrrrrrrrrrrrrrrrrrrr");
                res.redirect('/Admin');
            }
        }).error(function (error) {
            res.send(error);
        });
    }
    /**
     * Meyodo para desacctivar Persona
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    descativar(req, res) {
        var external = req.body.externalPersona;
        console.log("llega para desactivar persona");
        console.log(external);
        Persona.filter({ external_id: external }).getJoin({ cuenta: true }).then(function (resultPer) {
            console.log("Datos para desactivar");
            console.log(resultPer);
            var persona = resultPer[0];
            if (persona.estado) {
                req.flash('success', 'Persona desactivado correctamente');
                persona.estado = false;
                persona.cuenta.estado = false;
            } else {
                req.flash('success', 'Persona activado correctamente');
                persona.estado = true;
                persona.cuenta.estado = true;
            }
            persona.saveAll().then(function (resultPerso) {
                res.redirect("/Administra/clientes");
            }).error(function (error) {
                res.flash('error', 'Se produjo un error al guardar');
                res.redirect("/Administra/clientes");
            });
            // res.json(data);
        }).error(function (error) {
            res.send(error);
        });
    }


}
module.exports = personaControlador;