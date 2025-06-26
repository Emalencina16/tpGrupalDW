document.addEventListener("DOMContentLoaded", () => {
    // Inicializa salones en localStorage si no existen
    if (!localStorage.getItem("salones")) {
        localStorage.setItem("salones", JSON.stringify(initialSalones));
    }

    // Inicializa servicios en localStorage si no existen
    if (!localStorage.getItem("servicios")) {
        localStorage.setItem("servicios", JSON.stringify(initialServicios));
    }

    const salones = JSON.parse(localStorage.getItem("salones")) || [];
    const servicios = JSON.parse(localStorage.getItem("servicios")) || [];

    const selectSalon = document.getElementById("salon");
    const selectTematica = document.getElementById("tematica");
    const divServicios = document.getElementById("servicios");
    const spanTotal = document.getElementById("total");
    const form = document.getElementById("formularioReserva");

    const imagenContenedor = document.createElement("div");
    imagenContenedor.id = "imagenSalonContenedor";
    imagenContenedor.className = "d-flex justify-content-center align-items-center p-0 m-0 my-3";
    if (selectSalon) {
        selectSalon.parentNode.insertBefore(imagenContenedor, selectSalon.nextSibling);
    }

    // Llena el select de salones basándose en un filtro de temática
    function llenarSelectSalones(filtro = "") {
        if (!selectSalon) return;

        selectSalon.innerHTML = "";

         // Agregar opción por defecto
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Seleccionar salón";
        selectSalon.add(defaultOption);

        const filtroLower = filtro.toLowerCase();

        const salonesFiltrados = filtro
            ? salones.filter(salon => salon.tipo.toLowerCase() === filtroLower)
            : salones;

        if (salonesFiltrados.length === 0) {
            const option = document.createElement("option");
            option.text = "No hay salones para esta temática";
            option.value = "";
            selectSalon.add(option);
            mostrarImagenSalon(null);
            actualizarTotal();
            return;
        }

        salonesFiltrados.forEach(salon => {
            const option = document.createElement("option");
            option.value = salon.id;
            option.text = `${salon.nombre} - $${salon.precio.toLocaleString()}`;
            selectSalon.add(option);
        });

        mostrarImagenSalon(null);
        actualizarTotal();
    }

    // Muestra los checkboxes de servicios
    function mostrarServicios() {
        if (!divServicios) return;

        divServicios.innerHTML = "";
        servicios.forEach(servicio => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `servicio-${servicio.id}`;
            checkbox.value = servicio.id;
            checkbox.name = "servicios";

            const label = document.createElement("label");
            label.htmlFor = checkbox.id;
            label.textContent = `${servicio.descripcion} ($${servicio.valor.toLocaleString()})`;

            const br = document.createElement("br");

            divServicios.appendChild(checkbox);
            divServicios.appendChild(label);
            divServicios.appendChild(br);

            checkbox.addEventListener("change", actualizarTotal);
        });
    }

    // Muestra la imagen del salón seleccionado
    function mostrarImagenSalon(salon) {
        if (!imagenContenedor) return;
        
        imagenContenedor.innerHTML = "";
        if (salon && salon.imagen) {
            const img = document.createElement("img");
            img.src = salon.imagen;
            img.alt = salon.nombre;
            img.style.maxWidth = "300px";
            img.className = "rounded p-0 m-0 shadow";
            imagenContenedor.appendChild(img);
        }
    }

    // Calcula y actualiza el total del presupuesto
    function actualizarTotal() {
        if (!selectSalon || !spanTotal) return;

        const idSalon = parseInt(selectSalon.value);
        const salonSeleccionado = salones.find(salon => salon.id === idSalon);
        
        if (!salonSeleccionado) {
            spanTotal.textContent = "0";
            return;
        }
        
        let total = salonSeleccionado.precio;
        const checkboxes = document.querySelectorAll('input[name="servicios"]:checked');
        checkboxes.forEach(cb => {
            const servicio = servicios.find(s => s.id === parseInt(cb.value));
            if (servicio) total += servicio.valor;
        });

        spanTotal.textContent = total.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    // Manejador del envío del formulario
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const fecha = document.getElementById("fecha").value.trim();
            const tematica = selectTematica.value;
            const idSalon = selectSalon.value;
            const serviciosSeleccionadosCbs = document.querySelectorAll('input[name="servicios"]:checked');

            // Validaciones de campos
            if (!nombre || !fecha || !tematica) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de validación',
                    text: 'Por favor, complete todos los campos obligatorios del formulario.',
                    confirmButtonColor: '#3085d6'
                });
                return;
            }
            if (!idSalon) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de selección',
                    text: 'Por favor, seleccione un salón válido.',
                    confirmButtonColor: '#3085d6'
                });
                return;
            }
            if (serviciosSeleccionadosCbs.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de selección',
                    text: 'Por favor, seleccione al menos un servicio.',
                    confirmButtonColor: '#3085d6'
                });
                return;
            }

            // Prepara y guarda el presupuesto
            const totalCalculado = parseFloat(spanTotal.textContent.replace(/\./g, '').replace(/,/g, '.')); 

            const nuevoPresupuesto = {
                id: Date.now(),
                nombre: nombre,
                fecha: fecha,
                tematica: tematica,
                salonId: parseInt(idSalon),
                serviciosIds: Array.from(serviciosSeleccionadosCbs).map(cb => parseInt(cb.value)), 
                total: totalCalculado
            };

            let presupuestosGuardados = JSON.parse(localStorage.getItem('presupuestos')) || [];
            presupuestosGuardados.push(nuevoPresupuesto);
            localStorage.setItem('presupuestos', JSON.stringify(presupuestosGuardados));

            Swal.fire({
                icon: 'success',
                title: '¡Reserva realizada con éxito!',
                html: `Total a pagar: <strong>$${spanTotal.textContent}</strong>`,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#28a745'
            }).then(() => {
                form.reset();
                llenarSelectSalones("");
                mostrarServicios();
                actualizarTotal();
                mostrarImagenSalon(null);
            });
        });
    }

    // Agrega listeners para cambios en selección de temática y salón
    if (selectTematica) {
        selectTematica.addEventListener("change", () => {
            llenarSelectSalones(selectTematica.value);
        });
    }

    if (selectSalon) {
        selectSalon.addEventListener("change", () => {
            const idSalon = parseInt(selectSalon.value);
            const salonSeleccionado = salones.find(salon => salon.id === idSalon);
            mostrarImagenSalon(salonSeleccionado);
            actualizarTotal();
        });
    }

    // Inicializa los elementos del formulario al cargar la página
    llenarSelectSalones();
    mostrarServicios();
    actualizarTotal(); 
});