var express = require('express');
var router = express.Router();

//importar los modelos
var persona = require('../modelo/persona')
var cuenta = require('../modelo/cuenta')
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', fragmento: 'login' });
});

/* GET home pagina principal. */
// router.get('/principal', function(req, res, next) {
//     res.render('principal', { title: 'Sistema Medico', session: true });
// });
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Registro Medico' });
// });

module.exports = router;