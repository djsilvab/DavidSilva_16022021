function get(url, metodoCallBack) {
    requestServer(url, "get", metodoCallBack);
}

function requestServer(url, metodoHttp, metodoCallBack) {
    var xhr = new XMLHttpRequest();
    xhr.open(metodoHttp, url);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            //metodoCallBack(xhr.responseText);
            metodoCallBack(xhr.response)
        }
    }
    xhr.send();
}

function crearCombo(nombreCombo, lista, primerItem, itemSeleccionado) {
    var contenido = "";
    if (primerItem != null && primerItem != "") {
        contenido += "<option value=''>";
        contenido += primerItem;
        contenido += "</option>";
    }

    if (lista != null && lista.length > 0) {
        var nRegistros = lista.length;
        if (nRegistros > 0) {
            var campos;
            for (var i = 0; i < nRegistros; i++) {
                campos = lista[i].split("|");
                contenido += "<option value='";
                contenido += campos[0];
                if (itemSeleccionado != null && itemSeleccionado != "" && itemSeleccionado == campos[0]) contenido += "' selected>";
                else contenido += "'>";
                contenido += campos[1];
                contenido += "</option>";
            }
        }
    }

    var cbo = document.getElementById(nombreCombo);
    if (cbo != null) cbo.innerHTML = contenido;
}