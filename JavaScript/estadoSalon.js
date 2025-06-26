// Obtener ID del salón desde la URL (por ejemplo: detalle.html?id=3)
const params = new URLSearchParams(window.location.search);
const idSalon = parseInt(params.get("id"));

// Función para marcar como reservado
function reservarSalon() {
  let salones = JSON.parse(localStorage.getItem("salones"));
  let salon = salones.find(s => s.id === idSalon);

  if (!salon) {
    alert("Salón no encontrado.");
    return;
  }

  // Verificamos si ya está reservado
  if (salon.estado === "Reservado") {
    alert("Este salón ya está reservado.");
    return;
  }

  // Cambiamos el estado del salón
  salon.estado = "Reservado";
  localStorage.setItem("salones", JSON.stringify(salones));

  // Guardamos la reserva (opcional)
  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  let nuevaReserva = {
    id: Date.now(),
    idSalon: salon.id,
    nombreSalon: salon.nombre,
    fechaReserva: new Date().toLocaleDateString(),
    // Agregá más datos si querés (como nombre del cliente)
  };
  reservas.push(nuevaReserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert(`El salón "${salon.nombre}" ha sido reservado con éxito.`);
}