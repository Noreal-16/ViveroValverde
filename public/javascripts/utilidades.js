/*Para validar solo numeros*/
function validaNumero(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
    // Patron de entrada, en este caso solo acepta numeros
    patron = /[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}
/*Para validar solo numeros reales*/
function validaNumeroReales(e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
    // Patron de entrada, en este caso solo acepta numeros
   var patron = /^\d*(\.\d{1})?\d{0,1}$/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


/*Para validar Letras*/
function validaletra(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
    // Patron de entrada, en este caso solo acepta letras y espacio
    patron = /[A-Z a-z]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

/*Para validar Solo Mayusculas*/

function validaMayuscula(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
    // Patron de entrada, en este caso solo acepta letras mayusculas
    patron = /[A-Z]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


function calcularEdad(fecha) {
    // var fecha = document.getElementById("txtfechaNac");
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    console.log("TIENES: " + edad + " ANIOS");
    return edad;
}

// validacion de cedula
function validarCedula(cedula) {
    var cad = cedula.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9) aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en
                // lugar de sumar
            }
        }
        total = total % 10 ? 10 - (total % 10) : 0;

        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    }
}
// validacion de cedula
function validarCedulaRepetida(cedula) {
    var cedula = cedula.trim();
    var url = "http://localhost:8001/cedulaRepetida";
    console.log(cedula);
    var flag;
    $.ajax({
        url: url,
        dataType: "json",
        data: "cedula=" + cedula,
        async: false,
        success: function (data, textStatus, jqXHR) {
            flag = data;
        }
    });
    console.log(flag);
    return flag;
}
/**
 * Verifica si el correo esta repetido
 */
function validarCorreoRepetida(correo) {
    var correo = correo.trim();
    var url = "http://localhost:8001/correoRepetida";
    console.log(correo);
    var flag;
    $.ajax({
        url: url,
        dataType: "json",
        data: "correo=" + correo,
        async: false,
        success: function (data, textStatus, jqXHR) {
            flag = data;
        }
    });
    console.log(flag);
    return flag;
}

/**
 * Validacion de campos registrar y modificar persona
 */
function validarRegistroPersona() {
    $.validator.addMethod(
        "validaCedula",
        function (value, element) {
            return this.optional(element) || validarCedula(value);
        },
        "Cedula no valida"
    );
    $.validator.addMethod(
        "cedulaRepetida",
        function (value, element) {
            return this.optional(element) || validarCedulaRepetida(value);
        },
        "Cedula ya registrada"
    );
    $.validator.addMethod(
        "correoRepetida",
        function (value, element) {
            return this.optional(element) || validarCorreoRepetida(value);
        },
        "Correo ya registrado"
    );
    $.validator.addMethod( //override email with django email validator regex - fringe cases: "user@admin.state.in..us" or "name@website.a"
        'email',
        function (value, element) {
            return this.optional(element) || /(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-\011\013\014\016-\177])*")@((?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)$)|\[(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}\]$/i.test(value);
        },
        'Verifica que tienes una dirección de correo electrónico válida.'
    );
    // $.validator.methods.email = function (value, element) {
    //     return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+/.test(value);
    // };
    $("#idformulario").validate({
        rules: {
            txtcedula: {
                required: true,
                minlength: 10,
                maxlength: 13,
                validaCedula: true,
                cedulaRepetida: true
            },
            txtnombre: "required",
            txtapellido: "required",
            txtdireccion: "required",
            txtcelular: {
                required: true,
                minlength: 10
            },
            txtcorreo: {
                required: true,
                email: true,
                correoRepetida: true
            },
            clave: {
                required: true,
                minlength: 5,
            },
            clave1: {
                required: true,
                minlength: 5,
                equalTo: "#clave"
            }
        },
        messages: {
            txtcedula: {
                required: "Ingresar un numero de cedula valido",
                minlength: $.validator.format("Necesitamos por lo menos {0} caracteres"),
                maxlength: "{0} caracteres son demasiados!"
            },
            txtnombre: "Ingrese un nombre para el registro",
            txtapellido: "Ingrese un apellido para el registro",
            txtdireccion: "Ingrese una direccion para el registro",
            txtcelular: {
                required: "Ingresar un numero de celular",
                minlength: "Necesitamos por lo menos {0} caracteres",
            },
            txtcorreo: {
                required: "Ingresar un correo valido"
            },
            clave: {
                required: "Ingrese una clave",
                minlength: "Necesitamos por lo menos {0} caracteres",
            },
            clave1: {
                required: "Ingrese una clave",
                minlength: "Necesitamos por lo menos {0} caracteres",
                equalTo: "La contraseña no coincide"
            }
        },
        //permite presentar la validacion de los campos de texto
        highlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');

        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    $("#idformularioM").validate({
        rules: {
            txtCedulaM: {
                required: true,
                minlength: 10,
                maxlength: 13,
                validaCedula: true
            },
            txtnombreM: "required",
            txtapellidoM: "required",
            txtdireccionM: "required",
            txtcelularM: {
                required: true,
                minlength: 10
            },
            txtcorreoM: {
                required: true,
                email: true
            },
            claveM: {
                required: true,
                minlength: 5,
            },
            clave1M: {
                required: true,
                minlength: 5,
                equalTo: "#claveM"
            }
        },
        messages: {
            txtCedulaM: {
                required: "Ingresar un numero de cedula valido",
                minlength: $.validator.format("Necesitamos por lo menos {0} caracteres"),
                maxlength: "{0} caracteres son demasiados!"
            },
            txtnombreM: "Ingrese un nombre para el registro",
            txtapellidoM: "Ingrese un apellido para el registro",
            txtdireccionM: "Ingrese una direccion para el registro",
            txtcelularM: {
                required: "Ingresar un numero de celular",
                minlength: "Necesitamos por lo menos {0} caracteres",
            },
            txtcorreoM: {
                required: "Ingresar un correo valido"
            },
            claveM: {
                required: "Ingrese una clave",
                minlength: "Necesitamos por lo menos {0} caracteres",
            },
            clave1M: {
                required: "Ingrese una clave",
                minlength: "Necesitamos por lo menos {0} caracteres",
                equalTo: "La contraseña no coincide"
            }
        },
        //permite presentar la validacion de los campos de texto
        highlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');

        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}
/***
 * Validacion servicio de jardineria
 */
function validarServicio() {
    $("#formulario").validate({
        rules: {
            nombre: "required",
            medida: "required",
            descripcion: "required",
            precio: "required"
        },
        messages: {
            nombre: "Ingrese un nombre para el registro",
            medida: "Ingrese la medida ",
            descripcion: "Ingrese una descripcion del servicio",
            precio: "Debe ingresar un precio del producto",
        },
        //permite presentar la validacion de los campos de texto
        highlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');

        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    $("#formularioM").validate({
        rules: {
            nombrem: "required",
            medidam: "required",
            descripcionm: "required",
            preciom: "required"
        },
        messages: {
            nombrem: "Ingrese un nombre para el registro",
            medidam: "Ingrese la medida ",
            descripcionm: "Ingrese una descripcion del servicio",
            preciom: "Debe ingresar un precio del producto",
        },
        //permite presentar la validacion de los campos de texto
        highlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');

        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}
/**
 * Validacion de categorias
 */
function validarCategoria() {
    //validar registro
    $("#formulario").validate({
        rules: {
            nombre: "required",
            descripcion: "required"
        },
        messages: {
            nombre: "Ingrese un nombre para el registro",
            descripcion: "Ingrese una descripcion del servicio"
        },
        //permite presentar la validacion de los campos de texto
        highlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');
        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    //validar modificacion
    $("#formularioM").validate({
        rules: {
            nombre1: "required",
            descripcion1: "required"
        },
        messages: {
            nombre1: "Ingrese un nombre para el registro",
            descripcion1: "Ingrese una descripcion del servicio"
        },
        //permite presentar la validacion de los campos de texto
        highlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');
        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}

/**
 * Validacion de categorias
 */
function validarArticulo() {
    //validar registro
    $("#formArticulo").validate({
        rules: {
            nombre: "required",
            descripcion: "required",
            tamanio: "required",
            precio: "required"
        },
        messages: {
            nombre: "Ingrese un nombre para el registro",
            descripcion: "Ingrese una descripcion del servicio",
            tamanio: "Ingrese un tamaño para el registro",
            precio: "Ingrese un precio para el registro"
        },
        //permite presentar la validacion de los campos de texto
        highlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');
        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    //validar modificacion
    $("#formArticuloM").validate({
        rules: {
            nombreA: "required",
            descripcionA: "required",
            tamanioA: "required",
            precioA: "required"
        },
        messages: {
            nombreA: "Ingrese un nombre para el registro",
            descripcionA: "Ingrese una descripcion del servicio",
            tamanioA: "Ingrese un tamaño para el registro",
            precioA: "Ingrese un precio para el registro"
        },
        //permite presentar la validacion de los campos de texto
        highlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');
        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}

//metodo para visualizar contraseña
$(function () {
    $("#verContrasenia1").addClass("fas fa-eye-slash");
    $("#verContrasenia1").click(function () {
        var cambio = document.getElementById("claveM");
        if (cambio.type == "password") {
            cambio.type = "text";
            $("#verContrasenia1").removeClass("fas fa-eye-slash").addClass("fas fa-eye");
        } else {
            cambio.type = "password";
            $("#verContrasenia1").removeClass("fas fa-eye").addClass("fas fa-eye-slash");
        }
    });
    $("#verContrasenia2").addClass("fas fa-eye-slash");
    $("#verContrasenia2").click(function () {
        var cambio = document.getElementById("clave1M");
        if (cambio.type == "password") {
            cambio.type = "text";
            $("#verContrasenia2").removeClass("fas fa-eye-slash").addClass("fas fa-eye");
        } else {
            cambio.type = "password";
            $("#verContrasenia2").removeClass("fas fa-eye").addClass("fas fa-eye-slash");
        }
    });
    $("#verContrasenia").addClass("fas fa-eye-slash");
    $("#verContrasenia").click(function () {
        var cambio = document.getElementById("clave");
        if (cambio.type == "password") {
            cambio.type = "text";
            $("#verContrasenia").removeClass("fas fa-eye-slash").addClass("fas fa-eye");
        } else {
            cambio.type = "password";
            $("#verContrasenia").removeClass("fas fa-eye").addClass("fas fa-eye-slash");
        }
    });
    $("#verContraseniag").addClass("fas fa-eye-slash");
    $("#verContraseniag").click(function () {
        var cambio = document.getElementById("clave1");
        if (cambio.type == "password") {
            cambio.type = "text";
            $("#verContraseniag").removeClass("fas fa-eye-slash").addClass("fas fa-eye");
        } else {
            cambio.type = "password";
            $("#verContraseniag").removeClass("fas fa-eye").addClass("fas fa-eye-slash");
        }
    });
});

/**
 * Configuracion de busqueda en tabla
 * 
 */
function dataTable() {
    //tabla pedidos data tables para realizar busquedas
    $('#tablapedido').DataTable({
        "dom": "Blfrtip",
        "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }

    });
    //configuracion para busqueda de persona
    $('#listaCliente').DataTable({
        "dom": "Blfrtip",
        "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }

    });

    $('#listaServicio').DataTable({
        "dom": "Blfrtip",
        "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "oAria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });
    $('#listaArticulo').DataTable({
        // "dom": "Blfrtip",
        // "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "oAria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });
    $('#listaCategoria').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "oAria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });
    /**
     * Agrega datatable a a tabla de agregar articulos
     */
    $('#agregarArticulo').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Registros de _START_ al _END_  total:  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "oAria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
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
    $('#fechaActual').val(ano + "/" + mes + "/" + dia);
}
/**
* Cargar Detalle y galeria de servicio
* 
*/
var base_url = "http://localhost:8001/";
///////////Micro servicio para detalle///////////////
function cargardetalleServicio(external) {
    var url = base_url + "Detalle";
    var external = external;
    console.log(external);
    $.ajax({
        url: url,
        dataType: "json",
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#nombre").val(data.precio);

        }
    });
}