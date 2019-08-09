'use strict';
var Categoria = require('../modelo/categoria');

class categoriaControlador {

    /**
     * Guardar categorias recibiendo datos por body
     * @param {*} req 
     * @param {*} res 
     */
    guardar(req, res) {
        var datosC = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            estado: true
        };
        var categoriaC = new Categoria(datosC);
        categoriaC.save().then(function(result) {
            req.flash('info', 'Se guardo correctamente');
            res.redirect('/Administra/Articulo');

        }).error(function(error) {
            req.flash('error', 'No se pudo registrar!');
            res.redirect('/Administra/Articulo');
        });

    }

    /**
     * Cargara datos en le modal para modificar categoria
     * @param {*} req 
     * @param {*} res 
     */
    cargarCategorias(req, res) {
        var external = req.query.external;
        var data = {};
        console.log("Aqui esta el EXTERNAL => " + external);
        Categoria.filter({ external_id: external }).then(function(result) {
            var item = result[0];
            console.log(result);
            data = {
                external_id: item.external_id,
                nombre: item.nombre,
                descripcion: item.descripcion,
            };
            // });
            res.json(data);
        }).error(function(error) {
            req.flash('error', 'No se pudo encontrar el registro!');
            res.redirect("/Administra/Articulo");
        });
    }

    /**
     * Modificar categoria recibiendo datos por body
     * @param {*} req 
     * @param {*} res 
     */
    modificarCategoris(req, res) {
        Categoria.filter({ external_id: req.body.external }).then(function(resultC) {
            if (resultC.length > 0) {
                var categoria = resultC[0];
                categoria.nombre = req.body.nombre1;
                categoria.descripcion = req.body.descripcion1;
                categoria.save().then(function(modificaLista) {
                    req.flash('success', 'Categoria actualizada correctamente');
                    res.redirect('/Administra/Articulo');
                }).error(function(error) {
                    res.flash('error', 'Se produjo un error al actualizar categorias');
                    res.redirect('/Administra/Articulo');
                });
            } else {
                res.flash('error', 'Se produjo un error al actualizar categorias');
                res.redirect('Administra/Articulo');
            }
        }).error(function(error) {
            res.send(error);
        });
    }

}
module.exports = categoriaControlador;