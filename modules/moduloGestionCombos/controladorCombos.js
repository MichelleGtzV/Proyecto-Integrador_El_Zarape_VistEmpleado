let indexComboSeleccionado;
let combos = [];

export function addCombo() {
    let nombre, alimento, bebida, descripcion, precio, foto;

// llamamos id del html y los istanciamos en un nuevo valor
    nombre = document.getElementById("nombreCombo").value;
    alimento = document.getElementById("listAlimento").value;
    bebida = document.getElementById("listBebida").value;
    descripcion = document.getElementById("descripcion").value;
    precio = document.getElementById("precio").value;

//  declaramos fotoInput donde le damos el valor optenido por el id foto en el html
    let fotoInput = document.getElementById("foto");
    if (fotoInput.files.length > 0) {
        let file = fotoInput.files[0];
        foto = URL.createObjectURL(file);
    } else {
        foto = ""; // en caso de que no se seleccione una foto
    }

//agregamos un nuevo array (arreglo) llamado combo 
//donde guardaremos los nueos valores
    let combo = {};
    combo.nombre = nombre;
    combo.alimento = alimento;
    combo.bebida = bebida;
    combo.descripcion = descripcion;
    combo.precio = precio;
    combo.foto = foto;
    combos.push(combo);
    clean();
    // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: 'Se ha agrgado el combo'
        });
    loadTabla();
    
}

export function loadTabla() {
    let cuerpo = "";
    combos.forEach(function (combo) {
        let registro =
                '<tr onclick="moduloGestionCombos.selectCombo(' + combos.indexOf(combo) + ');">' +
                '<td>' + combo.nombre + '</td>' +
                '<td>' + combo.alimento + '</td>' +
                '<td>' + combo.bebida + '</td>' +
                '<td>' + combo.descripcion + '</td>' +
                '<td>' + combo.precio + '</td>' +
                '<td><img src="' + combo.foto + '" alt="Foto del combo" style="width="150" height="80";"></td></tr>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblCombos").innerHTML = cuerpo;
}

fetch("modules/moduloGestionCombos/data_Combos.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (jsondata) {
            combos = jsondata;
            console.log(combos);
            loadTabla();
        });

export function selectCombo(index) {
//    llamamos el id del html y lo istanciamos en el valor del
//    index actual de combos con su respectivo valor
    document.getElementById("nombreCombo").value = combos[index].nombre;
    document.getElementById("listAlimento").value = combos[index].alimento;
    document.getElementById("listBebida").value = combos[index].bebida;
    document.getElementById("descripcion").value = combos[index].descripcion;
    document.getElementById("precio").value = combos[index].precio;

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexComboSeleccionado = index;
}

export function clean() {
    document.getElementById("nombreCombo").value = "";
    document.getElementById("listAlimento").value = "";
    document.getElementById("listBebida").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("foto").value = "";

    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexComboSeleccionado = 0;
}

export function updateCombo() {
    let nombre, alimento, bebida, descripcion, precio, foto;

// llamamos id del html y los istanciamos en un nuevo valor
    nombre = document.getElementById("nombreCombo").value;
    alimento = document.getElementById("listAlimento").value;
    bebida = document.getElementById("listBebida").value;
    descripcion = document.getElementById("descripcion").value;
    precio = document.getElementById("precio").value;

    let fotoInput = document.getElementById("foto");
    if (fotoInput.files.length > 0) {
        let file = fotoInput.files[0];
        foto = URL.createObjectURL(file);
    } else {
        foto = combos[indexComboSeleccionado].foto; // Si no hay nueva foto, se mantiene la existente
    }

    let combo = {};
    combo.nombre = nombre;
    combo.alimento = alimento;
    combo.bebida = bebida;
    combo.descripcion = descripcion;
    combo.precio = precio;
    combo.foto = foto;
//    repetimos lo mismo que en agregar solo que aqui llamamos
//    dentro de combos el index actual y le instroducimos el nuevo combo 
    combos[indexComboSeleccionado] = combo;
    clean();
    loadTabla();
}

export function searchCombo() {
    let filtro = document.getElementById("txtBusquedaCombo").value;
    let resultados = combos.filter(element => element.nombre === filtro);
    let cuerpo = "";
    resultados.forEach(function (combo) {
        let registro =
                '<tr onclick="moduloGestionCombos.selectCombo(' + combos.indexOf(combo) + ');">' +
                '<td>' + combo.nombre + '</td>' +
                '<td>' + combo.alimento + '</td>' +
                '<td>' + combo.bebida + '</td>' +
                '<td>' + combo.descripcion + '</td>' +
                '<td>' + combo.precio + '</td>' +
                '<td><img src="' + combo.foto + '" alt="Foto del combo" style="width="150" height="80";"></td></tr>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblCombos").innerHTML = cuerpo;
}

export function deleteCombo() {
    if (indexComboSeleccionado !== undefined) {
        // splice elimina el combo seleccionado de la lista
        combos.splice(indexComboSeleccionado, 1);
        clean();
        loadTabla();
    } else {
        alert("Por favor, seleccione un combo para eliminar.");
    }
}