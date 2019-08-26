'use strict';
var articulo = require('../modelo/articulo');
var categoria = require('../modelo/categoria');
var factura = require('../modelo/factura');
var persona = require('../modelo/persona');
var pago = require('../modelo/pago');
var detalleFactura = require('../modelo/detalle_factura');
//pago
var https = require('https');
var querystring = require('querystring');
var pt = 1;
// variables para realizar pago
var checkout;
class pagoControl {

    verPago(req, res) {
        function request(callback) {
            var path = '/v1/checkouts';
            var data = querystring.stringify({
                'authentication.userId': '8a8294175d602369015d73bf00e5180c',
                'authentication.password': 'dMq5MaTD5r',
                'authentication.entityId': '8a8294175d602369015d73bf009f1808',
                'amount': pt,
                'currency': 'USD',
                'paymentType': 'DB'
            });
            var options = {
                port: 443,
                host: 'test.oppwa.com',
                path: path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': data.length
                }
            };
            var postRequest = https.request(options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    jsonRes = JSON.parse(chunk);
                    return callback(jsonRes);
                });
            });
            postRequest.write(data);
            postRequest.end();
        }
        request(function (responseData) {
            console.log(responseData);
            checkout = responseData.id;
            console.log(checkout);
            //renderizar a la vista
            persona.filter({ external_id: req.user.exter }).then(function (persona1) {
                res.render('index', {
                    layout: 'layout',
                    title: 'Perfil Cliente',
                    fragmento: "carrito/Pago",
                    sesion: true,
                    usuario: { persona: req.user.nombre },
                    active: { articulo: true },
                    Checkout: checkout,
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info'),
                        success: req.flash('success')
                    },
                    precio: pt

                });
            });
            // finguardar reserva 
        });

    }
    /*----------------------------*/
    /*--RESULTADO DE PAGO Y ACTUALIZACION DE LA pago--*/
    verResultadoPago(req, res) {

        function requests(callback) {
            var path = '/v1/checkouts/' + checkout + '/payment';
            path += '?authentication.userId=8a8294175d602369015d73bf00e5180c';
            path += '&authentication.password=dMq5MaTD5r';
            path += '&authentication.entityId=8a8294175d602369015d73bf009f1808';
            var options = {
                port: 443,
                host: 'test.oppwa.com',
                path: path,
                method: 'GET'
            };
            var postRequest = https.request(options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    jsonRes = JSON.parse(chunk);
                    return callback(jsonRes);
                });
            });
            postRequest.end();
        }
        requests(function (responseData) {
            console.log(responseData);
            pago.save({
                paymentBrand: responseData.paymentBrand,
                code: responseData.result.code,
                last4Digits: responseData.card.last4Digits
            }).then(function (newTranferencia, created) {
            });
        });
    }
}
module.exports = pagoControl;