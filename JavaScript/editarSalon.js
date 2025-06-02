document.addEventListener("DOMContentLoaded", function () {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    alert("ID no encontrado");
    window.location.href = "tablaSalones.html";
    return;
  }

  const salones = JSON.parse(localStorage.getItem("salones")) || [];
  const salonIndex = salones.findIndex(s => s.id === parseInt(id));

  if (salonIndex === -1) {
    alert("Salón no encontrado");
    window.location.href = "tablaSalones.html";
    return;
  }

  const salon = salones[salonIndex];

  // Rellenar el formulario con los datos
  document.getElementById("idSalon").value = salon.id;
  document.getElementById("nombreSalon").value = salon.nombre;
  document.getElementById("tipoSalon").value = salon.tipo;
  document.getElementById("capacidadSalon").value = salon.capacidad;
  document.getElementById("direccionSalon").value = salon.direccion;
  document.getElementById("precioSalon").value = salon.precio;
  document.getElementById("descripcionSalon").value = salon.descripcion;

  // Guardar cambios
  document.getElementById("formEditarSalon").addEventListener("submit", function (e) {
    e.preventDefault();

    salones[salonIndex] = {
      ...salon,
      nombre: document.getElementById("nombreSalon").value.trim(),
      tipo: document.getElementById("tipoSalon").value.trim(),
      capacidad: parseInt(document.getElementById("capacidadSalon").value),
      direccion: document.getElementById("direccionSalon").value.trim(),
      precio: parseFloat(document.getElementById("precioSalon").value),
      descripcion: document.getElementById("descripcionSalon").value.trim()
    };

    localStorage.setItem("salones", JSON.stringify(salones));
    alert("Salón actualizado correctamente");
    window.location.href = "nuevoSalon.html";
  });
});
