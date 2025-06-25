document.addEventListener("DOMContentLoaded", () => {
    // Funciones auxiliares para la gestión de presupuestos en LocalStorage
    function getPresupuestos() {
        const presupuestosJSON = localStorage.getItem('presupuestos');
        return presupuestosJSON ? JSON.parse(presupuestosJSON) : [];
    }

    function savePresupuestos(presupuestos) {
        localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
    }

    // Carga de salones y servicios para mapear IDs a nombres
    const salonesDisponibles = JSON.parse(localStorage.getItem("salones")) || [];
    const serviciosDisponibles = JSON.parse(localStorage.getItem("servicios")) || [];

    // Obtiene el nombre del salón por su ID
    function getSalonNombreById(id) {
        const salon = salonesDisponibles.find(s => s.id === id);
        return salon ? salon.nombre : 'Salón Desconocido';
    }

    // Obtiene los nombres de los servicios por sus IDs
    function getServiciosNombresByIds(serviciosIdsArray) {
        if (!Array.isArray(serviciosIdsArray) || serviciosIdsArray.length === 0) {
            return 'Ninguno';
        }
        
        return serviciosIdsArray.map(id => {
            const servicioEncontrado = serviciosDisponibles.find(sd => sd.id === id);
            return servicioEncontrado ? servicioEncontrado.descripcion : 'Servicio Desconocido';
        }).join(', ');
    }

    // Función principal para mostrar el listado de presupuestos
    function displayPresupuestos() {
        const presupuestos = getPresupuestos();
        const tbody = document.querySelector('#tabla-presupuestos tbody');
        const mensajeSinPresupuestos = document.getElementById('mensaje-sin-presupuestos');
        const tablaPresupuestos = document.getElementById('tabla-presupuestos');

        tbody.innerHTML = ''; // Limpiar tabla antes de renderizar

        if (presupuestos.length === 0) {
            mensajeSinPresupuestos.style.display = 'block';
            tablaPresupuestos.style.display = 'none'; // Ocultar tabla si no hay presupuestos
        } else {
            mensajeSinPresupuestos.style.display = 'none';
            tablaPresupuestos.style.display = 'table'; // Mostrar tabla si hay presupuestos

            presupuestos.forEach(presupuesto => {
                const row = tbody.insertRow();
                row.insertCell().textContent = presupuesto.id;
                row.insertCell().textContent = presupuesto.nombre;
                row.insertCell().textContent = presupuesto.tematica || 'N/A';
                row.insertCell().textContent = presupuesto.fecha;
                
                row.insertCell().textContent = getSalonNombreById(presupuesto.salonId); 
                row.insertCell().textContent = getServiciosNombresByIds(presupuesto.serviciosIds); 
                
                row.insertCell().textContent = `$${presupuesto.total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; 

                const accionesCell = row.insertCell();
                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
                editarBtn.onclick = () => loadPresupuestoForEdit(presupuesto.id);
                accionesCell.appendChild(editarBtn);

                const eliminarBtn = document.createElement('button');
                eliminarBtn.textContent = 'Eliminar';
                eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                eliminarBtn.onclick = () => deletePresupuesto(presupuesto.id);
                accionesCell.appendChild(eliminarBtn);
            });
        }
    }

    // Elementos del formulario y secciones
    const formEdicion = document.getElementById('form-edicion');
    const listaPresupuestosSection = document.getElementById('lista-presupuestos');
    const editarPresupuestoFormSection = document.getElementById('editar-presupuesto-form');

    // Carga los datos de un presupuesto en el formulario de edición
    function loadPresupuestoForEdit(id) {
        const presupuestos = getPresupuestos();
        const presupuestoToEdit = presupuestos.find(p => p.id == id); 

        if (presupuestoToEdit) {
            document.getElementById('edit-presupuesto-id').value = presupuestoToEdit.id;
            document.getElementById('edit-nombre').value = presupuestoToEdit.nombre;
            document.getElementById('edit-tematica').value = presupuestoToEdit.tematica || '';
            document.getElementById('edit-fecha').value = presupuestoToEdit.fecha;
            
            document.getElementById('edit-salon-nombre').value = getSalonNombreById(presupuestoToEdit.salonId); 
            document.getElementById('edit-servicios').value = presupuestoToEdit.serviciosIds ? presupuestoToEdit.serviciosIds.join(', ') : '';
            document.getElementById('edit-total').value = presupuestoToEdit.total;

            listaPresupuestosSection.style.display = 'none';
            editarPresupuestoFormSection.style.display = 'block';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Presupuesto no encontrado para editar.',
                confirmButtonColor: '#3085d6'
            });
        }
    }

    // Maneja el envío del formulario de edición
    if (formEdicion) {
        formEdicion.addEventListener('submit', function(event) {
            event.preventDefault();

            const id = document.getElementById('edit-presupuesto-id').value;
            const nombre = document.getElementById('edit-nombre').value.trim();
            const tematica = document.getElementById('edit-tematica').value.trim();
            const fecha = document.getElementById('edit-fecha').value;
            const total = parseFloat(document.getElementById('edit-total').value); 
            
            const serviciosIdsString = document.getElementById('edit-servicios').value.trim();
            const serviciosIds = serviciosIdsString.split(',').map(s => parseInt(s.trim())).filter(id => !isNaN(id));

            // Validación de campos del formulario de edición
            if (!nombre || !fecha || !tematica || isNaN(total)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de validación',
                    text: 'Por favor, complete todos los campos obligatorios y asegúrate que el total sea un número válido.',
                    confirmButtonColor: '#3085d6'
                });
                return;
            }

            let presupuestos = getPresupuestos();
            const index = presupuestos.findIndex(p => p.id == id);

            if (index !== -1) {
                presupuestos[index].nombre = nombre;
                presupuestos[index].tematica = tematica;
                presupuestos[index].fecha = fecha;
                presupuestos[index].serviciosIds = serviciosIds; 
                presupuestos[index].total = total; 

                savePresupuestos(presupuestos);
                Swal.fire({
                    icon: 'success',
                    title: '¡Actualizado!',
                    text: 'Presupuesto actualizado con éxito.',
                    confirmButtonColor: '#28a745'
                }).then(() => {
                    editarPresupuestoFormSection.style.display = 'none';
                    listaPresupuestosSection.style.display = 'block';
                    displayPresupuestos();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Presupuesto no encontrado para actualizar.',
                    confirmButtonColor: '#3085d6'
                });
            }
        });
    }

    // Maneja la cancelación de la edición
    const cancelarEdicionBtn = document.getElementById('cancelar-edicion');
    if (cancelarEdicionBtn) {
        cancelarEdicionBtn.addEventListener('click', function() {
            editarPresupuestoFormSection.style.display = 'none';
            listaPresupuestosSection.style.display = 'block';
        });
    }

    // Lógica de Eliminación de presupuestos
    function deletePresupuesto(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let presupuestos = getPresupuestos();
                const presupuestosFiltrados = presupuestos.filter(p => p.id != id); 
                savePresupuestos(presupuestosFiltrados);
                
                Swal.fire(
                    '¡Eliminado!',
                    'El presupuesto ha sido eliminado.',
                    'success'
                );
                displayPresupuestos(); // Volver a mostrar la lista actualizada
            }
        });
    }

    // Inicialización: Carga y muestra los presupuestos al cargar la página
    displayPresupuestos();

    // Redirige al formulario de reserva si no hay presupuestos
    const crearPrimerPresupuestoBtn = document.getElementById('crear-primer-presupuesto');
    if (crearPrimerPresupuestoBtn) {
        crearPrimerPresupuestoBtn.addEventListener('click', () => {
            window.location.href = 'reserva.html'; 
        });
    }
});