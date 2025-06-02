let modoEliminarActivo = false;

function mostrarSalones(tipoFiltro) {
  let lista = JSON.parse(localStorage.getItem("salones")) || [];
  const contenedor = document.getElementById("contenedor-salones");
  contenedor.innerHTML = "";

  if (tipoFiltro && tipoFiltro !== "todos") {
    lista = lista.filter(salon => salon.tipo === tipoFiltro);
  }

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay salones disponibles.</p>";
    return;
  }

  lista.forEach(salon => {
    const card = document.createElement("div");
    card.classList.add("card-salon");
    card.style.position = "relative";

    // Contenido principal
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
        <a href="editarSalon.html?id=${salon.id}" class="btn btn-warning flex-grow-1">Editar</a>
      </div>
    `;

    // Botón eliminar
    if (modoEliminarActivo) {
      const btnX = document.createElement("button");
      btnX.innerHTML = "x";
      btnX.className = "btn btn-danger btn-sm";
      btnX.style.position = "absolute";
      btnX.style.top = "10px";
      btnX.style.right = "10px";
      btnX.addEventListener("click", () => {
        const confirmacion = confirm(`¿Estás seguro de que querés eliminar el salón "${salon.nombre}"?`);
        if (confirmacion) {
          eliminarSalonPorId(salon.id);
        }
      });
      card.appendChild(btnX);
    }

    contenedor.appendChild(card);
  });
}

function eliminarSalonPorId(id) {
  let lista = JSON.parse(localStorage.getItem("salones")) || [];
  const nuevaLista = lista.filter(salon => salon.id !== id);
  localStorage.setItem("salones", JSON.stringify(nuevaLista));
  mostrarSalones(document.getElementById("tipo-salon").value);
}

document.addEventListener("DOMContentLoaded", () => {
  const selectTipo = document.getElementById("tipo-salon");

  // Mostrar todos los salones al cargar
  mostrarSalones(selectTipo.value);

  // Cambiar filtro al seleccionar tipo
  selectTipo.addEventListener("change", () => {
    mostrarSalones(selectTipo.value);
  });

  // Activar/desactivar modo eliminar
  const btnEliminarModo = document.getElementById("btn-eliminar-modo");
  btnEliminarModo.addEventListener("click", () => {
    modoEliminarActivo = !modoEliminarActivo;
    btnEliminarModo.textContent = modoEliminarActivo
      ? "Desactivar Eliminar Salones"
      : "Eliminar Salones";
    mostrarSalones(selectTipo.value);
  });
});
