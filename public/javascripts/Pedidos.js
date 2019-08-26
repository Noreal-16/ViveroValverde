var base_url = "http://localhost:8001/";

/**
 * cragar Datos del cliente en los pedidos
 * @param {recibe} external 
 */
function cargarCliente(pos, external) {
    $.ajax({
        url: base_url + "pedidoCliente",
        type: 'GET',
        dataType: 'json',
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            var nombres = data.nombre + " " + data.apellido;
            $("#cliente" + pos).text(nombres);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    });
}

function cargarPedidosDetalle(external) {
    console.log(external);
    $.ajax({
        url: base_url + "cargarPedidos",
        type: 'GET',
        dataType: 'json',
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#fechaActual").val();
            $("#ivaF").val(data.factura.iva);
            $("#subtotalF").val(data.factura.subtotal);
            $("#totalF").val(data.factura.total);
            $("#descuentoF").val(data.factura.decuento);
            $('#txtcedulaF').val(data.persona.cedula);
            $('#externalCliente').val(data.persona.external_id);
            $('#txtnombresF').val(data.persona.apellidos + " " + data.persona.nombres);
            $('#txtdireccionF').val(data.persona.direccion);
            $('#txttelefonoF').val(data.persona.telefono);
            $('#txtcorreoF').val(data.persona.cuenta.correo);
            $('#externalFcatura').val(data.factura.id);

            var html = '';
            $.each(data.detalle, function (index, item) {
                html += '<tr>';
                html += '<td>' + (index + 1) + '</td>';
                html += '<td>' + item.articulo.nonbre + '</td>';
                html += '<td>' + item.cantidad + '</td>';
                html += '<td>' + item.precio_unit + '</td>';
                html += '<td>' + item.precio_total + '</td>';
                html += '</tr>';
            })
            $("#tbodyPedido").html(html);

            if (data.detalleS.length > 0) {
                var html1 = '';
                html1 += '<div class="col" id="card-servicio">';
                html1 += '<div class="card">';
                html1 += '<div class="card-header">';
                html1 += '<span class="btn btn-success fileinput-button">';
                html1 += '<i class="far fa-images"></i>';
                html1 += '<span>Servicio pedidos</span>';
                html1 += '</span>';
                html1 += '</div>';
                html1 += '<div class="card-body" id="fileImagen">';
                html1 += '<div class="card-columns">';
                $.each(data.detalleS, function (index, item) {
                    html1 += '<div class="card" style="width:200px;height="200"">';
                    html1 += '<img class="card-img-top" src="/images/uploadsServicio/' + item.servicio.portada + '" width="250" height="250" alt="Card image cap">';
                    html1 += '<div class="card-footer">';
                    html1 += '<h4>'+item.servicio.nombre+'</h4>'
                    html1 += '<p>'+item.servicio.precio+'</p>'
                    html1 += '</div>';
                    html1 += '</div>';
                });
                html1 += '</div>'
                html1 += '</div>';
                html1 += '</div>';
                html1 += '</div>';
                $("#col-nueva").html(html1);

            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    });
}