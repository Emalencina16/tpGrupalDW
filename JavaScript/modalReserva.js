fetch('modalReserva.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('reservaModal').innerHTML = html;
  })
  .catch(err => console.error('Error cargando modal:', err));

function mostrarModalLogin() {
  const modalElement = document.getElementById('loginModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  } else {
    console.error("No se encontró el modal #loginModal.");
  }
}
