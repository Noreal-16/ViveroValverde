var express = require('express');
var router = express.Router();

//importar los modelos

var categoria = require('../controlador/categoriaControlador');
var categoriaC = new categoria();

var Personas = require('../controlador/personaControlador');
var persona = new Personas();

var articulo = require('../controlador/articuloControlador');
var articuloC = new articulo();

var Servicio = require('../controlador/servicioControlador');
var servicio = new Servicio();

//controlador servicio
var Servicio = require('../controlador/servicioControlador');
var servicio = new Servicio();

var rol = require('../controlador/rolControlador');



/* visualizar la pantalla principal. */
router.get('/', function(req, res, next) {
    rol.crear_roles();
    res.render('index', { title: 'Vivero Valverde', fragmento: 'principal/banner' });
});
router.get('/contacto', function(req, res, next) {
    res.render('index', { title: 'Vivero Valverde', fragmento: 'contactos/contactos' });
});


/**
 * Adminitracion de servicio de jardineria
 */
router.get('/Servicios', servicio.visualizarServicio);
router.get('/cargarServicio', servicio.cargarServicio);
router.get('/Administra/Servicios', servicio.visualizarLista);
router.post('/Administra/Servicios/Guardar', servicio.guardar);
router.post('/Administra/Servicios/Modificar', servicio.modificar);


/***
 * Adminitracion de categotias de plantas 
 * visualizar
 * guardar
 * modificar
 */

// router.get('/Administra/categorias', categoriaC.visualizar);
router.post('/Administrador/categorias/guardar', categoriaC.guardar);
router.get('/cargarCategoria', categoriaC.cargarCategorias);
router.post('/Administrador/Modificar', categoriaC.modificarCategoris);


/**
 * Adminitracion de articulo plantas
 */
router.get('/Articulo', articuloC.visualizarRegistro);
router.get('/Administra/Articulo', articuloC.visualizarLista);
router.get('/cargarArticulo', articuloC.cargarArticulo);
router.get('/desactivarArticulo', articuloC.descativar);
router.post('/Administra/Articulo/guardar', articuloC.guardar);
router.post('/Administra/Articulo/modificar', articuloC.modificar);

/**
 * Administra clientes
 */
router.get('/Administra/clientes', persona.visualizarCliente);
router.post('/Administra/clientes/guardar', persona.guardar);
router.get('/cargarPersona', persona.cargarPersona);



module.exports = router;