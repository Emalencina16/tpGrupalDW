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
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center";

    const card = document.createElement("div");
    card.classList.add("card-galeria", "card", "h-auto", "position-relative", "shadow","border-none", "p-0", "my-3", "flex-grow-2");
    card.style.width = "20rem";

    card.innerHTML = `
      <img src="${salon.imagen || '../img/default.jpg'}" class="card-img-top w-100 object-fit-cover" style="height:13rem;" alt="${salon.nombre}"/>
      <div class="card-body d-flex flex-column">
        <h3 class="card-title text-primary text-center">${salon.nombre}</h3>
        <p class="card-text my-1"><strong class="fw-semibold">Tipo:</strong> ${salon.tipo}</p>
        <p class="card-text my-1"><strong class="fw-semibold">Capacidad:</strong> ${salon.capacidad} personas</p>
        <p class="card-text my-1"><strong class="fw-semibold">Dirección:</strong> ${salon.direccion}</p>
        <p class="card-text my-1"><strong class="fw-semibold">Precio:</strong> $${salon.precio.toLocaleString()}</p>
        <div class="botones mt-3 text-center d-flex justify-content-around">
          <a href="detallesSalon.html?id=${salon.id}" class="btn btn-info text-white flex-grow-1 w-25 me-2">Ver detalle</a>
          <a href="#" class="btn btn-primary flex-grow-1 w-25">Reservar</a>
        </div>
      </div>
    `;

    // Botón "Reservar" de esta card
    const btnReservar = card.querySelector('.btn.btn-primary');

    btnReservar.addEventListener('click', function (e) {
      e.preventDefault(); // Previene navegación

      const token = sessionStorage.getItem("accessToken");

      // Eliminar alertas anteriores si hay
      const alertaExistente = card.querySelector('.alert');
      if (alertaExistente) alertaExistente.remove();

      if (!token) {
        mostrarModalLogin(); // ✅ Usamos la función global reutilizable
      } else {
        window.location.href = "reserva.html";
      }

    });


    // Funcion eliminar en galeria
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
  const btnExplora = document.querySelector(".btn-explora");
  const btnReserva = document.querySelector(".btn-reservaInicio");
  const btnEliminarModo = document.getElementById("btn-eliminar-modo");

  if (selectTipo) {
    mostrarSalones(selectTipo.value);
    
    selectTipo.addEventListener("change", () => {
      mostrarSalones(selectTipo.value);
    });
  }

  btnExplora.addEventListener("click", function () {
      window.location.href = "../HTML/galeria.html";
    });

  

  // Activar/desactivar modo eliminar
  if (btnEliminarModo) {
    btnEliminarModo.addEventListener("click", () => {
      modoEliminarActivo = !modoEliminarActivo;
      btnEliminarModo.textContent = modoEliminarActivo
        ? "Desactivar Eliminar Salones"
        : "Eliminar Salones";
      if (selectTipo) {
        mostrarSalones(selectTipo.value);
      }
    });
  }

});
