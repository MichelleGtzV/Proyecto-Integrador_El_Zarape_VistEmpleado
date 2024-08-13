let indexUsuarioSeleccionado;
let usuarios = [];

// Función para agregar un nuevo usuario
export function addUser() {
    let nombre, apellidoPaterno, apellidoMaterno, estado, ciudad, colonia, calle, codigoPostal, telefono, contraseña;

// Obtenemos los valores de los campos del formulario
    nombre = document.getElementById("nombreUsuario").value;
    apellidoPaterno = document.getElementById("apellidoPaterno").value;
    apellidoMaterno = document.getElementById("apellidoMaterno").value;
    estado = document.getElementById("estado").value;
    ciudad = document.getElementById("ciudad").value;
    colonia = document.getElementById("colonia").value;
    calle = document.getElementById("calle").value;
    codigoPostal = document.getElementById("codigoPostal").value;
    telefono = document.getElementById("telefono").value;
    contraseña = document.getElementById("contraseña").value;

// Creamos un nuevo objeto usuario con los valores obtenidos
    let usuario = {};
    usuario.nombre = nombre;
    usuario.apellidoPaterno = apellidoPaterno;
    usuario.apellidoMaterno = apellidoMaterno;
    usuario.estado = estado;
    usuario.ciudad = ciudad;
    usuario.colonia = colonia;
    usuario.calle = calle;
    usuario.codigoPostal = codigoPostal;
    usuario.telefono = telefono;
    usuario.contraseña = contraseña; // encriptado

// Agregamos el nuevo usuario a la lista de usuarios
    usuarios.push(usuario);
    clean();
    // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: 'Se ha agregado el usuario'
        });
    loadTablaUsuarios();
}

// Función para cargar la tabla con los datos de los usuarios
export function loadTablaUsuarios() {
    let cuerpo = "";
    usuarios.forEach(function (usuario) {
        let registro =
                '<tr onclick="moduloGestionUsuarios.selectUser(' + usuarios.indexOf(usuario) + ');">' +
                '<td>' + usuario.nombre + '</td>' +
                '<td>' + usuario.apellidoPaterno + '</td>' +
                '<td>' + usuario.apellidoMaterno + '</td>' +
                '<td>' + usuario.estado + '</td>' +
                '<td>' + usuario.ciudad + '</td>' +
                '<td>' + usuario.colonia + '</td>' +
                '<td>' + usuario.calle + '</td>' +
                '<td>' + usuario.codigoPostal + '</td>' +
                '<td>' + usuario.telefono + '</td></tr>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblUsuarios").innerHTML = cuerpo;
}

// Cargar datos iniciales desde un archivo JSON
fetch("modules/moduloGestionUsuarios/data_Usuarios.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (jsondata) {
            usuarios = jsondata;
            console.log(usuarios);
            loadTablaUsuarios();
        });

// Función para seleccionar un usuario de la tabla
export function selectUser(index) {
    document.getElementById("nombreUsuario").value = usuarios[index].nombre;
    document.getElementById("apellidoPaterno").value = usuarios[index].apellidoPaterno;
    document.getElementById("apellidoMaterno").value = usuarios[index].apellidoMaterno;
    document.getElementById("estado").value = usuarios[index].estado;
    document.getElementById("ciudad").value = usuarios[index].ciudad;
    document.getElementById("colonia").value = usuarios[index].colonia;
    document.getElementById("calle").value = usuarios[index].calle;
    document.getElementById("codigoPostal").value = usuarios[index].codigoPostal;
    document.getElementById("telefono").value = usuarios[index].telefono;

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexUsuarioSeleccionado = index;
}

// Función para limpiar el formulario
export function clean() {
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("apellidoPaterno").value = "";
    document.getElementById("apellidoMaterno").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("ciudad").value = "";
    document.getElementById("colonia").value = "";
    document.getElementById("calle").value = "";
    document.getElementById("codigoPostal").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("contraseña").value = "";

    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexUsuarioSeleccionado = undefined;
}

// Función para actualizar los datos de un usuario
export function updateUser() {
    let nombre, apellidoPaterno, apellidoMaterno, estado, ciudad, colonia, calle, codigoPostal, telefono, contraseña;

    nombre = document.getElementById("nombreUsuario").value;
    apellidoPaterno = document.getElementById("apellidoPaterno").value;
    apellidoMaterno = document.getElementById("apellidoMaterno").value;
    estado = document.getElementById("estado").value;
    ciudad = document.getElementById("ciudad").value;
    colonia = document.getElementById("colonia").value;
    calle = document.getElementById("calle").value;
    codigoPostal = document.getElementById("codigoPostal").value;
    telefono = document.getElementById("telefono").value;
    contraseña = document.getElementById("contraseña").value;

    let usuario = {};
    usuario.nombre = nombre;
    usuario.apellidoPaterno = apellidoPaterno;
    usuario.apellidoMaterno = apellidoMaterno;
    usuario.estado = estado;
    usuario.ciudad = ciudad;
    usuario.colonia = colonia;
    usuario.calle = calle;
    usuario.codigoPostal = codigoPostal;
    usuario.telefono = telefono;
    usuario.contraseña = contraseña; // Aquí deberías implementar la lógica de encriptado

    usuarios[indexUsuarioSeleccionado] = usuario;
    clean();
    // Mostrar mensaje de agregado
    Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Se ha actualizado el usuario'
            });
    loadTablaUsuarios();
}

// Función para buscar un usuario por su nombre
export function searchUser() {
    let filtro = document.getElementById("txtBusquedaUsuario").value;
    let resultados = usuarios.filter(element => element.nombre.includes(filtro));
    let cuerpo = "";
    resultados.forEach(function (usuario) {
        let registro =
                '<tr onclick="moduloGestionUsuarios.selectUser(' + usuarios.indexOf(usuario) + ');">' +
                '<td>' + usuario.nombre + '</td>' +
                '<td>' + usuario.apellidoPaterno + '</td>' +
                '<td>' + usuario.apellidoMaterno + '</td>' +
                '<td>' + usuario.estado + '</td>' +
                '<td>' + usuario.ciudad + '</td>' +
                '<td>' + usuario.colonia + '</td>' +
                '<td>' + usuario.calle + '</td>' +
                '<td>' + usuario.codigoPostal + '</td>' +
                '<td>' + usuario.telefono + '</td></tr>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblUsuarios").innerHTML = cuerpo;
}

// Función para eliminar un usuario
export function deleteUser() {
    if (indexUsuarioSeleccionado !== undefined) {
        usuarios.splice(indexUsuarioSeleccionado, 1);
        clean();
        // Mostrar mensaje de agregado
        Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Se ha eliminado el usuario'
                });
        loadTablaUsuarios();
    } else {
        alert("Por favor, seleccione un usuario para eliminar.");
    }
}
