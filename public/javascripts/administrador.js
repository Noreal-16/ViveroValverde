var base_url = "http://localhost:8001/";



////////////////////////////////////MICROS SERVICIOS PARA CATEGORIA////////////////////////////////////////////////////////////////////
/**
 * Metodo para cargar datos de categoria en el modal
 * consultandolo por el external
 * @param {dato de entrada} external 
 */
function cargardatosCategoria(external) {
    var url = base_url + "cargarCategoria";
    var external = external;
    console.log(external);
    $.ajax({
        url: url,
        dataType: "json",
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            console.log("Aqui recibe => external_Id == " + data.external_id);
            $("#external").val(data.external_id);
            $("#nombre1").val(data.nombre);
            $("#descripcion1").val(data.descripcion);
        }
    });
}

////////////////////////////////////MICROS SERVICIOS PARA ARTICULO////////////////////////////////////////////////////////////////////

/**
 * Recibe el external_aid de articulo para cargara datoa a modificar
 * @param {external_id de articulo} external 
 */
function cargardatosArticulo(external) {
    var url = base_url + "cargarArticulo";
    var external = external;
    console.log(external);
    $.ajax({
        url: url,
        dataType: "json",
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#externalA").val(data.external_id);
            $("#nombreA").val(data.nombre);
            $("#descripcionA").val(data.descripcion);
            $("#tamanioA").val(data.tamanio);
            $("#stockA").val(data.stok);
            $("#precioA").val(data.precio);
            $('#imagenArticuloM').attr("src", "/images/uploads/" + data.portada);
            var html = '';
            $.each(data.lista, function (index, item) {
                if (item.external_id == data.external_idC) {
                    html += '<option value="' + item.external_id + '" selected> ' + item.nombre + '</option>';
                } else {
                    html += '<option value="' + item.external_id + '">' + item.nombre + '</option>';
                }
            });
            $("#categoria1").html(html);
        }
    });
}

/**
 * pERMITE DESACTIVAR el articulo
 * @param {*} external 
 */
function desactivarArticulo(external) {
    var url = base_url + "desactivarArticulo";
    var external = external;
    console.log(external);
    $.ajax({
        url: url,
        dataType: "json",
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            if (data == 'ok') {
                var mensaje = '<div class="alert alert-succes" style="font-size: 10px">';
                mensaje += "Articulo desactivado";
                mensaje += "</div>";
                $("#mensajeDesactiva").show();
                $("#mensajeDesactiva").html(mensaje);
                $("#mensajeDesactiva").hide(4000);
            } else {
                var mensaje = '<div class="alert alert-danger" style="font-size: 10px">';
                mensaje += "Articulo activado no pudo desacctivarse";
                mensaje += "</div>";
                $("#mensajeDesactiva").show();
                $("#mensajeDesactiva").html(mensaje);
                $("#mensajeDesactiva").hide(4000);
            }

        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////MICROS SERVICIOS PARA SERVICIOS////////////////////////////////////////////////////////////////////

/**
 * Micro servuicio que permite cargar datos de servicio
 * @param {*} external 
 */

function cargardatosServicio(external) {
    var url = base_url + "cargarServicio";
    var external = external;
    console.log(external);
    $.ajax({
        url: url,
        dataType: "json",
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#external").val(data.external_id);
            $("#nombrem").val(data.nombre);
            $("#medidam").val(data.medida);
            $("#descripcionm").val(data.descripcion);
            $("#preciom").val(data.precio);
            $('#imagenServicioM').attr("src", "/images/uploadsServicio/" + data.portada);
        }
    });
}
////////////////////////////////////FINALIZA MICROS SERVICIOS PARA CATEGORIA////////////////////////////////////////////////////////////////////

////////////////////////////////////MICROS SERVICIOS PARA CLIENTE////////////////////////////////////////////////////////////////////
/**
 * Metodo permite cargar datos de persona en el modal para ser modificado
 * @param {*} external 
 */

function cargardatosPersona(external) {
    var url = base_url + "cargarPersona";
    var external = external;
    console.log("External cliente; " + external);
    $.ajax({
        url: url,
        dataType: "json",
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#external").val(data.external_id);
            $("#txtnombreM").val(data.nombre);
            $("#txtcedulaM").val(data.cedula);
            $("#txtapellidoM").val(data.apellido);
            $("#txtdireccionM").val(data.direccion);
            $("#txtcorreoM").val(data.correo);
            $("#txttelefonoM").val(data.telefono);
            $("#txtcelularM").val(data.celular);
            $("#claveM").val(data.clave);
            $("#clave1M").val(data.clave);
            $("#userM").val(data.usuario);

            var html = '';
            $.each(data.lista, function (index, item) {
                if (data.external_idR == item.external_id) {
                    html += '<option value="' + item.external_id + '" selected> ' + item.nombre + '</option>';
                } else {
                    html += '<option value="' + item.external_id + '">' + item.nombre + '</option>';
                }
                console.log("External rol: " + data.external_idR + "," + "External lista rol: " + item.external_id);
            });
            $("#txtrolM").html(html);
        }
    });
}


var filas = 0;
var subtotal = 0;
var descuento = 0;
var iva = 0;
var total = 0;
var articulo = new Array();
/**@function external permite la carga de datos deacuerdo al extenal id del articulo */
function AgregarArticulo(external) {
    var url = base_url + "cargarArticulo";
    var external = external;
    console.log(external);
    $.ajax({
        url: url,
        dataType: "json",
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            if (articulo.includes(data.external_id)) {
                var mensaje = '<div class="alert alert-danger" style="font-size: 10px">';
                mensaje += "Articulo ya agregado";
                mensaje += "</div>";
                $("#error").show();
                $("#error").html(mensaje);
                $("#error").hide(4000);
            } else {
                //var path = $('img[alt="imagenArticulo"]').attr('src');
                articulo[filas] = data.external_id;
                console.log(data);

                var html = '<tr class="selected" id="fila' + filas + '">';
                html += '<td>' + filas + '</td>';
                html += '<td>' + data.nombre + '</td>';
                html += '<td><div><input type="number" class="form-control col-sm-6" value="1" min="1" max="' + data.stok + '" step="1" onkeypress="return validaNumero(event)" onchange="calcular(' + filas + ',' + data.precio + ')" maxlength="3" id="num' + filas + '" /></td></div>';
                html += '<td >' + data.precio + '</td>';
                html += '<td id="t' + filas + '">' + data.precio + '</td>';
                html += '<td><a href="#" title="Eliminar" class="btn btn-primary-sm" onclick="eliminarArticulo(' + " '" + data.external_id + "'" + ')"  ><i class="fas fa-trash-alt"></i></a></td>';
                html += '</tr>'
                $("#tbodyFac").append(html);
                filas++;
                subtotal += data.precio;
                iva = subtotal * 0.12;
                total = subtotal + iva;
                $("#subtotal").text(subtotal);
                $("#iva").text(iva);
                $("#total").text(total);
                $("#descuento").text("0.00");
            }
        }
    });
}
function calcular(fila, prec) {

    console.log("llega");
    var valor = $("#num" + fila).val();
    $("#t" + fila).text(valor * prec);

    // subtotal+=data.precio;
    // iva=subtotal*0.12;
    // total=subtotal+iva;
    // $("#subtotal").text(subtotal);
    // $("#iva").text(iva);
    // $("#total").text(total);
    // $("#descuento").text("0.00");


}

/**
 * funcion para presentar galeria de articulo
 * @param {external de articulo} external 
 */
function listarImagenes(external) {
    var url = base_url + "cargarImagenes";
    var external = external;
    console.log(external);
    $.ajax({
        url: url,
        dataType: "json",
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            $("#externalArticulo").val(data.external_idArt);
            $("#nombreArt").text(data.nombre);
            console.log(data);
            var html = '';
            html += '<div class="card-columns">';
            if (data.lista.length > 0) {
                $.each(data.lista, function (index, item) {
                    html += '<div class="card" style="width:150px;height="100"">';
                    html += '<img class="card-img-top" src="/images/uploads/' + item.nonbre + '" width="100" height="100" alt="Card image cap">';
                    html += '<div class="card-img-overlay">';
                    html += '<button type="button" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button>'
                    html += '</div>';
                    html += '</div>';
                });
            } else {
                html += '<div class="card">';
                html += '<img class="card-img-top" src="/images/fondo2listo.jpg" alt="Card image cap">';
                html += '<div class="card-img-overlay">';
                html += '<button type="button" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button>'
                html += '</div>';
                // html += '<div class="card-body">';
                // html += '<a href="#" class="btn btn-danger"><i class="far fa-trash-alt"></i></a>';
                // html += '</div>';
                html += '</div>';
            }
            html += '</div>'
            $("#fileImagen").html(html);

        }
    });
}

/**
 * funcion para obtener la galeria de servicio
 * @param {external de servicio} external 
 */
function listarImagenesServicio(external) {
    var url = base_url + "cargarImagenesServicio";
    var external = external;
    console.log(external);
    $.ajax({
        url: url,
        dataType: "json",
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            $("#externalServicio").val(data.external_idServ);
            $("#nombreServicio").text(data.nombre);
            console.log(data);
            var html = '';
            html += '<div class="card-columns">';
            if (data.lista.length > 0) {
                $.each(data.lista, function (index, item) {
                    html += '<div class="card" style="width:150px;height="100"">';
                    html += '<img class="card-img-top" src="/images/uploadsServicio/' + item.nonbre + '" width="100" height="100" alt="Card image cap">';
                    html += '<div class="card-img-overlay">';
                    html += '<button type="button" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button>'
                    html += '</div>';
                    html += '</div>';
                });
            } else {
                html += '<div class="card">';
                html += '<img class="card-img-top" src="/images/fondo2listo.jpg" alt="Card image cap">';
                html += '<div class="card-img-overlay">';
                html += '<button type="button" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button>'
                html += '</div>';
                // html += '<div class="card-body">';
                // html += '<a href="#" class="btn btn-danger"><i class="far fa-trash-alt"></i></a>';
                // html += '</div>';
                html += '</div>';
            }
            html += '</div>'
            $("#fileImagen").html(html);

        }
    });
}
function guardarImagenes() {
    var url = base_url + "subirImagenes";
    /**
     * Declaro la formdata e instancio la formdata 
     */
    var formData = new FormData($("#formImagen"));

    $.ajax({
        url: url,
        method: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data, textStatus, jqXHR) {
            console.log(data);

        }
    });
}