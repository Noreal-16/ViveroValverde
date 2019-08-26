'use strict';
var utilidades = require('../controlador/rolControlador');
/**
 * @class {*} {inisioSesionControl}
 */
class inisioSesionControl {
    /**
     * Visualizar formulario de inicio de sesion
     * @param {*} req para pedidos al servidor
     * @param {*} res para respuesta
     */
    visualizarLogin(req, res) {
            utilidades.crearsessiones(req);
            res.render('index', {
                title: "Inicio sesion",
                sesion: true,
                fragmento: "clientes/InicioSesion",
                msg: {
                    error: req.flash('error'),
                    info: req.flash('info')
                }

            });
        }
        /**
         * visualiza formulario de registro cliente
         * @param {*} req para pedidos al servidor
         * @param {*} res para respuesta
         */
    visualizarRegistro(req, res) {
            utilidades.crearsessiones(req);
            res.render('index', {
                title: "Inicio sesion",
                sesion: true,
                fragmento: "clientes/registroUsuario",
                msg: {
                    error: req.flash('error'),
                    info: req.flash('info')
                }

            });
        }
        /**
         * Metodo para destruir todas las sesiones
         * @param {*} req para pedidos al servidor
         * @param {*} res para respuesta
         */
    cerrar(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
}
module.exports = inisioSesionControl;