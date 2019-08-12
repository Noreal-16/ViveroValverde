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

/**
 * importando controlador factura
 */
var Factura = require('../controlador/facturaControlador');
var factura = new Factura;
/**
 * Inicio se sesion Uusuario
 */
var login = require('../controlador/inisioSesionControl');
var loginC = new login();

var rol = require('../controlador/rolControlador');

/**
 * Inicio de sesion Usuario
 */
router.get('/Inicio/Sesion', loginC.visualizarLogin);
router.get('/Regitro', loginC.visualizarRegistro);


/* visualizar la pantalla principal. */
router.get('/', function(req, res, next) {
    rol.crear_roles();
    res.render('index', { title: 'Vivero Valverde', fragmento: 'principal/banner' });
});

/**
 * Vista administrador
 */
router.get('/Admin', function(req, res, next) {
    res.render('index1', { layout: 'layout1', title: 'Vivero Valverde', fragmento: 'principal/principal', active: { inicio: true }, });
});


/**
 * Administracion de factura
 */
router.get('/Factura', factura.visualizaFactura);


/**
 * Administracion de pedidos
 */
router.get('/Pedido', function(req, res, next) {
    res.render('index1', { layout: 'layout1', title: 'Pedidos', fragmento: 'vistaAdministrador/Pedidos/pedidos', active: { pedido: true } });
});


router.get('/contacto', function(req, res, next) {
    res.render('index', { title: 'Vivero Valverde', fragmento: 'contactos/contactos' });
});


/**
 * Administracion de servicio de jardineria
 */
router.get('/Servicios', servicio.visualizarServicio);
router.get('/cargarServicio', servicio.cargarServicio);
router.get('/Administra/Servicios', servicio.visualizarLista);
router.post('/Administra/Servicios/Guardar', servicio.guardar);
router.post('/Administra/Servicios/Modificar', servicio.modificar);


/***
 * Administracion de categotias de plantas 
 * visualizar
 * guardar
 * modificar
 */

// router.get('/Administra/categorias', categoriaC.visualizar);
router.post('/Administrador/categorias/guardar', categoriaC.guardar);
router.get('/cargarCategoria', categoriaC.cargarCategorias);
router.post('/Administrador/Modificar', categoriaC.modificarCategoris);


/**
 * Administracion de articulo plantas
 */
router.get('/Articulo', articuloC.visualizarRegistro);
router.get('/Administra/Articulo', articuloC.visualizarLista);
router.get('/cargarArticulo', articuloC.cargarArticulo);
router.get('/desactivarArticulo', articuloC.descativar);
router.post('/Administra/Articulo/guardar', articuloC.guardar);
router.post('/Administra/Articulo/modificar', articuloC.modificar);
router.get('/articulo/buscar', articuloC.buscador);

/**
 * Administra clientes
 */
router.get('/Administra/clientes', persona.visualizarCliente);
router.post('/Administra/clientes/guardar', persona.guardar);
router.get('/cargarPersona', persona.cargarPersona);
router.post('/Administra/cliente/modificar', persona.modificar);



module.exports = router;