// Puedes traer una lista dinámica con Label y Ruta
const direcciones = ["Inicio", "Perfil", "Acerca de", "Ajustes"]


// Y renderizarlos. Donde cada boton recordatá sus parámetros: Label en este caso.
direcciones.forEach((direccion) => {
  const btn = document.createElement("button");
  btn.textContent = direccion;

  btn.addEventListener("click", () => {
    console.log(`Navegando a: ${direccion}`)
  });
});