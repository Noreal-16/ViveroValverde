var base_url = 'http://localhost:8001/';



/***
 * meyodo para caragar datos de servicio
 *-------------------------------------------------------------------------------------------------------->
 */
/**
 * Muestra la cantidad de productos agregados al carrito
 * @param {*} data 
 */
function mostrarDatosServicio(data) {
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
function refrescarServicio() {
    var url = base_url + 'listarServicio';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            mostrarDatosServicio(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

function cargarTablaServicio(data) {
    listaServicio = data;
    console.log(listaServicio);

    var html = '';
    var descuento = 0;
    var subtotal = 0;
    var total = 0;

    if (data.length > 0) {

        html += '<thead>';
        html += '<tr>';
        html += '<th>Cantidad</th>';
        html += '<th>Descripción</th>';
        html += '<th>Precio por metro cuadrado</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody id="carritoDatosServicio">';
    }

    $.each(data, function (index, item) {
        html += '<tr><td>';
        html += '<div class="input-group">'
        html += '<input readonly type="text" value="' + item.cantidad + '" class="form-control col-md-2">';
        html += '<a href="#" onClick="return itemSer(' + "'" + item.external + "'" + ', 1)" class="btn btn-danger">-</a>';
        html += '</div></td><td>' + item.nombre + '  [' + item.descripcion + ']</td>';
        html += '<td>$' + item.precio + '</td>';

    });
    html += '</tbody>';
    // html += '<td></td><td></td><td>Total</td><td>$' + total.toFixed(2) + '</td>';
    $('#carritoS').html(html);
}
/**
 * Agrega los datos a la tabla del carrito 
 * @param {*} external 
 * @param {*} tipo 
 */
function itemSer(external, tipo) {

    var url = (tipo == 1) ? base_url + 'quitarServicio' + external : url;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            mostrarDatosServicio(data);
            cargarTablaServicio(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}

function mostrarSevicio() {
    var url = base_url + 'listarServicio';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            mostrarDatosServicio(data);
            cargarTablaServicio(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

function agregarServicio(external) {
    var external = external;
    console.log(external);
    var url = base_url + 'agregarServicio' + external;
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            refrescarServicio();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}

/**
 * busca por nombre cada los servicios guardados
 */
function buscaServicio() {
    $("#buscar").click(function () {
        var texto = $("#texto").val();
        console.log(texto);
        $.ajax({
            url: base_url + "servicio/buscar",
            data: 'texto=' + texto,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                var html = '';
                if (data.length != 0) {
                    $.each(data, function (index, item) {
                        html += '<div class="col-md-4 col-lg-3">';
                        html += '<div class="card text-center card-product mb-3">';
                        html += '<div class="card-product__img">';
                        html += '<img class="card-img" src="/images/uploadsServicio/' + item.portada + '" alt="">';
                        html += '<ul class="card-product__imgOverlay">';
                        html += '<li><button type="button" data-target="#detalle" data-toggle="modal" onclick="cargarImagenesServicio(' + " '" + item.external_id + "'" + ')"><i class="ti-search"></i></button></li>';
                        html += '<li><button name="external" onclick="return agregarServicio(' + " '" + item.external_id + "'" + ')"><i class="ti-shopping-cart"></i></button></li>';
                        html += '</ul>';
                        html += '</div>'
                        html += '<div class="card-body">';
                        html += '<h4 class="card-product__title"><a href="#">' + item.nombre + '</a></h4>';
                        html += '<p class="card-product__price"><b>Precio: </b>$' + item.precio + '<br><b> por metro cuadrado. Medida minima: </b>' + item.medida + ' metros</p>';
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




/***
 * datos carrito de compra articulos
 * -----------------------------------------------------------------------------------------------
 */
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
var listaServicio;

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
                        html += '<div class="col-md-4 col-lg-3">';
                        html += '<div class="card  text-center card-product mb-3" >';
                        html += '<div class="card-product__img">';
                        html += '<img class="card-img" src="/images/uploads/' + item.portada + '" alt="">';
                        html += '<ul class="card-product__imgOverlay">';
                        html += '<li><button data-target="#detalle" data-toggle="modal" onclick="cargarGaleria(' + " '" + item.external_id + "'" + ')"><i class="ti-search"></i></button></li>';
                        html += '<li><button name="external" onclick="return agregarItem(' + " '" + item.external_id + "'" + ')"><i class="ti-shopping-cart"></i></button></li>';
                        html += '</ul>';
                        html += '</div>';
                        html += '<div class="card-body">';
                        html += '<p>' + item.categoria.nombre + '</>';
                        html += '<h4 class="card-product__title"><a href="#">' + item.nonbre + '</a></h4>';
                        html += '<p class="card-product__price"><b>Precio: </b>$' + item.precio + '<br><b>Quedan: </b>' + item.stok + ' unidades</p>';
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
    var detalleServ = listaServicio;
    console.log("Lista articulo; ");
    console.log(listaArticulo);
    console.log("Lista servicio; ");
    console.log(listaServicio);
    if (dataDetalle.length > 0 || detalleServ.length > 0) {
        // alert("llega success");
        var external = external;
        console.log(external);
        // data: { dataF: JSON.stringify(dataF), listaArt: JSON.stringify(listaArticulos) }
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
                data: { dataA: JSON.stringify(dataA), listaArt: JSON.stringify(dataDetalle), listaSer: JSON.stringify(detalleServ) },
                success: function (data, textStatus, jqXHR) {
                    console.log("Retorno de guardado  ==> { " + data.data);
                    mensajePrese("Pedio realizada con exito");
                    alert("Pedido realizado con exito");
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
            mensajePrese("Inicie session o Registrese para realizar el pedido")
        }
    } else {
        mensajePrese("Seleccione un articulo o servicio para generar el pedido");
    }


}
function mensajePrese(mensaje1) {
    var mensaje = '<div class="alert alert-danger" style="font-size: 15px">';
    mensaje += mensaje1;
    mensaje += '</div>';
    $("#errorClienteFac").show();
    $("#errorClienteFac").html(mensaje);
    $("#errorClienteFac").hide(8000);
}