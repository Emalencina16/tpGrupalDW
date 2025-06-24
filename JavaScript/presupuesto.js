document.addEventListener("DOMContentLoaded", () => {

    const salonSelect = document.getElementById("salon");
    const serviciosContainer = document.getElementById("serviciosContainer");
    const totalFinal = document.getElementById("totalFinal");
    const form = document.getElementById("formPresupuesto");
    const erroresDiv = document.getElementById("errores");

    let salones = JSON.parse(localStorage.getItem("salones")) || [];
    let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

    // Cargar salones en el select
    salones.forEach(salon => {
        const option = document.createElement("option");
        option.value = salon.id;
        option.textContent = `${salon.nombre} ($${salon.precio})`;
        salonSelect.appendChild(option);
    });

    // Cargar servicios como checkboxes
    servicios.forEach(servicio => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="checkbox" class="servicioCheckbox" data-precio="${servicio.valor}">
            ${servicio.descripcion} ($${servicio.valor})
        `;
        serviciosContainer.appendChild(label);
    });

    // Calcular total
    function calcularTotal() {
        let total = 0;

        const salonId = parseInt(salonSelect.value);
        const salonSeleccionado = salones.find(s => s.id === salonId);
        if (salonSeleccionado) {
            total += salonSeleccionado.precio;
        }

        document.querySelectorAll(".servicioCheckbox:checked").forEach(checkbox => {
            total += parseInt(checkbox.dataset.precio);
        });

        totalFinal.textContent = `Total: $${total}`;
    }

    salonSelect.addEventListener("change", calcularTotal);
    serviciosContainer.addEventListener("change", calcularTotal);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validaciones
        erroresDiv.textContent = "";

        const nombre = document.getElementById("nombre").value.trim();
        const fecha = document.getElementById("fecha").value;
        const tematica = document.getElementById("tematica").value.trim();
        const salonSeleccionado = salonSelect.value;
        const serviciosSeleccionados = document.querySelectorAll(".servicioCheckbox:checked");

        if (!nombre || !fecha || !tematica || !salonSeleccionado) {
            erroresDiv.textContent = "Por favor, complete todos los campos.";
            return;
        }

        if (serviciosSeleccionados.length === 0) {
            erroresDiv.textContent = "Debe seleccionar al menos un servicio adicional.";
            return;
        }

        alert("Presupuesto enviado correctamente!");
        // Aquí podrías guardar el presupuesto, enviarlo, etc.
    });

});