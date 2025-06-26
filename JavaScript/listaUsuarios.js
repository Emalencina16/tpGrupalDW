async function cargarUsuarios() {
  const token = sessionStorage.getItem('accessToken');
  const role = sessionStorage.getItem('userRole');

  // Validar login
  if (!token) {
    alert("Debes iniciar sesión para ver los usuarios.");
    window.location.href = "login.html";
    return;
  }


  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    console.log("Usuarios obtenidos:", data.users);
    mostrarUsuariosEnTabla(data.users);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

function mostrarUsuariosEnTabla(usuarios) {
  const tbody = document.getElementById("users-tbody");
  if (!tbody) {
    console.error("No se encontró el tbody con id 'users-tbody'");
    return;
  }

  tbody.innerHTML = "";

  usuarios.forEach(user => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${user.firstName} ${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.username}</td>
    `;
    tbody.appendChild(fila);
  });
}

window.onload = cargarUsuarios;
