var express = require('express');
var router = express.Router();

//para paspot 
var passport = require('passport');


/**
 * ///////////////////////////////////////////////////////////////////////////////
 * Importando los controladores desde la carpeta controlador
 */

/**
 * Controlador categoria -------------------->
 */
var categoria = require('../controlador/categoriaControlador');
var categoriaC = new categoria();

/**
 * Controlador persona ----------------------->
 */
var Personas = require('../controlador/personaControlador');
var persona = new Personas();

/**
 * Controlador articulo ------------------------>
 */
var articulo = require('../controlador/articuloControlador');
var articuloC = new articulo();

/**
 * Controlador servicio ------------------------>
 */
var Servicio = require('../controlador/servicioControlador');
var servicio = new Servicio();

/**
 * Controlador factura ------------------------->
 */
var Factura = require('../controlador/facturaControlador');
var factura = new Factura;

/**
 * Controlador inicio session ------------------->
 */
var login = require('../controlador/inisioSesionControl');
var loginC = new login();

/**
 * Controlador carrito para agregar productos al carrito de compras
 */
var carrito = require('../controlador/CarritoController');
var carritoC = new carrito();


var carritoServicio = require('../controlador/servicioCarrito');
var servicioCarr = new carritoServicio();

/**
 * Carga del controlador para la vista principal
 */
var Principal= require('../controlador/PrincipalController');
var principalC = new Principal();
/**
 * Carga del controlador para la vista principal
 */
var Reportes= require('../controlador/reportesControlador');
var reportesC = new Reportes();

var Pago= require('../controlador/pagosControl');
var pagoC = new Pago();

/**
 * Controlador rol ------------------------------------>
 */
var rol = require('../controlador/rolControlador');


/**
 * //////////////////////////////////////////////////////////////////////////////////////
 * validacion de acceso a las vistas
 * @param {autenticacion} req 
 * @param {presentacion vista} res 
 * @param {pasa} next 
 */
var auth = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', "Debes iniciar sesion !");
        res.redirect("/");
    }
}

/**
 * Metodo para dar permiso a 
 * @param {rol} req 
 * @param {permiso} res 
 * @param {vista administrador} next 
 */
var admin = function middleWare(req, res, next) {
    if (req.user.rol === 'Administrador') {
        next();
    } else {
        req.flash('error', 'Sin Accesso!');
        res.redirect('/');
    }
};
var usua = function middleWare(req, res, next) {
    if (req.user.rol === 'Usuario') {
        next();
    } else {
        req.flash('error', 'Sin Accesso!');
        res.redirect('/Admin');
    }
};

/**
 * ///////////////////////////////////////////////////////////////////////////////
 *Verificacion de datos correo y clave inicio session 
 */
router.post('/inicio_sesion',
    passport.authenticate('local-signin', {
        successRedirect: '/redirecciona',
        failureRedirect: '/Inicio/Sesion',
        failureFlash: true
    }));
router.get('/redirecciona', function(req, res) {
    if (req.user.rol === "Administrador") {
        res.redirect('/Admin')
    } else if (req.user.rol === "Usuario") {
        res.redirect("/")
    }
});

/**
 * Metodo para cerrar session
 */
router.get('/cerrar_sesion', auth, loginC.cerrar);
/**
 * ////////////////////////////////////////////////////////////////////////////////
 * Presentacion vista cliente
 */
router.get('/', function(req, res, next) {
    rol.crear_roles();
    rol.crearsessiones(req);
    // if (req.session.carrito == undefined || req.session.carritoServicio == undefined) {
    //     req.session.carrito = [];
    //     req.session.carritoServicio = [];
    // }

    if (req.isAuthenticated()) {
        console.log(req.session.user + "///////////////////");
        res.render('index', {
            title: 'Vivero Valverde',
            fragmento: 'principal/banner',
            usuario: { persona: req.user.nombre },
            active: { inicio: true },
            session: true,
            msg: {
                error: req.flash('error'),
                success: req.flash('success')
            }
        });
    } else {
        res.render('index', {
            title: 'Vivero Valverde',
            fragmento: 'principal/banner',
            active: { inicio: true },
            session: false,
            msg: {
                error: req.flash('error'),
                success: req.flash('success')
            }
        });
    }
});

/**
 * Administracion vista cliente--------------------------------------->
 */
/*
 * Visualizacion y modificacion de perfil cliente
 */
router.get('/Perfil', auth, persona.visualizarPerfil);
router.post('/Perfil/Modificar', auth, persona.modificarvistacliente);
//
//router.post('/Perfil/Editar', persona.visualizarPerfil);

/**
 * Visualizacion de vista servicio cliente
 */
router.get('/Servicios', servicio.visualizarServicio);
router.get('/galeriaServicio', servicio.listagaleriaServico);
/**
 * Visualizacion vista articulo cliente
 */
router.get('/Articulo', articuloC.visualizarRegistro);
router.get('/galeriaArticulo', articuloC.listargaleriaArticulo);
/**
 * Administracion registro de cliente vista cliente
 */
router.post('/cliente/guardar', persona.guardarCliente);

/**
 * Inicio de sesion Usuario
 */
router.get('/Inicio/Sesion', loginC.visualizarLogin);
router.get('/Regitro', loginC.visualizarRegistro);

/**
 * //////////////////////////////////////////////////////////////////////////////
 * Presentacion de vista administrador
 */
router.get('/Admin', auth, admin, principalC.cargardatosPrincipal);

/**
 * Administracion de pedidos vista administrador
 */

router.get('/Pedido', auth, admin, factura.visualizarPedidos);
router.get('/pedidoCliente', auth, admin, factura.cargarClientePedido);
router.get('/cargarPedidos', auth, admin, factura.cargarPedidoDetalle);
router.post('/Despachar', auth, admin, factura.despacharPedido);
// router.get('/Pedido', auth, function(req, res, next) {
//     res.render(
//         'index1', {
//             layout: 'layout1',
//             title: 'Pedidos',
//             fragmento: 'vistaAdministrador/Pedidos/pedidos',
//             active: { pedido: true }
//         });
// });


router.get('/contacto', auth, function(req, res, next) {
    res.render('index', { title: 'Vivero Valverde', fragmento: 'contactos/contactos' });
});


/**
 * Administracion de servicio de jardineria vista administrador
 */
router.get('/servicio/buscar', servicio.buscador);
router.get('/Administra/Servicios', auth, admin, servicio.visualizarLista);
router.post('/Administra/Servicios/Guardar', auth, admin, servicio.guardar);
router.get('/cargarServicio', auth, admin, servicio.cargarServicio); //carga datos de servico para modificar
router.post('/Administra/Servicios/Modificar', auth, admin, servicio.modificar);
router.post('/desactivarServicio', auth, admin, servicio.descativarServicio);

router.get('/cargarImagenesServicio', auth, admin, servicio.listarGaleria);
router.post('/subirImagenesServicio', auth, admin, servicio.cargarImagenes);
/***
 * Administracion de categotias de plantas vista administrador
 * visualizar
 * guardar
 * modificar
 */

// router.get('/Administra/categorias', categoriaC.visualizar);
router.post('/Administrador/categorias/guardar', auth, admin, categoriaC.guardar);
router.get('/cargarCategoria', auth, admin, categoriaC.cargarCategorias);
router.post('/Administrador/Modificar', auth, admin, categoriaC.modificarCategoris);


/**
 * Administracion de articulo plantas vista administrador
 */
router.get('/Administra/Articulo', auth, admin, articuloC.visualizarLista);
router.get('/cargarArticulo', auth, admin, articuloC.cargarArticulo);
router.post('/desactivarArticulo', auth, admin, articuloC.descativar);
router.post('/Administra/Articulo/guardar', auth, admin, articuloC.guardar);
router.post('/Administra/Articulo/modificar', auth, admin, articuloC.modificar);
router.get('/articulo/buscar', articuloC.buscador);

router.get('/cargarImagenes', auth, admin, articuloC.visualizarGaleria);
router.post('/subirImagenes', auth, admin, articuloC.subirImagenes);


/**
 * Administra clientes vista administrador
 */
router.get('/Administra/clientes', auth,admin, persona.visualizarCliente);
router.post('/Administra/clientes/guardar', auth, admin, persona.guardar);
router.get('/cedulaRepetida', persona.cedulaRepetida);
router.get('/correoRepetida', persona.correoRepetida);
router.get('/cargarPersona', auth, admin, persona.cargarPersona);
router.post('/Administra/cliente/modificar', auth, admin, persona.modificar);

router.post('/desactivarPersona', auth, admin, persona.descativar);

router.get('/Administra/usuario', auth, persona.visualizarUsuario);
/**
 * Administracion de factura vista administrador
 */
router.get('/Factura', auth, admin, factura.visualizaFactura);

/**
 * administra factura vista administrador
 */
router.get('/agregarArt', auth, admin, factura.agregarItem);
router.get('/quitarArt', auth, admin, factura.quitarItem);
router.get('/listafacturaArt', auth, admin, factura.mostrarCarrito1);

/**
 * Carrito servicio
 */

router.get('/agregarServicio:external', servicioCarr.agregarServicio);
router.get('/quitarServicio:external', servicioCarr.quitarServicio);
router.get('/listarServicio', servicioCarr.mostrarCarritoServicio);
/**
 *administra carrito de compra vista cliente
 */
router.get('/carrito', carritoC.carrito);
router.get('/agregar:external', carritoC.agregarItem);

router.get('/quitar:external', carritoC.quitarItem);
router.get('/listarcarrito', carritoC.mostrarCarrito);
/**
 * Guardar factura desde el cliente
 */
router.post('/guardarFacturas', factura.guardar);
router.post('/guardarDetalleFacturas', factura.guardaDetalle);
/**
 * Direeccion permite guardar la factura desde el administrador
 */
router.post('/guardarFacturaAdmin', auth, admin, factura.guardarFcaturaAdmin);

/**
 * Dioreccion para caragar reportes
 */
router.get('/reportesFactura', auth, admin, reportesC.reporteFactura);
router.get('/reportesClientes', auth, admin, reportesC.reporteCliente);
router.get('/reportesArticulo', auth, admin, reportesC.reporteArticulo);


router.get('/ver_pago', auth, pagoC.verPago);
router.get('/usuario_paga', auth, pagoC.verResultadoPago);


module.exports = router;