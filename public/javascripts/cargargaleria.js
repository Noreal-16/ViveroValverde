var base_url = "http://localhost:8001/";
function cargarGaleria(external) {
    var url = base_url + 'galeriaArticulo';
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#nombre").text(data.nombre);
            $("#tamanioArt").text(data.tamanio);
            $("#descripcionArt").text(data.descripcion);
            $("#stockArt").text(data.stok);
            $("#precioArt").text(data.precio);
            $("#externalArticulo").text(data.external_idArt);
            $("#btnExternal").val(data.external_idArt);
            var html = '';
            var html1 = '';
            if (data.lista.length > 0) {
                $.each(data.lista, function (index, item) {
                    if (index == 0) {
                        html += '<li data-target="#demo" data-slide-to="' + index + '" class="active"></li>';
                    } else {
                        html += '<li data-target="#demo" data-slide-to="' + index + '"></li>';
                    }
                });
                $.each(data.lista, function (index, item) {
                    if (index == 0) {
                        html1 += '<div class="carousel-item active">';
                        html1 += '<img src="/images/uploads/' + item.nonbre + '" alt="" width="1100" height="500">';
                        html1 += '</div>';
                    } else {
                        html1 += '<div class="carousel-item">';
                        html1 += '<img src="/images/uploads/' + item.nonbre + '" alt="" width="1100" height="500">';
                        html1 += '</div>';
                    }
                });
            } else {
                html1 += '<div class="carousel-item active">';
                html1 += '<img src="/images/not-found.png" alt="" width="1100" height="500">';
                html1 += '</div>';
            }
            $("#ulindicador").html(html);
            $("#divinner").html(html1);



        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    });
}
function cargarImagenesServicio(external) {
    var url = base_url + 'galeriaServicio';
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: "external=" + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#nombre").text(data.nombre);
            $("#medidaServ").text(data.medida + "m2");
            $("#descripcionServ").text(data.descripcion);
            $("#precioServ").text(data.precio);
            $("#btnExternal").val(data.external_idArt);
            var html = '';
            var html1 = '';
            if (data.lista.length > 0) {
                $.each(data.lista, function (index, item) {
                    if (index == 0) {
                        html += '<li data-target="#demo" data-slide-to="' + index + '" class="active"></li>';
                    } else {
                        html += '<li data-target="#demo" data-slide-to="' + index + '"></li>';
                    }
                });
                $.each(data.lista, function (index, item) {
                    if (index == 0) {
                        html1 += '<div class="carousel-item active">';
                        html1 += '<img src="/images/uploadsServicio/' + item.nonbre + '" alt="" width="1100" height="500">';
                        html1 += '</div>';
                    } else {
                        html1 += '<div class="carousel-item">';
                        html1 += '<img src="/images/uploadsServicio/' + item.nonbre + '" alt="" width="1100" height="500">';
                        html1 += '</div>';
                    }
                });
            } else {
                html1 += '<div class="carousel-item active">';
                html1 += '<img src="/images/not-found.png" alt="" width="1100" height="500">';
                html1 += '</div>';
            }
            $("#ulindicador").html(html);
            $("#divinner").html(html1);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    });
}