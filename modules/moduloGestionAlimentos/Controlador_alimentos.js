let indexAlimentoSeleccionado;
let alimentos = [];

// Función para agregar una nueva sucursal
export function addAlimento() {
    let nombreAlimento, descripcion, categoria, precio, foto;

    nombreAlimento = document.getElementById("txtnombreAlimento").value;
    descripcion = document.getElementById("txtdescripcion").value;
    categoria = document.getElementById("listCategoria").value;
    precio = document.getElementById("precio").value;

    let fotoInput = document.getElementById("txtFoto");
    if (fotoInput.files.length > 0) {
        let file = fotoInput.files[0];
        foto = URL.createObjectURL(file);
    } else {
        foto = "";
    }

    let alimento = {
        nombreAlimento: nombreAlimento,
        descripcion: descripcion,
        categoria: categoria,
        precio: precio,
        foto: foto,
        estatus: "Activo"
    };
    alimentos.push(alimento);
    clean(); // Limpiar el formulario después de agregar
    // Mostrar mensaje de agregado
    Swal.fire({
        icon: 'success',
        title: 'Agregado',
        text: 'Se ha agregado el Alimento'
            });
    loadTablaAlimentos();

}

// Función para cargar los datos en la tabla
export function loadTablaAlimentos() {
    let cuerpo = "";
    alimentos.forEach(function (alimento, index) {
        let registro = `
            <tr onclick="moduloGestionAlimentos.selectAlimento(${index});">
                <td>${alimento.nombreAlimento}</td>
                <td>${alimento.descripcion}</td>
                <td>${alimento.categoria}</td>
                <td>${alimento.precio}</td>
                <td><img src="${alimento.foto}" alt="Foto del alimento" style="width: 150px; height: 80px;"></td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblAlimentos").innerHTML = cuerpo;
}

fetch("modules/moduloGestionAlimentos/data_Alimentos.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (jsondata) {
            alimentos = jsondata;
            clean();
            loadTablaAlimentos();
        });

// Función para seleccionar una sucursal de la tabla
export function selectAlimento(index) {
    document.getElementById("txtnombreAlimento").value = alimentos[index].nombreAlimento;
    document.getElementById("txtdescripcion").value = alimentos[index].descripcion;
    document.getElementById("listCategoria").value = alimentos[index].categoria;
    document.getElementById("precio").value = alimentos[index].precio;

    // No se puede establecer un valor directamente en un input de tipo "file"
    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");

    indexAlimentoSeleccionado = index;
}

// Función para limpiar el formulario
export function clean() {
    document.getElementById("txtnombreAlimento").value = "Seleccionar";
    document.getElementById("txtdescripcion").value = "";
    document.getElementById("listCategoria").value = "Seleccionar";
    document.getElementById("precio").value = "";
    document.getElementById("txtFoto").value = "";
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexAlimentoSeleccionado = undefined;
}

// Función para eliminar una sucursal
export function deleteAlimento() {
    if (indexAlimentoSeleccionado !== undefined) {
        alimentos.splice(indexAlimentoSeleccionado, 1);
        clean();
        // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Se ha eliminado el alimento'
                });
        loadTablaAlimentos();
    } else {
        alert("Por favor, seleccione un alimento para eliminar.");
    }


}

// Función para actualizar una sucursal
export function updateAlimento() {
    let nombreAlimento, descripcion, categoria, precio, foto;

    nombreAlimento = document.getElementById("txtnombreAlimento").value;
    descripcion = document.getElementById("txtdescripcion").value;
    categoria = document.getElementById("listCategoria").value;
    precio = document.getElementById("precio").value;

    let fotoInput = document.getElementById("txtFoto");
    if (fotoInput.files.length > 0) {
        let file = fotoInput.files[0];
        foto = URL.createObjectURL(file);
    } else {
        foto = alimentos[indexAlimentoSeleccionado].foto; // Si no hay nueva foto, se mantiene la existente
    }

    let alimento = {
        nombreAlimento: nombreAlimento,
        descripcion: descripcion,
        categoria: categoria,
        precio: precio,
        foto: foto
    };

    alimentos[indexAlimentoSeleccionado] = alimento;
    clean();
    // Mostrar mensaje de agregado
    Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Se ha actualizado el alimento'
            });
    loadTablaAlimentos();
}

// Función para buscar sucursales 
export function searchAlimento() {
    let filtro = document.getElementById("txtBusquedaAlimento").value;
    let resultados = alimentos.filter(element => element.nombreAlimento.includes(filtro));
    let cuerpo = "";
    resultados.forEach(function (alimento) {
        let registro = `
            <tr onclick="moduloGestionAlimentos.selectAlimento(${alimentos.indexOf(alimento)});">
                <td>${alimento.nombreAlimento}</td>
                <td>${alimento.descripcion}</td>
                <td>${alimento.categoria}</td>
                <td>${alimento.precio}</td>
                <td><img src="${alimento.foto}" alt="Foto del alimento" style="width: 150px; height: 80px;"></td>
            </tr>`;
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblAlimentos").innerHTML = cuerpo;
}
