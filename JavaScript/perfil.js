// Función para verificar sesión
        function verificarSesion() {
            const token = sessionStorage.getItem('accessToken');
            if (!token) {
                window.location.href = 'login.html';
                return false;
            }
            return true;
        }

        // Función para cerrar sesión
        function cerrarSesion() {
            sessionStorage.clear();
            window.location.href = 'login.html';
        }

        // Función para cargar datos del perfil
        function cargarPerfil() {
            if (!verificarSesion()) return;

            const username = sessionStorage.getItem('username');
            const userImage = sessionStorage.getItem('userImage');
            const fullName = sessionStorage.getItem('fullName');
            const userEmail = sessionStorage.getItem('userEmail');
            const userId = sessionStorage.getItem('userId');
            const userRole = sessionStorage.getItem('userRole');
            const telefono = sessionStorage.getItem('telefono');
            const edad = sessionStorage.getItem('edad');
            const fechaCumple = sessionStorage.getItem('fechaCumple');

            // Verificar que tenemos los datos necesarios
            if (!username || !userEmail) {
                new bootstrap.Modal(document.getElementById('errorModal')).show();
                return;
            }

            // Cargar imagen de perfil
            const profileImg = document.getElementById('profileImg');
            if (userImage) {
                profileImg.src = userImage;
                profileImg.onerror = function() {
                    this.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face';
                };
            } else {
                profileImg.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face';
            }

            // Cargar datos del usuario
            document.getElementById('profileUsername').textContent = username;
            document.getElementById('profileFullName').textContent = fullName || 'Sin nombre completo';
            document.getElementById('profileEmail').textContent = userEmail;
            document.getElementById('profileUsernameInfo').textContent = username;
            document.getElementById('profileUserId').textContent = userId || 'No disponible';
            document.getElementById('profilePhone').textContent = telefono || 'No disponible';
            document.getElementById('profileAge').textContent = edad + " años"|| 'No disponible';

            // Formatear fecha de nacimiento
            if (fechaCumple) {
                const fecha = new Date(fechaCumple);
                const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                document.getElementById('profileBirthdate').textContent = fechaFormateada;
            } else {
                document.getElementById('profileBirthdate').textContent = 'No disponible';
            }
            
            // Cargar rol con badge apropiado
            const roleElement = document.getElementById('profileRole').querySelector('.badge');
            const roleText = userRole || 'user';
            roleElement.textContent = getRoleDisplayName(roleText);
            roleElement.className = `badge ${getRoleBadgeClass(roleText)}`;
        }

        // Función para obtener el nombre del rol para mostrar
        function getRoleDisplayName(role) {
            switch(role) {
                case 'admin': return 'Administrador';
                case 'moderator': return 'Moderador';
                case 'user': return 'Usuario';
                default: return 'Usuario';
            }
        }

        // Función para obtener la clase CSS del badge según el rol
        function getRoleBadgeClass(role) {
            switch(role) {
                case 'admin': return 'bg-danger';
                case 'moderator': return 'bg-warning';
                case 'user': return 'bg-success';
                default: return 'bg-secondary';
            }
        }

        // Inicializar la página
        document.addEventListener('DOMContentLoaded', function() {
            cargarPerfil();
        });