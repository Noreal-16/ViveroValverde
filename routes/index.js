var express = require('express');
var router = express.Router();

//importar los modelos
var persona = require('../modelo/persona');
var cuenta = require('../modelo/cuenta');
var categoria = require('../controlador/categoriaControlador');
var categoriaC = new categoria();
var articulo = require('../controlador/articuloControlador');
var articuloC = new articulo();
var Servicio = require('../controlador/servicioControlador');
var servicio = new Servicio();

//controlador servicio
var Servicio = require('../controlador/servicioControlador');
var servicio = new Servicio();

var Rol = require("../controlador/rolControlador");
var rol = new Rol();
rol.crearRol();




/* visualizar la pantalla principal. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Vivero Valverde', fragmento: 'principal/banner' });
});
router.get('/contacto', function(req, res, next) {
    res.render('index', { title: 'Vivero Valverde', fragmento: 'contactos/contactos' });
});


/**
 * Adminitracion de servicio de jardineria
 */
router.post('/Administra/Servicios/Guardar', servicio.guardar);
router.get('/Administra/Servicios', servicio.visualizar);

/***
 * Adminitracion de categotias de plantas 
 * visualizar
 * guardar
 * modificar
 */

router.get('/Administra/categorias', categoriaC.visualizar);
router.post('/Administrador/categorias/guardar', categoriaC.guardar);
router.get('/Administrador/lista/:external', categoriaC.visualizarModificar);
router.post('/Administrador/Modificar', categoriaC.modificarCategoris);


/**
 * Adminitracion de articulo plantas
 */
router.get('/Administra/Articulo', articuloC.visualizarRegistro);
router.post('/Administra/Articulo/guardar', articuloC.guardar);


module.exports = router;