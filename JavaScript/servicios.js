document.addEventListener("DOMContentLoaded", () => {
  renderizarServicios();

  document.getElementById("formServicio").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("idServicio").value;
    const descripcion = document.getElementById("descripcionServicio").value.trim();
    const valor = parseFloat(document.getElementById("valorServicio").value);

    if (descripcion === "" || valor <= 0 || isNaN(valor)) {
      alert("Por favor, completá correctamente la descripción y el valor (>0).");
      return;
    }

    let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

    if (id) {
      const index = servicios.findIndex(s => s.id === parseInt(id));
      if (index !== -1) {
        servicios[index] = { id: parseInt(id), descripcion, valor };
      }
    } else {
      const nuevoId = servicios.length ? Math.max(...servicios.map(s => s.id)) + 1 : 1;
      servicios.push({ id: nuevoId, descripcion, valor });
    }

    localStorage.setItem("servicios", JSON.stringify(servicios));
    document.getElementById("formServicio").reset();
    renderizarServicios();
  });
});

function renderizarServicios() {
  const tbody = document.getElementById("tbodyServicios");
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
  tbody.innerHTML = "";

  servicios.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.descripcion}</td>
      <td>${s.valor}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarServicio(${s.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${s.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editarServicio(id) {
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
  const servicio = servicios.find(s => s.id === id);
  if (servicio) {
    document.getElementById("idServicio").value = servicio.id;
    document.getElementById("descripcionServicio").value = servicio.descripcion;
    document.getElementById("valorServicio").value = servicio.valor;
  }
}

function eliminarServicio(id) {
  if (confirm("¿Estás seguro de eliminar este servicio?")) {
    let servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    servicios = servicios.filter(s => s.id !== id);
    localStorage.setItem("servicios", JSON.stringify(servicios));
    renderizarServicios();
  }
}
