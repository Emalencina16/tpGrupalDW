document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Login inválido");
      }
      return res.json();
    })
    .then(data => {
      // Guardar token y datos básicos
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('userId', data.id);
      sessionStorage.setItem('userEmail', data.email);
      sessionStorage.setItem('fullName', `${data.firstName} ${data.lastName}`);
      sessionStorage.setItem('userImage', data.image);

      

      // Obtener  rol en base al id del usuario que inicio sesion
      return fetch(`https://dummyjson.com/users/${data.id}`);
    })
    .then(res => res.json())
    .then(userData => {
      sessionStorage.setItem('userRole', userData.role); // Guardar el rol
      sessionStorage.setItem('telefono', userData.phone);
      sessionStorage.setItem('fechaCumple', userData.birthDate);
      sessionStorage.setItem('edad', userData.age);


      // Actualizar navbar después del login exitoso
      if (typeof actualizarNavbarUsuario === 'function') {
        actualizarNavbarUsuario();
      }

      // Redirigir al home
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error("Error al iniciar sesión:", error);
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Usuario o contraseña incorrectos';
    });
});
