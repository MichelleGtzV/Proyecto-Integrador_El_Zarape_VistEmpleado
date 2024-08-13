let indexBebidaSeleccionado;
let Bebidas = [];

// Función para agregar una nueva bebida
export function addBebida() {
    let nombreBebida = document.getElementById("txtnombreBebida").value;
    let descripcion = document.getElementById("descripcion").value;
    let categoria = document.getElementById("listCategoria").value;
    let precio = document.getElementById("precio").value;

    let fotoInput = document.getElementById("foto");
    let foto = "";
    if (fotoInput.files.length > 0) {
        let file = fotoInput.files[0];
        foto = URL.createObjectURL(file);
    }

    let bebida = {
        nombreBebida,
        descripcion,
        categoria,
        precio,
        foto
    };
    Bebidas.push(bebida);
    clean();
    // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: 'Se ha agregado la bebida'
        });
    loadTablaBebidas();
}

// Función para cargar los datos en la tabla
export function loadTablaBebidas() {
    let cuerpo = "";
    Bebidas.forEach(function (bebida, index) {
        let registro =
            `<tr onclick="moduloGestionBebidas.selectBebida(${index});">
                <td>${bebida.nombreBebida}</td>
                <td>${bebida.descripcion}</td>
                <td>${bebida.categoria}</td>
                <td>${bebida.precio}</td>
                <td><img src="${bebida.foto}" alt="Foto de la bebida" style="width:150px; height:80px;"></td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblBebidas").innerHTML = cuerpo;
}

// Cargar el archivo JSON
fetch("modules/moduloGestionBebidas/data_Bebidas.json")
    .then(response => response.json())
    .then(jsondata => {
        Bebidas = jsondata;
        loadTablaBebidas();
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

// Función para seleccionar una bebida de la tabla
export function selectBebida(index) {
    document.getElementById("txtnombreBebida").value = Bebidas[index].nombreBebida;
    document.getElementById("descripcion").value = Bebidas[index].descripcion;
    document.getElementById("listCategoria").value = Bebidas[index].categoria;
    document.getElementById("precio").value = Bebidas[index].precio;
    // No se puede establecer un valor directamente en un input de tipo "file"

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    
    indexBebidaSeleccionado = index;
}

// Función para limpiar el formulario
export function clean() {
    document.getElementById("bebidaForm").reset();
    document.getElementById("foto").value = ""; 

    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexBebidaSeleccionado = -1;
}

// Función para eliminar una bebida
export function deleteBebida() {
    if (indexBebidaSeleccionado !== undefined) {
        Bebidas.splice(indexBebidaSeleccionado, 1);
        clean();
        // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Se ha eliminado la bebida'
        });
        loadTablaBebidas();
    } else {
        alert("Por favor, seleccione una bebida para eliminar.");
    }
}

// Función para actualizar una bebida
export function updateBebida() {
    let nombreBebida = document.getElementById("txtnombreBebida").value;
    let descripcion = document.getElementById("descripcion").value;
    let categoria = document.getElementById("listCategoria").value;
    let precio = document.getElementById("precio").value;

    let fotoInput = document.getElementById("foto");
    let foto = Bebidas[indexBebidaSeleccionado].foto; // Si no hay nueva foto, se mantiene la existente
    if (fotoInput.files.length > 0) {
        let file = fotoInput.files[0];
        foto = URL.createObjectURL(file);
    }

    let bebida = {
        nombreBebida,
        descripcion,
        categoria,
        precio,
        foto
    };

    Bebidas[indexBebidaSeleccionado] = bebida;
    clean();
    // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Se ha actualizado la bebida'
        });
    loadTablaBebidas();
}

// Función para buscar bebidas
export function searchBebida() {
    let filtro = document.getElementById("txtBusquedaBebida").value;
    let resultados = Bebidas.filter(element => element.nombreBebida === filtro);
    let cuerpo = "";
    resultados.forEach(function (bebida, index) {
        let registro =
            `<tr onclick="moduloGestionBebidas.selectBebida(${Bebidas.indexOf(bebida)});">
                <td>${bebida.nombreBebida}</td>
                <td>${bebida.descripcion}</td>
                <td>${bebida.categoria}</td>
                <td>${bebida.precio}</td>
                <td><img src="${bebida.foto}" alt="Foto de la bebida" style="width:150px; height:80px;"></td>
            </tr>`;
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblBebidas").innerHTML = cuerpo;
}
