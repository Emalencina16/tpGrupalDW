document.addEventListener("DOMContentLoaded", () => {
  // Ejemplo de salones, en la práctica esto viene del localStorage o tu backend
  const salones = JSON.parse(localStorage.getItem("salones")) || [
    { id: 1, nombre: "Salón Encanto", tipo:"Interior", capacidad: 120, direccion: "Av. Sarmiento 1123", precio: 25000, descripcion: "Un salón versátil con un toque de elegancia y calidez.", imagen: "../img/salones%20interior/salonEncanto.png" },
    { id: 2, nombre: "Terraza Sol", tipo:"Terraza", capacidad: 80, direccion: "Calle Falsa 123", precio: 18000, descripcion: "Terraza al aire libre con vista panorámica.", imagen: "../img/salones%20terraza/terrazaSol.png" },
    { id: 3, nombre: "Jardín Verde", tipo:"Exterior", capacidad: 150, direccion: "Av. Siempre Viva 742", precio: 22000, descripcion: "Amplio jardín para eventos al aire libre.", imagen: "../img/salones%20exterior/jardinVerde.png" }
  ];

  // Ejemplo de servicios
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [
    { id: 1, descripcion: "Catering", valor: 5000 },
    { id: 2, descripcion: "Decoración", valor: 3000 },
    { id: 3, descripcion: "Música", valor: 4000 }
  ];

  const selectSalon = document.getElementById("salon");
  const selectTematica = document.getElementById("tematica");
  const divServicios = document.getElementById("servicios");
  const spanTotal = document.getElementById("total");
  const form = document.getElementById("formularioReserva");

  // Contenedor para imagen del salón
  const imagenContenedor = document.createElement("div");
  imagenContenedor.id = "imagenSalonContenedor";
  selectSalon.parentNode.insertBefore(imagenContenedor, selectSalon.nextSibling);

  function llenarSelectSalones(filtro = "") {
    selectSalon.innerHTML = "";
    const filtroLower = filtro.toLowerCase();

    const salonesFiltrados = filtro
      ? salones.filter(salon => salon.tipo.toLowerCase() === filtroLower)
      : salones;

    if (salonesFiltrados.length === 0) {
      const option = document.createElement("option");
      option.text = "No hay salones para esta temática";
      option.value = "";
      selectSalon.add(option);
      mostrarImagenSalon(null);
      actualizarTotal();
      return;
    }

    salonesFiltrados.forEach(salon => {
      const option = document.createElement("option");
      option.value = salon.id;
      option.text = `${salon.nombre} - $${salon.precio.toLocaleString()}`;
      selectSalon.add(option);
    });

    mostrarImagenSalon(salonesFiltrados[0]);
    actualizarTotal();
  }

  function mostrarServicios() {
    divServicios.innerHTML = "";
    servicios.forEach(servicio => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `servicio-${servicio.id}`;
      checkbox.value = servicio.id;
      checkbox.name = "servicios";

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = `${servicio.descripcion} ($${servicio.valor.toLocaleString()})`;

      const br = document.createElement("br");

      divServicios.appendChild(checkbox);
      divServicios.appendChild(label);
      divServicios.appendChild(br);

      checkbox.addEventListener("change", actualizarTotal);
    });
  }

  function mostrarImagenSalon(salon) {
    imagenContenedor.innerHTML = "";
    if (salon && salon.imagen) {
      const img = document.createElement("img");
      img.src = salon.imagen;
      img.alt = salon.nombre;
      img.style.maxWidth = "300px";
      img.style.marginTop = "10px";
      imagenContenedor.appendChild(img);
    }
  }

  function actualizarTotal() {
    const idSalon = parseInt(selectSalon.value);
    const salonSeleccionado = salones.find(salon => salon.id === idSalon);
    if (!salonSeleccionado) {
      spanTotal.textContent = "0";
      return;
    }
    let total = salonSeleccionado.precio;

    const checkboxes = document.querySelectorAll('input[name="servicios"]:checked');
    checkboxes.forEach(cb => {
      const servicio = servicios.find(s => s.id === parseInt(cb.value));
      if (servicio) total += servicio.valor;
    });

    spanTotal.textContent = total.toLocaleString();
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const tematica = selectTematica.value;
    const idSalon = selectSalon.value;
    const serviciosSeleccionados = document.querySelectorAll('input[name="servicios"]:checked');

    if (!nombre || !fecha || !tematica) {
      alert("Por favor, complete todos los campos del formulario.");
      return;
    }
    if (!idSalon) {
      alert("Por favor, seleccione un salón válido.");
      return;
    }
    if (serviciosSeleccionados.length === 0) {
      alert("Por favor, seleccione al menos un servicio.");
      return;
    }

    alert("Reserva realizada con éxito!\nTotal a pagar: $" + spanTotal.textContent);
    form.reset();
    llenarSelectSalones("");
    mostrarServicios();
    actualizarTotal();
    mostrarImagenSalon(null);
  });

  selectTematica.addEventListener("change", () => {
    llenarSelectSalones(selectTematica.value);
  });

  selectSalon.addEventListener("change", () => {
    const idSalon = parseInt(selectSalon.value);
    const salonSeleccionado = salones.find(salon => salon.id === idSalon);
    mostrarImagenSalon(salonSeleccionado);
    actualizarTotal();
  });

  // Inicializar con temática vacía (mostrar todos)
  llenarSelectSalones();
  mostrarServicios();
  actualizarTotal();
});
