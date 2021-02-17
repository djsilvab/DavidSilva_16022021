
var srvAlbum = "https://jsonplaceholder.typicode.com/albums";
var srvFotos = "https://jsonplaceholder.typicode.com/photos/";
var srvComentarios = "https://jsonplaceholder.typicode.com/comments";
var idAlbum = 0;
var titleAlbum = "";

window.onload = function () {    
    get(srvAlbum, mostrarAlbunes);
    document.getElementById("btnAlbum").onclick = function () {       
        loadFotos();
    }

    document.getElementById("cboAlbum").onchange = loadFotos;
}

function loadFotos() {
    document.getElementById("dvComentarios").innerHTML = "";
    document.getElementById("spnFoto").innerHTML = "";
    idAlbum = document.getElementById("cboAlbum").value;
    var cboAlbum = document.getElementById("cboAlbum");
    titleAlbum = cboAlbum.options[cboAlbum.selectedIndex].innerHTML;
    get(srvFotos + "?albumId=" + idAlbum, mostrarFotos);
}

function mostrarAlbunes(rpta) {
    debugger
    var lista = JSON.parse(rpta);
    var nReg = lista.length;    
    var item = {};
    var arrAlbum = [];
    for (var i = 0; i < nReg; i++) {
        item = lista[i];//.id+"|"+lista[i].title
        arrAlbum.push(item.id + "|" + item.title);
    }

    crearCombo("cboAlbum", arrAlbum, "-- Seleccione --");
}


function mostrarFotos(rpta) {
    crearTablaFotos();
    var lista = JSON.parse(rpta);
    var nReg = lista.length;
    var item = {};    
    var contenido = "";
    for (var i = 0; i < nReg; i++) {
        item = lista[i];
        contenido += "<tr class='FilaDatos'>";
        contenido += `<td>${item.id}</td>`;
        contenido += `<td>${item.title}</td>`;
        contenido += `<td>${titleAlbum}</td>`;
        contenido += `<td><img src=${item.thumbnailUrl}></img> </td>`;        
        contenido += `<td><button id=btn${item.id} onclick="cargarComentarios(${item.id})">Ver comentarios</button> </td>`;        
        contenido += "</tr>";
    }

    document.getElementById("tbFotos").innerHTML = contenido;
    
}

function crearTablaFotos() {
    var contenido = "<table><thead><tr class='FilaCabecera'>";
    contenido += "<th class='anch-columna-id'> Id </th> ";
    contenido += "<th class='anch-columna-title'> Title </th> ";
    contenido += "<th class='anch-columna-album'> Album </th> ";    
    contenido += "<th class='anch-columna-img'> Body </th> ";    
    contenido += "</tr></thead><tbody id='tbFotos'></tbody></table>";
    document.getElementById("dvFotos").innerHTML = contenido;
}

function cargarComentarios(idFoto) {        
    get(srvComentarios + "?postId=" + idFoto, mostrarComentarios);
    document.getElementById("spnFoto").innerHTML = idFoto;

    var contenido = "<table><thead><tr class='FilaCabecera'>";
    contenido += "<th class='anch-columna-id'> Id </th> ";
    contenido += "<th class='anch-columna-title'> Name </th> ";
    contenido += "<th class='anch-columna-email'> Email </th> ";
    contenido += "<th class='anch-columna-title'> Body </th> ";
    
    contenido += "</tr></thead><tbody id='tbComentarios'></tbody></table>";
    document.getElementById("dvComentarios").innerHTML = contenido;
}

function mostrarComentarios(rpta) {
    var lista = JSON.parse(rpta);
    var nReg = lista.length;
    var item = {};
    var contenido = "";
    for (var i = 0; i < nReg; i++) {
        item = lista[i];
        contenido += "<tr class='FilaDatos'>";
        contenido += `<td>${item.id}</td>`;
        contenido += `<td>${item.name}</td>`;
        contenido += `<td>${item.email}</td>`;
        contenido += `<td>${item.body}</td>`;
        contenido += "</tr>";
    }

    document.getElementById("tbComentarios").innerHTML = contenido;
}
