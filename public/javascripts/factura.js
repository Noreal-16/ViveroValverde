var base_url = "http://localhost:8001/";

/**
 * Metodo para agregar un articulo ala factura
 * @param {recibe} external 
 */
function AgregarArticulo1(external) {
    var url = base_url + 'agregarArt';
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            refrescar();
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    });
    return false;
}



function refrescar() {
    var url = base_url + 'listafacturaArt';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            mostrar(data);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

function mostrar() {
    var url = base_url + 'listafacturaArt';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            // mostrarDatos(data);
            cargarTabla(data);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

/**
 * 
 * @param {*} data 
 */

function mostrarDatos(data) {
    var cantidad = 0;
    $.each(data, function (i, item) {
        cantidad += item.stock;
    });
    // $('#cant').html(cantidad);
}

function cargarTabla(data) {
    console.log(data);
    var html = '';
    var subtotal = 0;
    var descuento = 0;
    var iva = 0;
    var total = 0;
    $.each(data, function (index, item) {
        html += '<tr>';
        html += '<td WIDTH="60">' + (index + 1) + '</td>';
        html += '<td align="center">';
        html += '<div class="input-group">'
        html += '<a href="#" onClick="return item(' + "'" + item.external + "'" + ', 1)" class="btn btn-danger">-</a>';
        html += '<input readonly type="text" value="' + item.cantidad + '" class="form-control col-sm-2">';
        html += '<a href="#" onClick="return item(' + "'" + item.external + "'" + ', 0)" class="btn btn-success">+</a>';
        html += '</div></td><td>' + item.nombre + ' [' + item.categoria + ']</td>';
        html += '<td>$' + item.precio + '</td>';
        html += '<td>$' + item.precio_total + '</td></<td>';
        subtotal += item.precio_total;
        iva = subtotal * 0.12;
        total = subtotal + iva;
    });
    $('#tbodyFac').html(html);
    $("#subtotal").text(subtotal);
    $("#iva").text(iva);
    $("#total").text(total);
    $("#descuento").text("0.00");
}


function item(external, tipo) {
    var url = base_url + 'agregarArt';
    url = (tipo == 1) ? base_url + 'quitarArt' : url;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            // mostrarDatos(data);
            cargarTabla(data);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}
