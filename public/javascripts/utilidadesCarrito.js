var base_url = 'http://localhost:8001/';
/**
 * Muestra la cantidad de productos agregados al carrito
 * @param {*} data 
 */
function mostrarDatos(data) {
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
function refrescar() {
    var url = base_url + 'listarcarrito';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            mostrarDatos(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

function cargarTabla(data) {
    console.log(data);
    var html = '';
    var total = 0;
    $.each(data, function(index, item) {
        html += '<tr><td>';
        html += '<div class="input-group">'
        html += '<a href="#" onClick="return item(' + "'" + item.external + "'" + ', 0)" class="btn btn-success">+</a>';
        html += '<input readonly type="text" value="' + item.cantidad + '" class="form-control col-md-2">';
        html += '<a href="#" onClick="return item(' + "'" + item.external + "'" + ', 1)" class="btn btn-danger">-</a>';
        html += '</div></td><td>' + item.nombre + '  [' + item.categoria + ']</td>';
        html += '<td>$' + item.precio + '</td>';
        html += '<td>$' + item.precio_total + '</td></tr>';
        total += item.precio_total

    });
    $('#total').text(total);
    // html += '<td></td><td></td><td>Total</td><td>$' + total.toFixed(2) + '</td>';
    $('#carritoDatos').html(html);
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
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            mostrarDatos(data);
            cargarTabla(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
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
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            mostrarDatos(data);
            cargarTabla(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

function agregarItem(external) {
    var url = base_url + 'agregar' + external;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            refrescar();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}
/**
 * Busca por nombre del articulo 
 */
function buscar() {
    $("#buscar").click(function() {
        var texto = $("#texto").val();
        console.log(texto);
        $.ajax({
            url: base_url + "articulo/buscar",
            data: 'texto=' + texto,
            success: function(data, textStatus, jqXHR) {
                console.log(data)
                var html = '';
                if (data.length != 0) {
                    $.each(data, function(index, item) {
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
/**
 * agrega servicio al carrito de compras
 * @param {*} external 
 */
function agregarServicio(external) {
    var url = base_url + 'servicio' + external;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            refrescar();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}