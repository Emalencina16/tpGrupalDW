async function cargarUsuarios() {
  const token = sessionStorage.getItem('accessToken');
  console.log("Token actual:", token); // Asegura que crearon el token

  if (!token) {
    alert("Debes iniciar sesión para ver los usuarios.");
    window.location.href = "login_test.html";
    return;
  }

  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    console.log("Usuarios obtenidos:", data.users); // Muestra usuario en consola
    mostrarUsuariosEnTabla(data.users);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

function mostrarUsuariosEnTabla(usuarios) {
  const tbody = document.getElementById("users-tbody");
  if (!tbody) {
    console.error("No se encontró el tbody con id 'usuarios-tbody'");
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
