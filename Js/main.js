let moduloGestionCombos;
let moduloGestionSucursal;
let moduloGestionBebidas;
let moduloGestionAlimentos;
let moduloGestionUsuarios;

function cargarModuloCombos() {
    const url = "modules/moduloGestionCombos/combos.html";
    fetch(url)
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('No se pudo cargar el módulo html');
            }
            // Devolver el código del módulo como texto
            return response.text();
        })
        .then(html => {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            // Importar el controlador del módulo
            import("../modules/moduloGestionCombos/Controlador_combos.js").then(controller => {
                moduloGestionCombos = controller;
                moduloGestionCombos.loadTablaCombos();
            });
        })
        .catch(error => {
            console.error('Error al cargar el módulo:', error);
        });
}

function cargarModuloSucursales(){
    fetch("modules/moduloGestionSucursal/sucursales.html")
            .then(
                function(response){
                    return response.text();
                }
            )
            .then(
                function(html){
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("../modules/moduloGestionSucursal/Controlador_sucursal.js").then(
                            function(controller){
                                moduloGestionSucursal = controller;
                                moduloGestionSucursal.loadTablaSucursales();
                            }
                            );
                }
            );
}

function cargarModuloBebidas(){
    fetch("modules/moduloGestionBebidas/bebidas.html")
            .then(
                function(response){
                    return response.text();
                }
            )
            .then(
                function(html){
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("../modules/moduloGestionBebidas/Controlador_bebidas.js").then(
                            function(controller){
                                moduloGestionBebidas = controller;
                                modulloGestionBebidas.loadTablaBebidas();
                            }
                            );
                }
            );
}

function cargarModuloAlimentos(){
    fetch("modules/moduloGestionAlimentos/alimentos.html")
            .then(
                function(response){
                    return response.text();
                }
            )
            .then(
                function(html){
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("../modules/moduloGestionAlimentos/Controlador_alimentos.js").then(
                            function(controller){
                                moduloGestionAlimentos = controller;
                                moduloGestionAlimentos.loadTablaAlimentos();
                            }
                            );
                }
            );
}

function cargarModuloUsuarios(){
    fetch("modules/moduloGestionUsuarios/usuarios.html")
            .then(
                function(response){
                    return response.text();
                }
            )
            .then(
                function(html){
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                        import ("../modules/moduloGestionUsuarios/Controlador_usuarios.js").then(
                            function(controller){
                                moduloGestionUsuarios = controller;
                                moduloGestionUsuarios.loadTablaUsuarios();
                            }
                            );
                }
            );
}
