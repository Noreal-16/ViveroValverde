var express = require('express');
var router = express.Router();

//importar los modelos
var persona = require('../modelo/persona');
var cuenta = require('../modelo/cuenta');
var categoria = require('../controlador/categoriaControlador');
var categoriaC = new categoria();
var articulo = require('../controlador/articuloControlador');
var articuloC = new articulo();



//controlador servicio
var Servicio = require('../controlador/servicioControlador');
var servicio = new Servicio();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Vivero Valverde', fragmento: 'banner' });
});
// router.get('/gallery', function(req, res, next) {
//     res.render('index', { title: 'Vivero Valverde', fragmento: 'articulo' });
// });
// router.get('/service', function(req, res, next) {
//     res.render('index', { title: 'Vivero Valverde', fragmento: 'servicio' });
// });
router.get('/contacto', function(req, res, next) {
    res.render('index', { title: 'Vivero Valverde', fragmento: 'contactos' });
});


//Administracion de servicio
//cargar paciente en las tablas
router.get('/Administra/Servicios', servicio.visualizar);
//Administrador de caratceteristicas
router.get('/Administra/categorias', categoriaC.visualizar);
router.post('/Administrador/categorias/guardar', categoriaC.guardar);
//Articulo
router.get('/Administra/Articulo', articuloC.visualizarRegistro);
router.post('/Administra/Articulo/guardar', articuloC.guardar);
/* GET home pagina principal. */
// router.get('/principal', function(req, res, next) {
//     res.render('principal', { title: 'Sistema Medico', session: true });
// });
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Registro Medico' });
// });

module.exports = router;