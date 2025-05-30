document.addEventListener("DOMContentLoaded", mostrarTablaSalonesExterior);

function mostrarTablaSalonesExterior() {
  // Recuperar datos desde localStorage
  const salones = JSON.parse(localStorage.getItem("salones")) || [];

  // Filtrar salones tipo "Exterior"
  const salonesExterior = salones

  // Crear tabla
  const tabla = document.createElement("table");
  tabla.classList.add("table", "table-bordered", "table-hover");
  tabla.style.width = "100%";

  // Crear encabezado
  const thead = document.createElement("thead");
  thead.classList.add("thead-dark");
  thead.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Capacidad</th>
      <th>Dirección</th>
      <th>Precio</th>
      <th>Tematica</th>
    </tr>
  `;
  tabla.appendChild(thead);

  // Crear cuerpo
  const tbody = document.createElement("tbody");

  // Agregar filas con datos
  salonesExterior.forEach(salon => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${salon.nombre}</td>
      <td>${salon.capacidad}</td>
      <td>${salon.direccion}</td>
      <td>$${salon.precio.toLocaleString()}</td>
      <td>${salon.tipo}</td>
    `;
    tbody.appendChild(fila);
  });

  tabla.appendChild(thead);
  tabla.appendChild(tbody);

  // Insertar tabla en el div destino
  const contenedor = document.getElementById("tablaSalonesExterior");
  if (contenedor) {
    contenedor.innerHTML = ""; // Limpiar contenido previo
    contenedor.appendChild(tabla);
  }
}