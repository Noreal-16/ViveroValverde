'use strict';
class articuloControlador {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */

    guardar(req, res) {


        var datos = {
            correo: req.body.correo,
            clave: req.body.clave
        }
        console.log(datos);
        // Medico.save().then(function(result) {//
        cuenta.filter({ correo: datos.correo }).run().then(function(result) {
            if (result[0].clave === datos.clave) {
                console.log(result[0].correo);
                console.log(result[0].external_id);
                res.render('principal', { title: 'Sistema Medico', session: true, fragmento: "fragmentos/tablaPaciente" });
            } else {
                res.send("errroroeorooeor");
            }
        }).catch(function(error) {
            res.send(error);
        });
    }



}