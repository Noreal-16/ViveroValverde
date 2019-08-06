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
        success: function(data, textStatus, jqXHR) {
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
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            $("#externalA").val(data.external_id);
            $("#nombreA").val(data.nombre);
            $("#descripcionA").val(data.descripcion);
            $("#tamanioA").val(data.tamanio);
            $("#stockA").val(data.stok);
            $("#precioA").val(data.precio);
            var html = '';
            $.each(data.lista, function(index, item) {
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
        success: function(data, textStatus, jqXHR) {
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
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            $("#external").val(data.external_id);
            $("#nombrem").val(data.nombre);
            $("#medidam").val(data.medida);
            $("#descripcionm").val(data.descripcion);
            $("#preciom").val(data.precio);
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
        success: function(data, textStatus, jqXHR) {
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
            $.each(data.lista, function(index, item) {
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