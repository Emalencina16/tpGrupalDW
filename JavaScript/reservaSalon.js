// Cargar salones y servicios desde el storage
const salones = JSON.parse(localStorage.getItem("salones")) || [];
const servicios = JSON.parse(localStorage.getItem("servicios")) || [];

// Obtener ID del salón desde la URL
const urlParams = new URLSearchParams(window.location.search);
const salonId = parseInt(urlParams.get("salonId"));

const salon = salones.find(s => s.id === salonId);
const salonPrecio = salon ? salon.precio : 0;

// Mostrar el salón seleccionado
document.getElementById("salonSeleccionado").innerText = salon 
  ? salon.nombre + " ($" + salon.precio + ")" 
  : "Salón no encontrado";

// Mostrar los servicios
const serviciosContainer = document.getElementById("serviciosContainer");
servicios.forEach(servicio => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "servicio-" + servicio.id;
  checkbox.value = servicio.id;
  checkbox.dataset.precio = servicio.precio;

  checkbox.addEventListener("change", calcularTotal);

  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.innerText = `${servicio.nombre} ($${servicio.precio})`;

  const div = document.createElement("div");
  div.appendChild(checkbox);
  div.appendChild(label);
  serviciosContainer.appendChild(div);
});

// Calcular total
function calcularTotal() {
  let total = salonPrecio;
  servicios.forEach(servicio => {
    const checkbox = document.getElementById("servicio-" + servicio.id);
    if (checkbox.checked) {
      total += servicio.precio;
    }
  });
  document.getElementById("total").innerText = total;
}

// Validación al enviar
document.getElementById("formPresupuesto").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const fecha = document.getElementById("fecha").value;
  const tematica = document.getElementById("tematica").value.trim();

  const serviciosSeleccionados = servicios.filter(servicio => 
    document.getElementById("servicio-" + servicio.id).checked
  );

  const errorMsg = document.getElementById("errorMsg");
  errorMsg.innerText = "";

  if (!nombre || !fecha || !tematica) {
    errorMsg.innerText = "Por favor, completa todos los campos.";
    return;
  }

  if (serviciosSeleccionados.length === 0) {
    errorMsg.innerText = "Por favor, selecciona al menos un servicio.";
    return;
  }

  // Si todo está bien
  alert("Presupuesto generado correctamente.\nTotal: $" + document.getElementById("total").innerText);
});