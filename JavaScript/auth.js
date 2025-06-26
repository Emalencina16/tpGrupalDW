document.addEventListener('DOMContentLoaded', function () {
    actualizarNavbarUsuario();
    const role = sessionStorage.getItem('userRole');
    const estaLogueado = !!role; 
    const btnReservaInicio = document.querySelector('.btn-reservaInicio');
    const btnReservarForm = document.querySelector('.reserva form');

    if (btnReservaInicio) {
        btnReservaInicio.addEventListener('click', (e) => {
        if (!estaLogueado) {
            e.preventDefault();
            mostrarModalLogin();
        } else {
            window.location.href = 'reserva.html';
        }
        });
    }

    if (btnReservarForm) {
        btnReservarForm.addEventListener('submit', (e) => {
        if (!estaLogueado) {
            e.preventDefault();
            mostrarModalLogin();
        }
        });
    }

    // Ocultar todos por defecto
    const infoInstitucional = document.getElementById('infoInstitucionalLink');
    const contacto = document.getElementById('contactoLink');
    const galeria = document.getElementById('galeriaLink');
    const nuevoSalon = document.getElementById('nuevoSalonLink');
    const login = document.getElementById('loginLink');
    const reserva = document.getElementById('reservaLink');
    const presupuesto = document.getElementById('presupuestoLink');
    const usuarios = document.getElementById('usuariosLink');
    const servicios = document.getElementById('serviciosLink');
    const btnEliminarSalones = document.getElementById('btn-eliminar-modo');
    const btnCerrarSesion = document.getElementById('cerrarSesionLink');

    if (infoInstitucional) infoInstitucional.style.display = 'block';
    if (contacto) contacto.style.display = 'block';
    if (galeria) galeria.style.display = 'block';
    if (login) login.style.display = 'block';

    if (nuevoSalon) nuevoSalon.style.display = 'none';
    if (reserva) reserva.style.display = 'none';
    if (presupuesto) presupuesto.style.display = 'none';
    if (usuarios) usuarios.style.display = 'none';
    if (btnEliminarSalones) btnEliminarSalones.style.display = 'none';
    if (btnCerrarSesion) btnCerrarSesion.style.display = 'none';
    if (servicios) servicios.style.display = 'none';

    // Mostrar según rol
    if (role === 'admin') {
        if (nuevoSalon) nuevoSalon.style.display = 'block';
        if (presupuesto) presupuesto.style.display = 'block';
        if (reserva) reserva.style.display = 'none';
        if (servicios) servicios.style.display = 'block';
        if (usuarios) usuarios.style.display = 'block';
        if (btnEliminarSalones) btnEliminarSalones.style.display = 'block';
        if (btnCerrarSesion) btnCerrarSesion.style.display = 'block';
        if (login) login.style.display = 'none';
        if (contacto) contacto.style.display = 'none';
    } else if (role === 'moderator') {
        if (btnEliminarSalones) btnEliminarSalones.style.display = 'block';
        if (nuevoSalon) nuevoSalon.style.display = 'block';
        if (servicios) servicios.style.display = 'block';
        if (btnCerrarSesion) btnCerrarSesion.style.display = 'block';
        if (reserva) reserva.style.display = 'none';
        if (login) login.style.display = 'none';
    } else if (role === 'user') {
        if (reserva) reserva.style.display = 'block';
        if (btnCerrarSesion) btnCerrarSesion.style.display = 'block';
        if (login) login.style.display = 'none';
    }
});

function cerrarSesion() {
  sessionStorage.clear(); // o eliminar sólo claves específicas si querés
  window.location.href = 'login.html'; // Redirigimos al login
}

function verificarSesion() {
  const token = sessionStorage.getItem('accessToken');
  if (!token) {
    alert("Debes iniciar sesión para acceder.");
    window.location.href = "login.html";
  }
}

// Función para actualizar el navbar con los datos del usuario
function actualizarNavbarUsuario() {
    const username = sessionStorage.getItem('username');
    const userImage = sessionStorage.getItem('userImage');
    const fullName = sessionStorage.getItem('fullName');
    
    const userProfileNav = document.getElementById('userProfileNav');
    const loginLink = document.getElementById('loginLink');
    const cerrarSesionLink = document.getElementById('cerrarSesionLink');
    
    if (username) {
        // Usuario logueado - mostrar perfil
        if (userProfileNav) userProfileNav.style.display = 'block';
        if (loginLink) loginLink.style.display = 'none';
        
        // Actualizar datos del perfil
        const navUsername = document.getElementById('navUsername');
        const navProfileImg = document.getElementById('navProfileImg');
        
        if (navUsername) {
            navUsername.textContent = fullName || username;
        }
        
        if (navProfileImg) {
            if (userImage) {
                navProfileImg.src = userImage;
                navProfileImg.onerror = function() {
                    // Imagen por defecto si falla la carga
                    this.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face';
                };
            } else {
                // Imagen por defecto
                navProfileImg.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face';
            }
        }
    } else {
        // Usuario no logueado - ocultar perfil
        if (userProfileNav) userProfileNav.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
        if (cerrarSesionLink) cerrarSesionLink.style.display = 'none';
    }
}

