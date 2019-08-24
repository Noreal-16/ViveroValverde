var base_url = 'http://localhost:8001/';
/**
 * Muestra la cantidad de productos agregados al carrito
 * @param {*} data 
 */
function mostrarDatosServicio(data) {
    console.log(data);
    var cantidad = 0;
    $.each(data, function(i, item) {

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
        success: function(data, textStatus, jqXHR) {
            mostrarDatosServicio(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

function cargarTablaServicio(data) {
    console.log(data);
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
        html += '<tbody id="carritoDatosServicio">';
    }

    $.each(data, function(index, item) {
        html += '<tr><td>';
        html += '<div class="input-group">'
        html += '<input readonly type="text" value="' + item.cantidad + '" class="form-control col-md-2">';
        html += '<a href="#" onClick="return itemSer(' + "'" + item.external + "'" + ', 1)" class="btn btn-danger">-</a>';
        html += '</div></td><td>' + item.nombre + '  [' + item.descripcion + ']</td>';
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
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            mostrarDatosServicio(data);
            cargarTablaServicio(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
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
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            mostrarDatosServicio(data);
            cargarTablaServicio(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
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
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            refrescarServicio();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}

/**
 * busca por nombre cada los servicios guardados
 */
function buscaServicio() {
    $("#buscar").click(function() {
        var texto = $("#texto").val();
        console.log(texto);
        $.ajax({
            url: base_url + "servicio/buscar",
            data: 'texto=' + texto,
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                var html = '';
                if (data.length != 0) {
                    $.each(data, function(index, item) {
                        html += '<div class="row form-group ">';
                        html += '<div class="col-md-8 col-lg-6 col-sm-4">';
                        html += '<div class="card text-center card-product">';
                        html += '<div class="card-product__img">';
                        html += '<img class="card-img" src="/images/g2.jpg" alt="">';
                        html += '<ul class="card-product__imgOverlay">';
                        html += ' <li><button data-toggle="modal"data-target="#detalle"data-toggle="modal"  onclick="cargardetalleServicio(' + item.external_id + ')"><i class="ti-search"></i></button></li>';
                        html += '<li><button name="external" onclick="return agregarServicio(' + item.external_id + ')"><i class="ti-shopping-cart"></i></button></li>';
                        html += '<li><button><i class="ti-heart"></i></button></li> </ul>';
                        html += '<div class="card-body">';
                        html += '<p>' + item.descripcion + '</p>';
                        html += '<h4 class="card-product__title"><a href="#">' + item.nombre + '</a></h4>';
                        html += '<p class="card-product__price"><b>Precio: </b>$' + item.precio + '<br><b>Medida: </b>' + item.medida + ' metros</p>';
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