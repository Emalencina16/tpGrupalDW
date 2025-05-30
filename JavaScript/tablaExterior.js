document.addEventListener("DOMContentLoaded", mostrarTablaSalones);

function mostrarTablaSalones() {
  // Recuperar datos desde localStorage
  const salones = JSON.parse(localStorage.getItem("salones")) || [];

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
      <th>Tipo</th>
      <th>Capacidad</th>
      <th>Dirección</th>
      <th>Precio</th>
      <th>Descripción</th>
      <th>Acciónes</th>
    </tr>
  `;
  tabla.appendChild(thead);

  // Crear cuerpo
  const tbody = document.createElement("tbody");

  // Agregar filas con datos
  salones.forEach(salon => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${salon.nombre}</td>
      <td>${salon.tipo}</td>
      <td>${salon.capacidad}</td>
      <td>${salon.direccion}</td>
      <td>$${salon.precio.toLocaleString()}</td>
      <td>${salon.descripcion}</td>
      
    `;
    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);

  // Insertar tabla en el div destino
  const contenedor = document.getElementById("tablaSalones");
  if (contenedor) {
    contenedor.innerHTML = ""; // Limpiar contenido previo
    contenedor.appendChild(tabla);
  } else {
    console.warn('No se encontró el contenedor con id "tablaSalones"');
  }
}


