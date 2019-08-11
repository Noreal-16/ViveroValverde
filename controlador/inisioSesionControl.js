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
}
module.exports = inisioSesionControl;