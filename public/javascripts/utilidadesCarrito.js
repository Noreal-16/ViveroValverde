var base_url = 'http://localhost:8001/';
/**
 * Muestra la cantidad de productos agregados al carrito
 * @param {*} data 
 */
function mostrarDatos(data) {
    console.log(data);
    var cantidad = 0;
    $.each(data, function (i, item) {

        cantidad += item.cantidad;
        console.log(cantidad);
    });
    $('#cant').html(data.length);
}
/**
 * Actualizala cantidad de productos agregados al carrito
 */
function refrescar() {
    var url = base_url + 'listarcarrito';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            mostrarDatos(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}
var listaArticulo;

function cargarTabla(data) {
    listaArticulo = data;
    console.log(listaArticulo);
    var html = '';
    var descuento = 0;
    var subtotal = 0;
    var total = 0;
    if (data.length > 0) {

        html += '<thead>';
        html += '<tr>';
        html += '<th>Cantidad</th>';
        html += '<th>Descripción</th>';
        html += '<th>Precio Unitario</th>';
        html += '<th>Precio Total</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody >';
    }
    $.each(data, function (index, item) {
        html += '<tr><td>';
        html += '<div class="input-group">'
        html += '<a href="#" onClick="return item(' + "'" + item.external + "'" + ', 0)" class="btn btn-success">+</a>';
        html += '<input readonly type="text" value="' + item.cantidad + '" class="form-control col-md-2">';
        html += '<a href="#" onClick="return item(' + "'" + item.external + "'" + ', 1)" class="btn btn-danger">-</a>';
        html += '</div></td><td>' + item.nombre + '  [' + item.categoria + ']</td>';
        html += '<td>$' + item.precio + '</td>';
        html += '<td>$' + item.precio_total + '</td></tr>';
        subtotal += item.precio_total
        total = subtotal;
    });
    html += '</tbody>';
    console.log(total);
    $('#total').text(subtotal);
    console.log($('#total').val());
    $('#subtotal').val(subtotal);
    $('#descuento').val("0.00");
    $('#totall').val(total);

    // html += '<td></td><td></td><td>Total</td><td>$' + total.toFixed(2) + '</td>';
    $('#carritoA').html(html);
}
/**
 * Agrega los datos a la tabla del carrito 
 * @param {*} external 
 * @param {*} tipo 
 */
function item(external, tipo) {
    var url = base_url + 'agregar' + external;
    url = (tipo == 1) ? base_url + 'quitar' + external : url;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            mostrarDatos(data);
            cargarTabla(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}

function mostrar() {
    var url = base_url + 'listarcarrito';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            mostrarDatos(data);
            cargarTabla(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

function agregarItem(external) {
    var url = base_url + 'agregar' + external;
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            refrescar();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}
/**
 * Busca por nombre del articulo 
 */
function buscar() {
    $("#buscar").click(function () {
        var texto = $("#texto").val();
        console.log(texto);
        $.ajax({
            url: base_url + "articulo/buscar",
            data: 'texto=' + texto,
            success: function (data, textStatus, jqXHR) {
                console.log(data)
                var html = '';
                if (data.length != 0) {
                    $.each(data, function (index, item) {
                        html += '<div class="row form-group ">';
                        html += '<div class="col-md-6 col-lg-4">';
                        html += '<div class="card text-center card-product">';
                        html += '<div class="card-product__img">';
                        html += '<img class="card-img" src="/images/g1.jpg" alt="">';
                        html += '<ul class="card-product__imgOverlay">';
                        html += '<li><button><i class="ti-search"></i></button></li>';
                        html += '<li><button><i class="ti-shopping-cart"></i></button></li>';
                        html += '<li><button><i class="ti-heart"></i></button></li> </ul>';
                        html += '<div class="card-body">';
                        html += '<p>' + item.categoria.nombre + '</>';
                        html += '<h4 class="card-product__title"><a href="#">' + item.nonbre + '</a></h4>';
                        html += '<p class="card-product__price"><b>Precio: </b>$' + item.precio + '<br><b>Quedan: </b>' + item.stok + ' unidades</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';

                    });
                    $("#datos").html(html);
                } else {
                    alert("El producto ingresado No existe");
                }
            }
        });
    });
}
/**
 * Cargar fecha actual en la factura
 * 
 */
function fechaActual() {
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    return (ano + "/" + mes + "/" + dia);
}
/**
 * Guardar datos articulos
 */
function guardarfactiras(external) {
    var dataDetalle = listaArticulo;
    // console.log("esta es la data del articulo");
    var external = external;
    // console.log(external);
    if (external !== "") {
        var dataA = {
            external_id: external,
            fecha_pedido: fechaActual(),
            fecha_entrga: null,
            iva: '0',
            subtotal: $("#subtotal").val(),
            total: $("#totall").val(),
            descuento: '0',
            tipo_pago: null,
            tipo_fact: 'pedido'
        }
        $.ajax({
            url: base_url + 'guardarFacturas',
            type: 'POST',
            dataType: 'json',
            async: false,
            data: { dataA: JSON.stringify(dataA) },
            success: function (data, textStatus, jqXHR) {
                // console.log("Retorno de guardado  ==> { " + data.data);
                // console.log(data.idFactura);
                $.each(dataDetalle, function (index, item) {
                    var aux = $.param(item)
                    $.ajax({
                        url: base_url + 'guardarDetalleFacturas',
                        type: 'POST',
                        dataType: 'json',
                        data: { item: aux, id: data.idFactura },
                        success: function (data, textStatus, jqXHR) {
                            console.log("Retorno de guardado  ==> { " + data.data);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            //Validar error y dar control de errores : status
                            if (jqXHR.status === 0) {
                                alert('Not connect: Verify Network.');
                            } else if (jqXHR.status == 404) {
                                alert('Requested page not found [404]');
                            } else if (jqXHR.status == 500) {
                                alert('Internal Server Error [500].');
                            } else if (textStatus === 'parsererror') {
                                alert('Requested JSON parse failed.');
                            } else if (textStatus === 'timeout') {
                                alert('Time out error.');
                            } else if (textStatus === 'abort') {
                                alert('Ajax request aborted.');
                            } else {
                                alert('Uncaught Error: ' + jqXHR.responseText);
                            }
                        }

                    });
                });
                alert("Pedido realizado con exito");
                var mensaje = '<div class="alert alert-danger" style="font-size: 15px">';
                mensaje += "Pedido realizado con exito";
                mensaje += '</div>';
                $("#mensajePedido").show();
                $("#mensajePedido").html(mensaje);
                $("#mensajePedido").hide(6000);
                location.href = "/";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //Validar error y dar control de errores : status
                if (jqXHR.status === 0) {
                    alert('Not connect: Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found [404]');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (textStatus === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (textStatus === 'timeout') {
                    alert('Time out error.');
                } else if (textStatus === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error: ' + jqXHR.responseText);
                }
            }

        });
    } else {
        alert("Inicie session o Registrese para realizar el pedido")
    }




}