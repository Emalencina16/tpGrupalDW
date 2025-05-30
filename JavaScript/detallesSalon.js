import { inicializarLocalStorage } from './storage.js';

document.addEventListener("DOMContentLoaded", function() {
    inicializarLocalStorage();

    const params = new URLSearchParams(window.location.search);
    const salonId = params.get('id');

    if (salonId) {
        const salonesGuardados = localStorage.getItem("salones");
        const salones = salonesGuardados ? JSON.parse(salonesGuardados) : [];

        const salon = salones.find(s => s.id == salonId);

        if (salon) {
            document.getElementById('detalleNombreSalon').value = salon.nombre || '';
            document.getElementById('detalleCapacidadSalon').value = salon.capacidad || '';
            document.getElementById('detalleDireccionSalon').value = salon.direccion || '';
            document.getElementById('detallePrecioSalon').value = salon.precio || '';
            document.getElementById('detalleDescripcionSalon').value = salon.descripcion || 'No hay descripción disponible.';
            document.getElementById('detalleTematicaSalon').value = salon.tematica || 'No especificada';
            
            const imagenElement = document.getElementById('detalleImagenSalon');
            if (salon.imagen) {
                imagenElement.src = salon.imagen;
                imagenElement.alt = `Imagen del salón ${salon.nombre}`;
            } else {
                imagenElement.src = '../img/default_salon.jpg'; 
                imagenElement.alt = 'Imagen por defecto del salón';
            }

        } else {
            alert('Salón no encontrado. Serás redirigido al catálogo.');
            window.location.href = 'galeria.html';
        }
    } else {
        alert('ID de salón no proporcionado. Serás redirigido al catálogo.');
        window.location.href = 'galeria.html';
    }
});