document.addEventListener("DOMContentLoaded", mostrarTablaSalones);

function mostrarTablaSalones() {
  const salones = JSON.parse(localStorage.getItem("salones")) || [];

  const tabla = document.createElement("table");
  tabla.classList.add("table", "table-bordered", "table-hover");
  tabla.style.width = "100%";

  const thead = document.createElement("thead");
  thead.classList.add("thead-dark");
  thead.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Tipo</th>
      <th>Estado</th>
      <th>Capacidad</th>
      <th>Dirección</th>
      <th>Precio</th>
      <th>Descripción</th>
      <th>Acciones</th>
    </tr>
  `;
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");

  salones.forEach(salon => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${salon.nombre}</td>
      <td>${salon.tipo}</td>
      <td>${salon.estado}</td>
      <td>${salon.capacidad}</td>
      <td>${salon.direccion}</td>
      <td>$${salon.precio.toLocaleString()}</td>
      <td>${salon.descripcion}</td>
      <td class="d-flex justify-content-center align-items-center mt-2">
        <a href="editarSalon.html?id=${salon.id}" class="btn btn-success btn-sm me-1">Editar</a>
        <button class="btn btn-danger btn-sm" onclick="eliminarSalon(${salon.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);

  const contenedor = document.getElementById("tablaSalones");
  if (contenedor) {
    contenedor.innerHTML = ""; // Limpiar contenido previo
    contenedor.appendChild(tabla);
  } else {
    console.warn('No se encontró el contenedor con id "tablaSalones"');
  }
}

function eliminarSalon(id) {
  if (confirm("¿Estás seguro de que querés eliminar este salón?")) {
    let salones = JSON.parse(localStorage.getItem("salones")) || [];
    salones = salones.filter(salon => salon.id !== id);
    localStorage.setItem("salones", JSON.stringify(salones));
    mostrarTablaSalones(); // Recargar la tabla
  }
}
