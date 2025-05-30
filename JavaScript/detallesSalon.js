
document.addEventListener("DOMContentLoaded", function() {

    const params = new URLSearchParams(window.location.search);
    const salonId = params.get('id');

    if (salonId) {
        const salonesGuardados = localStorage.getItem("salones");
        const salones = salonesGuardados ? JSON.parse(salonesGuardados) : [];

        const salon = salones.find(s => s.id == salonId);

        let cards = document.querySelectorAll(".card-salon");
        let tipoSalon = null;

        cards.forEach(card => {
            tipoSalon = card.dataset.tipo; //Busca el tipo de salon por card
            console.log("Tipo de salón:", tipoSalon);
        });
        console.log("Tipo de salón:", tipoSalon);

        if (salon) {
            document.getElementById('detalleNombreSalon').value = salon.nombre || '';
            document.getElementById('detalleTipoSalon').value = salon.tipo || 'No especificada';
            document.getElementById('detalleCapacidadSalon').value = salon.capacidad || '';
            document.getElementById('detalleDireccionSalon').value = salon.direccion || '';
            document.getElementById('detallePrecioSalon').value = salon.precio || '';
            document.getElementById('detalleDescripcionSalon').value = salon.descripcion || 'No hay descripción disponible.';
            
            
            const imagenElement = document.getElementById('detalleImagenSalon');
            if (salon.imagen) {
                imagenElement.src = salon.imagen;
                imagenElement.alt = `Imagen del salón ${salon.nombre}`;
            } else {
                imagenElement.src = '../img/default.jpg'; 
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