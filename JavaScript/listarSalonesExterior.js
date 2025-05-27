document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("contenedorTablaExterior");
  const salones = JSON.parse(localStorage.getItem("salones")) || [];

  const salonesExterior = salones.filter(salon => salon.tipo === "exterior");

  if (salonesExterior.length === 0) {
    contenedor.innerHTML = "<p>No hay salones exteriores disponibles.</p>";
    return;
  }

  const tabla = document.createElement("table");
  tabla.classList.add("table", "table-bordered", "table-striped");

  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Capacidad</th>
        <th>Dirección</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      ${salonesExterior.map(salon => `
        <tr>
          <td>${salon.nombre}</td>
          <td>${salon.capacidad}</td>
          <td>${salon.direccion}</td>
          <td>$${salon.precio}</td>
        </tr>
      `).join("")}
    </tbody>
  `;

  contenedor.appendChild(tabla);
});