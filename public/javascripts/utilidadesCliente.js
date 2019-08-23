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
        success: function(data, textStatus, jqXHR) {
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
        success: function(data, textStatus, jqXHR) {
            flag = data;
        }
    });
    console.log(flag);
    return flag;
}

function CedulaDiferente(cedula_nueva) {
    var cedula_ant = $("#edit_form #cedula").val();

    return (cedula_nueva !== cedula_ant);
}

function CorreoDiferente(correo_nueva) {
    var correo_ant = $("#edit_form #correo").val();

    return (correo_nueva !== correo_ant);
}

/**
 * Validacion de campos registrar y modificar persona
 */
function validarRegistroPersona() {
    $.validator.addMethod(
        "validaCedula",
        function(value, element) {
            return this.optional(element) || validarCedula(value);
        },
        "Cedula no valida"
    );
    $.validator.addMethod(
        "cedulaRepetida",
        function(value, element) {
            return this.optional(element) || validarCedulaRepetida(value);
        },
        "Cedula ya registrada"
    );
    $.validator.addMethod(
        "correoRepetida",
        function(value, element) {
            return this.optional(element) || validarCorreoRepetida(value);
        },
        "Correo ya registrado"
    );
    $.validator.addMethod( //override email with django email validator regex - fringe cases: "user@admin.state.in..us" or "name@website.a"
        'email',
        function(value, element) {
            return this.optional(element) || /(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-\011\013\014\016-\177])*")@((?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)$)|\[(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}\]$/i.test(value);
        },
        'Verifica que tienes una dirección de correo electrónico válida.'
    );
    // $.validator.methods.email = function (value, element) {
    //     return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+/.test(value);
    // };
    $("#formInicio").validate({
        rules: {
            correoInicio: {
                required: true,
                email: true,
            },
            claveInicio: {
                required: true
            }
        },
        messages: {
            txtcorreo: {
                required: "Ingresar un correo valido"
            },
            clave: {
                required: "Ingrese una clave",
            }
        },
        //permite presentar la validacion de los campos de texto
        highlight: function(element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');

        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#edit_form").validate({
        rules: {
            txtCedulaM: {
                required: true,
                minlength: 10,
                maxlength: 13,
                validaCedula: true,
                cedulaRepetida: CedulaDiferente($("#edit_form input#txtcedula").val())
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
                email: true,
                correoRepetida: CorreoDiferente($("#edit_form input#txtcorreo").val())
            },
            claveM: {
                required: true,
                minlength: 5,
            },
            clave1M: {
                required: true,
                minlength: 5,
                equalTo: "#clave1"
            }
        },
        messages: {
            txtcedulaM: {
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
        highlight: function(element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');

        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    $("#register_form").validate({
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
        highlight: function(element) {
            $(element).closest('.form-group').find(".form-control:first").addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').find(".form-control:first").removeClass('is-invalid');
            $(element).closest('.form-group').find(".form-control:first").addClass('is-valid');

        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}

/**
 * Botones para control de edicion del cliente
 */
function styleEditar(form) {
    form.find("input[name=txtnombreM]").prop("readonly", false);
    form.find("input[name=txtnombreM]").removeClass("form-control-plaintext");
    form.find("input[name=txtnombreM]").addClass("form-control");
    form.find("input[name=txtcorreoM]").prop("readonly", false);
    form.find("input[name=txtcorreoM]").removeClass("form-control-plaintext");
    form.find("input[name=txtcorreoM]").addClass("form-control");
    form.find("input[name=txtdireccionM]").prop("readonly", false);
    form.find("input[name=txtdireccionM]").removeClass("form-control-plaintext");
    form.find("input[name=txtdireccionM]").addClass("form-control");
    form.find("input[name=txtcelularM]").prop("readonly", false);
    form.find("input[name=txtcelularM]").removeClass("form-control-plaintext");
    form.find("input[name=txtcelularM]").addClass("form-control");
    form.find("input[name=txtapellidoM]").prop("readonly", false);
    form.find("input[name=txtapellidoM]").removeClass("form-control-plaintext");
    form.find("input[name=txtapellidoM]").addClass("form-control");
    form.find("input[name=txttelefonoM]").prop("readonly", false);
    form.find("input[name=txttelefonoM]").removeClass("form-control-plaintext");
    form.find("input[name=txttelefonoM]").addClass("form-control");

}

function changeStatusBtn(button) {
    if (button.hasClass("editar")) {
        button.removeClass("editar");
        button.addClass("cancelar");
        button.text("Cancelar");
    } else if (button.hasClass("cancelar")) {
        button.removeClass("cancelar");
        button.addClass("editar");
        button.text("Editar");
    }
}

function styleCancelar(form) {
    form.find("input[name=txtnombreM]").prop("readonly", true);
    form.find("input[name=txtnombreM]").addClass("form-control-plaintext");
    form.find("input[name=txtnombreM]").removeClass("form-control");
    form.find("input[name=txtapellidoM]").prop("readonly", true);
    form.find("input[name=txtapellidoM]").addClass("form-control-plaintext");
    form.find("input[name=txtapellidoM]").removeClass("form-control");
    form.find("input[name=txtdireccionM]").prop("readonly", true);
    form.find("input[name=txtdireccionM]").addClass("form-control-plaintext");
    form.find("input[name=txtdireccionM]").removeClass("form-control");
    form.find("input[name=txtcorreoM]").prop("readonly", true);
    form.find("input[name=txtcorreoM]").addClass("form-control-plaintext");
    form.find("input[name=txtcorreoM]").removeClass("form-control");
    form.find("input[name=txtcelularM]").prop("readonly", true);
    form.find("input[name=txtcelularM]").addClass("form-control-plaintext");
    form.find("input[name=txtcelularM]").removeClass("form-control");
    form.find("input[name=txttelefonoM]").prop("readonly", true);
    form.find("input[name=txttelefonoM]").addClass("form-control-plaintext");
    form.find("input[name=txttelefonoM]").removeClass("form-control");


}

function btnEditarCss(button) {
    if (button.hasClass("editar")) {
        styleEditar(button.parents("form"));
    } else if (button.hasClass("cancelar")) {
        styleCancelar(button.parents("form"));
    }

    changeStatusBtn(button);
}