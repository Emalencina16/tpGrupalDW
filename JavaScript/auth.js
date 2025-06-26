document.addEventListener('DOMContentLoaded', function () {
  const role = sessionStorage.getItem('userRole');

  // Ocultar todos por defecto
  const infoInstitucional = document.getElementById('infoInstitucionalLink');
  const contacto = document.getElementById('contactoLink');
  const galeria = document.getElementById('galeriaLink');
  const nuevoSalon = document.getElementById('nuevoSalonLink');
  const login = document.getElementById('loginLink');
  const reserva = document.getElementById('reservaLink');
  const presupuesto = document.getElementById('presupuestoLink');
  const btnEliminarSalones = document.getElementById('btn-eliminar-modo');

  if (infoInstitucional) infoInstitucional.style.display = 'block';
  if (contacto) contacto.style.display = 'block';
  if (galeria) galeria.style.display = 'block';
  if (login) login.style.display = 'block';

  if (nuevoSalon) nuevoSalon.style.display = 'none';
  if (reserva) reserva.style.display = 'none';
  if (presupuesto) presupuesto.style.display = 'none';
  if (btnEliminarSalones) btnEliminarSalones.style.display = 'none';

  // Mostrar según rol
  if (role === 'admin') {
    if (nuevoSalon) nuevoSalon.style.display = 'block';
    if (presupuesto) presupuesto.style.display = 'block';
    if (reserva) reserva.style.display = 'block';
    if (btnEliminarSalones) btnEliminarSalones.style.display = 'block';
  } else if (role === 'moderator') {
    if (btnEliminarSalones) btnEliminarSalones.style.display = 'block';
    if (nuevoSalon) nuevoSalon.style.display = 'block';
  } else if (role === 'user') {
    if (reserva) reserva.style.display = 'block';
  }
});
