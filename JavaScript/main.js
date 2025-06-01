function mostrarSalones(tipoFiltro) {
  let lista = JSON.parse(localStorage.getItem("salones")) || [];
  const contenedor = document.getElementById("contenedor-salones");
  contenedor.innerHTML = "";

  if (tipoFiltro && tipoFiltro !== "todos") {
    lista = lista.filter(salon => salon.tipo === tipoFiltro);
  }

  lista.forEach(salon => {
    const card = document.createElement("div");
    card.classList.add("card-salon");

    card.innerHTML = `
      <img src="${salon.imagen}" alt="${salon.nombre}" />
      <h3>${salon.nombre}</h3>
      <p><strong>Tipo:</strong> ${salon.tipo}</p>
      <p><strong>Capacidad:</strong> ${salon.capacidad} personas</p>
      <p><strong>Dirección:</strong> ${salon.direccion}</p>
      <p><strong>Precio:</strong> $${salon.precio.toLocaleString()}</p>
      <p>${salon.descripcion}</p>
      <div class="botones">
        <a href="detallesSalon.html?id=${salon.id}" class="btn btn-primary flex-grow-1">Ver detalle</a>
        <a href="#" class="btn btn-primary flex-grow-1">Reservar</a>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const selectTipo = document.getElementById("tipo-salon");

  // Mostrar todos al cargar
  mostrarSalones(selectTipo.value);

  // Actualizar al cambiar filtro
  selectTipo.addEventListener("change", () => {
    mostrarSalones(selectTipo.value);
  });
});