function mostrarTablaSalonesExterior() {
  const salones = JSON.parse(localStorage.getItem("salones")) || [];

  const salonesExterior = salones.filter(salon => salon.tipo === "Exterior");

  // Crear tabla y encabezado
  const tabla = document.createElement("table");
  tabla.className = "table table-bordered table-striped w-100";

  const thead = document.createElement("thead");
  thead.className = "table-dark text-white";

  thead.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Capacidad</th>
      <th>Dirección</th>
      <th>Precio</th>
    </tr>
  `;

  const tbody = document.createElement("tbody");

  salonesExterior.forEach(salon => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${salon.nombre}</td>
      <td>${salon.capacidad}</td>
      <td>${salon.direccion}</td>
      <td>$${salon.precio.toLocaleString()}</td>
    `;
    tbody.appendChild(fila);
  });

  tabla.appendChild(thead);
  tabla.appendChild(tbody);

  document.getElementById("tablaSalonesExterior").innerHTML = ""; // Limpiar
  document.getElementById("tablaSalonesExterior").appendChild(tabla);
}

// Llamar a la función cuando cargue la página
document.addEventListener("DOMContentLoaded", mostrarTablaSalonesExterior);