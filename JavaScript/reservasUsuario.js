let reservasOriginales = [];
        let reservasFiltradas = [];

        // Función para verificar sesión
        function verificarSesion() {
            const token = sessionStorage.getItem('accessToken');
            if (!token) {
                window.location.href = 'login.html';
                return false;
            }
            return true;
        }

        // Función para cargar reservas del usuario
        function cargarReservas() {
            if (!verificarSesion()) return;

            const username = sessionStorage.getItem('username');
            const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
            
            // Filtrar reservas del usuario actual
            reservasOriginales = presupuestos.filter(reserva => {
                // Verificar si la reserva pertenece al usuario actual
                // Puedes ajustar esta lógica según cómo relates las reservas con los usuarios
                return reserva.nombre === sessionStorage.getItem('fullName') || 
                       reserva.username === username;
            });

            reservasFiltradas = [...reservasOriginales];
            mostrarReservas();
        }

        

        // Función para mostrar reservas
        function mostrarReservas() {
            const container = document.getElementById('reservasList');
            const noReservations = document.getElementById('noReservations');


            noReservations.style.display = 'none';
            
            container.innerHTML = reservasFiltradas.map(reserva => {
                const salon = obtenerSalonPorId(reserva.salonId);
                const servicios = obtenerServiciosPorIds(reserva.serviciosIds || []);
                const fechaReserva = new Date(reserva.fecha);
                const esReservaPasada = fechaReserva < new Date();
                
                return `
                    <div class="col-md-6 mb-4">
                        <div class="card card-reserva h-100 rounded overflow-hidden shadow-sm">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0">
                                    <i class="fas fa-building me-2"></i>${salon ? salon.nombre : 'Salón no encontrado'}
                                </h6>
                                <span class="badge fs-6 p-2 status-badge ${esReservaPasada ? 'bg-secondary' : 'bg-success'}">
                                    ${esReservaPasada ? 'Realizada' : 'Programada'}
                                </span>
                            </div>
                            <div class="card-body">
                                <div class="row mb-3">
                                    <div class="col-6">
                                        <small class="text-muted">Fecha:</small>
                                        <p class="mb-0"><i class="fas fa-calendar me-1"></i>${fechaReserva.toLocaleDateString('es-ES')}</p>
                                    </div>
                                    <div class="col-6">
                                        <small class="text-muted">Temática:</small>
                                        <p class="mb-0"><i class="fas fa-tag me-1"></i>${capitalizeFirst(reserva.tematica)}</p>
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <small class="text-muted">Servicios:</small>
                                    <div class="mt-1">
                                        ${servicios.map(servicio => `<span class="servicios-reserva text-secondary p-2 rounded-pill d-inline-block bg-body-secondary">${servicio.descripcion}</span>`).join('')}
                                    </div>
                                </div>
                                
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="price-highlight fs-3 text-success">$${(reserva.total || 0).toLocaleString()}</span>
                                    <button class="btn btn-outline-primary btn-sm" onclick="mostrarDetalleReserva(${reserva.id})">
                                        <i class="fas fa-eye me-1"></i>Ver Detalles
                                    </button>
                                </div>
                            </div>
                            <div class="card-footer text-muted">
                                <small>Reserva #${reserva.id}</small>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Función para obtener salón por ID
        function obtenerSalonPorId(id) {
            const salones = JSON.parse(localStorage.getItem('salones')) || [];
            return salones.find(salon => salon.id === id);
        }

        // Función para obtener servicios por IDs
        function obtenerServiciosPorIds(ids) {
            const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
            return servicios.filter(servicio => ids.includes(servicio.id));
        }

        // Función para capitalizar primera letra
        function capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // Función para mostrar detalle de reserva
        function mostrarDetalleReserva(reservaId) {
            const reserva = reservasOriginales.find(r => r.id === reservaId);
            if (!reserva) return;

            const salon = obtenerSalonPorId(reserva.salonId);
            const servicios = obtenerServiciosPorIds(reserva.serviciosIds || []);
            const fechaReserva = new Date(reserva.fecha);

            const content = `
                <div class="row">
                    <div class="col-md-6">
                        <h6><i class="fas fa-user me-2 text-primary"></i>Información del Cliente</h6>
                        <p><strong>Nombre:</strong> ${reserva.nombre}</p>
                        <p><strong>Fecha de Reserva:</strong> ${fechaReserva.toLocaleDateString('es-ES')}</p>
                        <p><strong>Temática:</strong> ${capitalizeFirst(reserva.tematica)}</p>
                    </div>
                    <div class="col-md-6">
                        <h6><i class="fas fa-building me-2 text-primary"></i>Información del Salón</h6>
                        <p><strong>Salón:</strong> ${salon ? salon.nombre : 'No encontrado'}</p>
                        <p><strong>Precio Base:</strong> $${salon ? salon.precio.toLocaleString() : '0'}</p>
                        ${salon && salon.imagen ? `<img src="${salon.imagen}" alt="${salon.nombre}" class="img-fluid rounded" style="max-height: 150px;">` : ''}
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12">
                        <h6><i class="fas fa-concierge-bell me-2 text-primary"></i>Servicios Contratados</h6>
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Servicio</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${servicios.map(servicio => `
                                        <tr>
                                            <td>${servicio.descripcion}</td>
                                            <td>$${servicio.valor.toLocaleString()}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                                <tfoot>
                                    <tr class="table-success">
                                        <th>Total</th>
                                        <th>$${(reserva.total || 0).toLocaleString()}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('detalleReservaContent').innerHTML = content;
            new bootstrap.Modal(document.getElementById('detalleReservaModal')).show();
        }

        // Función para filtrar reservas
        function filtrarReservas() {
            const filtroSalon = document.getElementById('filtroSalon').value.toLowerCase();
            const filtroTematica = document.getElementById('filtroTematica').value;
            const ordenar = document.getElementById('ordenar').value;

            reservasFiltradas = reservasOriginales.filter(reserva => {
                const salon = obtenerSalonPorId(reserva.salonId);
                const coincideSalon = !filtroSalon || (salon && salon.nombre.toLowerCase().includes(filtroSalon));
                const coincideTematica = !filtroTematica || reserva.tematica === filtroTematica;
                
                return coincideSalon && coincideTematica;
            });

            // Ordenar
            reservasFiltradas.sort((a, b) => {
                switch(ordenar) {
                    case 'fecha_asc':
                        return new Date(a.fecha) - new Date(b.fecha);
                    case 'fecha_desc':
                        return new Date(b.fecha) - new Date(a.fecha);
                    case 'precio_asc':
                        return (a.total || 0) - (b.total || 0);
                    case 'precio_desc':
                        return (b.total || 0) - (a.total || 0);
                    default:
                        return new Date(b.fecha) - new Date(a.fecha);
                }
            });

            mostrarReservas();
        }

        // Event listeners para filtros
        document.addEventListener('DOMContentLoaded', function() {
            cargarReservas();
            
            document.getElementById('filtroSalon').addEventListener('input', filtrarReservas);
            document.getElementById('filtroTematica').addEventListener('change', filtrarReservas);
            document.getElementById('ordenar').addEventListener('change', filtrarReservas);
        });