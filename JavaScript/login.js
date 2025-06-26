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
    .then(res => res.json())
    .then(data => {
        sessionStorage.setItem('accessToken', data.token);
        sessionStorage.setItem('userRole', data.role); // 👈 Guardar el rol
        window.location.href = 'index.html'; // Redirigir a la página inicial
    })
    .catch(error => {
        alert('Usuario o contraseña incorrectos');
    });
});
