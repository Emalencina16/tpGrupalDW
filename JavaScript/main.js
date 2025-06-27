let modoEliminarActivo = false;

function mostrarSalones(tipoFiltro = "todos", forzarTodos = false) {
    let lista = JSON.parse(localStorage.getItem("salones")) || [];
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const fechaSeleccionada = document.getElementById("fecha-filtro")?.value;
    const contenedor = document.getElementById("contenedor-salones");
    contenedor.innerHTML = "";

    if (!forzarTodos && tipoFiltro !== "todos") {
        lista = lista.filter(salon => salon.tipo === tipoFiltro);
    }


    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay salones disponibles.</p>";
        return;
    }

    lista.forEach(salon => {
        const estaReservado = reservas.some(r => r.salonId === salon.id && r.fecha === fechaSeleccionada);

        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center";

        const card = document.createElement("div");
        card.classList.add("card-galeria", "card", "h-auto", "position-relative", "shadow", "border-none", "p-0", "my-3", "flex-grow-2");
        card.style.width = "20rem";

        if (estaReservado) {
            card.style.opacity = "0.5";
        }

        card.innerHTML = `
      <img src="${salon.imagen || '../img/default.jpg'}" class="card-img-top w-100 object-fit-cover" style="height:13rem;" alt="${salon.nombre}"/>
      <div class="card-body d-flex flex-column">
        <h3 class="card-title text-primary text-center">${salon.nombre}</h3>
        <p class="card-text my-1"><strong>Tipo:</strong> ${salon.tipo}</p>
        <p class="card-text my-1"><strong>Capacidad:</strong> ${salon.capacidad} personas</p>
        <p class="card-text my-1"><strong>Dirección:</strong> ${salon.direccion}</p>
        <p class="card-text my-1"><strong>Precio:</strong> $${salon.precio.toLocaleString()}</p>

        ${estaReservado
                ? `<div class="bg-danger text-white text-center fw-bold py-1 rounded my-2">
              No disponible para la fecha seleccionada
            </div>`
                : ''
            }

        <div class="botones mt-2 text-center d-flex justify-content-around">
          <a href="detallesSalon.html?id=${salon.id}" class="btn ${estaReservado ? 'd-none' : 'btn-info'} text-white flex-grow-1 w-25 me-2">Ver detalle</a>
          <button class="btn ${estaReservado ? 'd-none' : 'btn-primary'} flex-grow-1 w-25" ${estaReservado ? 'disabled' : ''}>
            ${estaReservado ? 'Reservado' : 'Reservar'}
          </button>
        </div>
      </div>
    `;

        const btnReservar = card.querySelector('.btn.btn-primary');
        if (btnReservar && !estaReservado) {
            btnReservar.addEventListener('click', function (e) {
                e.preventDefault();
                const token = sessionStorage.getItem("accessToken");

                if (!token) {
                    mostrarModalLogin();
                } else {
                    window.location.href = "reserva.html";
                }
            });
        }

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

        contenedor.appendChild(col);
        col.appendChild(card);
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
    const inputFecha = document.getElementById("fecha-filtro");
    const btnFiltrarFecha = document.getElementById("btn-filtrar-fecha");


    // Mostrar todos los salones al cargar
    mostrarSalones("todos", true);

    if (selectTipo) {
        selectTipo.addEventListener("change", () => {
            mostrarSalones(selectTipo.value);
        });
    }

    if (btnFiltrarFecha && inputFecha) {
        btnFiltrarFecha.addEventListener("click", () => {
            const fecha = inputFecha.value;
            if (!fecha) {
                alert("Por favor seleccioná una fecha.");
                return;
            }
            mostrarSalones("todos", true); // Muestra todos los salones según la fecha seleccionada
        });
    }


    if (inputFecha) {
        inputFecha.addEventListener("change", () => {
            mostrarSalones("todos"); // Mostrar todos los salones al cambiar la fecha
        });
    }




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
