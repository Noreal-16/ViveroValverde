var base_url = "http://localhost:8001/";

/**
 * cragar Datos del cliente en los pedidos
 * @param {recibe} external 
 */
function cargarCliente(pos,external) {
    $.ajax({
        url: base_url+"pedidoCliente",
        type: 'GET',
        dataType: 'json',
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            var nombres= data.nombre +" "+data.apellido;
            $("#cliente"+pos).text(nombres);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    });
}

function cargarPedidosDetalle(external) {
    console.log(external);
    $.ajax({
        url: base_url+"cargarPedidos",
        type: 'GET',
        dataType: 'json',
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            var nombres= data.nombre +" "+data.apellido;
            $("#cliente"+pos).text(nombres);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    });
}