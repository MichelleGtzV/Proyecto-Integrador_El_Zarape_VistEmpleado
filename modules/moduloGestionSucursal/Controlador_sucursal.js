let indexSucursalSeleccionado;
let sucursales = [];

// Función para agregar una nueva sucursal
export function addSucursal() {
    let nombreSucursal, estado, ciudad, colonia, calle, codigoPostal,
        gpsLongitud, gpsLatitud, horaAbierto, horaCerrado,
        url, foto;
    
    nombreSucursal = document.getElementById("txtNombreSucursal").value;
    estado = document.getElementById("txtEstado").value;
    ciudad = document.getElementById("txtCiudad").value;
    colonia = document.getElementById("txtColonia").value;
    calle = document.getElementById("txtCalle").value;
    codigoPostal = document.getElementById("txtCodigoPostal").value;
    gpsLongitud = document.getElementById("txtGpsLongitud").value;
    gpsLatitud = document.getElementById("txtGpsLatitud").value;
    horaAbierto = document.getElementById("txtHoraAbierto").value;
    horaCerrado = document.getElementById("txtHoraCerrado").value;
    url = document.getElementById("txtUrl").value;

    let fotoInput = document.getElementById("txtFoto");
    if (fotoInput.files.length > 0) {
        let file = fotoInput.files[0];
        foto = URL.createObjectURL(file);
    } else {
        foto = "";
    }
    
    let sucursal = {
        nombreSucursal: nombreSucursal,
        estado: estado,
        ciudad: ciudad,
        colonia: colonia,
        calle: calle,
        codigoPostal: codigoPostal,
        gpsLongitud: gpsLongitud,
        gpsLatitud: gpsLatitud,
        horaAbierto: horaAbierto,
        horaCerrado: horaCerrado,
        url: url,
        foto: foto,
        estatus: "Activo"
    };
    sucursales.push(sucursal);
    // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: 'Se ha agregado la Sucursal'
        });
    loadTablaSucursales();
}

// Función para cargar los datos en la tabla
export function loadTablaSucursales() {
    let cuerpo = "";
    sucursales.forEach(function (sucursal, index) {
        let registro = `
            <tr onclick="moduloGestionSucursal.selectSucursal(${index});">
                <td>${sucursal.nombreSucursal}</td>
                <td>${sucursal.estado}</td>
                <td>${sucursal.ciudad}</td>
                <td>${sucursal.colonia}</td>
                <td>${sucursal.calle}</td>
                <td>${sucursal.codigoPostal}</td>
                <td>${sucursal.gpsLongitud}</td>
                <td>${sucursal.gpsLatitud}</td>
                <td>${sucursal.horaAbierto}</td>
                <td>${sucursal.horaCerrado}</td>
                <td>${sucursal.url}</td>
                <td><img src="${sucursal.foto}" alt="Foto de la sucursal" style="width: 150px; height: 80px;"></td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}

fetch("modules/moduloGestionSucursal/data_Sucursal.json")
    .then(function (response) { return response.json(); })
    .then(function (jsondata) {
        sucursales = jsondata;
        loadTablaSucursales();
    });

// Función para seleccionar una sucursal de la tabla
export function selectSucursal(index) {
    document.getElementById("txtNombreSucursal").value = sucursales[index].nombreSucursal;
    document.getElementById("txtEstado").value = sucursales[index].estado;
    document.getElementById("txtCiudad").value = sucursales[index].ciudad;
    document.getElementById("txtColonia").value = sucursales[index].colonia;
    document.getElementById("txtCalle").value = sucursales[index].calle;
    document.getElementById("txtCodigoPostal").value = sucursales[index].codigoPostal;
    document.getElementById("txtGpsLongitud").value = sucursales[index].gpsLongitud;
    document.getElementById("txtGpsLatitud").value = sucursales[index].gpsLatitud;
    document.getElementById("txtHoraAbierto").value = sucursales[index].horaAbierto;
    document.getElementById("txtHoraCerrado").value = sucursales[index].horaCerrado;
    document.getElementById("txtUrl").value = sucursales[index].url;
    // No se puede establecer un valor directamente en un input de tipo "file"

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    
    indexSucursalSeleccionado = index;
}

// Función para limpiar el formulario
export function clean() {
    document.getElementById("txtNombreSucursal").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtCalle").value = "";
    document.getElementById("txtCodigoPostal").value = "";
    document.getElementById("txtGpsLongitud").value = "";
    document.getElementById("txtGpsLatitud").value = "";
    document.getElementById("txtHoraAbierto").value = "";
    document.getElementById("txtHoraCerrado").value = "";
    document.getElementById("txtUrl").value = "";
    document.getElementById("txtFoto").value = ""; 
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexSucursalSeleccionado = 0;
}

// Función para eliminar una sucursal
export function deleteSucursal() {
    if (indexSucursalSeleccionado !== undefined) {
        sucursales.splice(indexSucursalSeleccionado, 1);
        clean();
        // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Se ha eliminado la sucursal'
        });
        loadTablaSucursales();
    } else {
        alert("Por favor, seleccione una Sucursal para eliminar.");
    }
}

// Función para actualizar una sucursal
export function updateSucursal() {
    let nombreSucursal, estado, ciudad, colonia, calle, codigoPostal,
        gpsLongitud, gpsLatitud, horaAbierto, horaCerrado,
        url, foto;
    
    nombreSucursal = document.getElementById("txtNombreSucursal").value;
    estado = document.getElementById("txtEstado").value;
    ciudad = document.getElementById("txtCiudad").value;
    colonia = document.getElementById("txtColonia").value;
    calle = document.getElementById("txtCalle").value;
    codigoPostal = document.getElementById("txtCodigoPostal").value;
    gpsLongitud = document.getElementById("txtGpsLongitud").value;
    gpsLatitud = document.getElementById("txtGpsLatitud").value;
    horaAbierto = document.getElementById("txtHoraAbierto").value;
    horaCerrado = document.getElementById("txtHoraCerrado").value;
    url = document.getElementById("txtUrl").value;

    let fotoInput = document.getElementById("txtFoto");
    if (fotoInput.files.length > 0) {
        let file = fotoInput.files[0];
        foto = URL.createObjectURL(file);
    } else {
        foto = sucursales[indexSucursalSeleccionado].foto; // Si no hay nueva foto, se mantiene la existente
    }

    let sucursal = {
        nombreSucursal: nombreSucursal,
        estado: estado,
        ciudad: ciudad,
        colonia: colonia,
        calle: calle,
        codigoPostal: codigoPostal,
        gpsLongitud: gpsLongitud,
        gpsLatitud: gpsLatitud,
        horaAbierto: horaAbierto,
        horaCerrado: horaCerrado,
        url: url,
        foto: foto
    };

    sucursales[indexSucursalSeleccionado] = sucursal;
    clean();
    // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Se ha actualizado la sucursal'
        });
    loadTablaSucursal();
}

// Función para buscar sucursales 
export function searchSucursal() {
    let filtro = document.getElementById("txtBusquedaSucursal").value;
    let resultados = sucursales.filter(element => element.nombreSucursal === filtro);
    let cuerpo = "";
    resultados.forEach(function(sucursal){
        let registro =  
                '<tr onclick="moduloGestionSucursal.selectSucursal(' + sucursales.indexOf(sucursal) + ');">' +
                '<td>' + sucursal.nombreSucursal + '</td>' +
                '<td>' + sucursal.estado + '</td>' +
                '<td>' + sucursal.ciudad + '</td>' +
                '<td>' + sucursal.colonia + '</td>' +
                '<td>' + sucursal.calle + '</td>' +
                '<td>' + sucursal.codigoPostal + '</td>' +
                '<td>' + sucursal.gpsLongitud + '</td>' +
                '<td>' + sucursal.gpsLatitud + '</td>' +
                '<td>' + sucursal.horaAbierto + '</td>' +
                '<td>' + sucursal.horaCerrado + '</td>' +
                '<td>' + sucursal.url + '</td>' +
                '<td><img src="' + sucursal.foto + '" alt="Foto de la sucursal" style="width: 150px; height: 80px;"></td></tr>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}


