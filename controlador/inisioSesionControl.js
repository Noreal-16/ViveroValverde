'use strict';
class inisioSesionControl {
    visualizarLogin(req, res) {
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
    visualizarRegistro(req, res) {
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
    */
    cerrar(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
}
module.exports = inisioSesionControl;