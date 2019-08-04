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

// validacion de datos
function validar() {
    $.validator.addMethod(
        "soloLetras",
        function(value, element) {
            return this.optional(element) || /^[a-z\s]+$/i.test(value);
        },
        "Solo letras"
    );
    $.validator.addMethod(
        "registro",
        function(value, element) {
            return (
                this.optional(element) || /^[N]-[0-9]{4}-[R]-[0-9]{3}$/.test(value)
            );
        },
        "Ingrese un registro valido ejemplo N-0000-R-000"
    );
    $.validator.addMethod(
        "validaCedula",
        function(value, element) {
            return this.optional(element) || validarCedula(value);
        },
        "Cedula no valida"
    );
    $.validator.methods.email = function(value, element) {
        return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+/.test(value);
    };
    $("#idformulario").validate({
        rules: {
            txtcedula: {
                required: true,
                minlength: 10,
                maxlength: 13,
                number: true,
                validaCedula: true
            },
            txtnombre: {
                required: true,
                soloLetras: true,
                minlength: 4,
                maxlength: 25
            },
            txtapellido: {
                required: true,
                minlength: 4,
                maxlength: 25
            },
            txtregistro: {
                required: true,
                registro: true
            },
            txtcorreo: {
                required: true,
                email: true,
                minlength: 4,
                maxlength: 50
            },
            txtclave: {
                required: true,
                minlength: 4,
                maxlength: 25
            }
        },
        messages: {
            txtcedula: {
                required: "Ingresar un numero de cedula valido",
                minlength: $.format("Necesitamos por lo menos {0} caracteres"),
                maxlength: $.format("{0} caracteres son demasiados!")
            },
            txtnombre: {
                required: "Ingrese un nombre para el registro",
                minlength: $.format("Necesitamos por lo menos {0} caracteres"),
                maxlength: $.format("{0} caracteres son demasiados!")
            },
            txtapellido: {
                required: "Ingrese un apellido",
                minlength: $.format("Necesitamos por lo menos {0} caracteres"),
                maxlength: $.format("{0} caracteres son demasiados!")
            },
            txtregistro: {
                required: "Ingrese un registro valido"
            },
            txtcorreo: {
                required: "Ingresar un correo valido",
                minlength: $.format("Necesitamos por lo menos {0} caracteres"),
                maxlength: $.format("{0} caracteres son demasiados!")
            },
            txtclave: {
                required: "Ingrese una clave",
                minlength: $.format("Necesitamos por lo menos {0} caracteres"),
                maxlength: $.format("{0} caracteres son demasiados!")
            }
        }
    });
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