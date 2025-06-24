const salones = JSON.parse(localStorage.getItem("salones"));
const servicios = JSON.parse(localStorage.getItem("servicios"));

const selectSalon = document.getElementById("salon");
const divServicios = document.getElementById("servicios");
const totalSpan = document.getElementById("total");

// Cargar salones
salones.forEach(salon => {
    const option = document.createElement("option");
    option.value = salon.id;
    option.textContent = `${salon.nombre} ($${salon.precio})`;
    selectSalon.appendChild(option);
});

// Cargar servicios
servicios.forEach(servicio => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${servicio.id}" data-precio="${servicio.valor}"> ${servicio.descripcion} ($${servicio.valor})`;
    divServicios.appendChild(label);
    divServicios.appendChild(document.createElement("br"));
});

// Calcular total
function calcularTotal() {
    const salonSeleccionado = salones.find(s => s.id == selectSalon.value);
    let total = salonSeleccionado ? salonSeleccionado.precio : 0;

    document.querySelectorAll("#servicios input:checked").forEach(chk => {
        total += parseInt(chk.dataset.precio);
    });

    totalSpan.textContent = total;
}

// Escuchar cambios
selectSalon.addEventListener("change", calcularTotal);
divServicios.addEventListener("change", calcularTotal);

// Validación y envío
document.getElementById("formularioReserva").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const fecha = document.getElementById("fecha").value;
    const tematica = document.getElementById("tematica").value.trim();
    const serviciosSeleccionados = document.querySelectorAll("#servicios input:checked");

    if (!nombre || !fecha || !tematica || !selectSalon.value || serviciosSeleccionados.length === 0) {
        alert("Por favor, complete todos los campos y seleccione al menos un servicio.");
        return;
    }

    calcularTotal();
    alert("Presupuesto calculado correctamente.");
});