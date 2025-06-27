document.addEventListener("DOMContentLoaded", function () {
  console.log("Script cargado ");
  let formulario = document.getElementById("formSalon");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombreSalon").value.trim();
    let tipo = document.getElementById("tipoSalon").value.trim();
    let capacidad = parseInt(document.getElementById("capacidadSalon").value.trim());
    let direccion = document.getElementById("direccionSalon").value.trim();
    let precio = parseFloat(document.getElementById("precioSalon").value.trim());
    let descripcion = document.getElementById("descripcionSalon").value.trim();
    let archivoImagen = document.getElementById("imagenSalon").files[0];

    if (
      nombre === "" ||
      tipo === "" ||
      isNaN(capacidad) ||
      direccion === "" ||
      isNaN(precio) ||
      descripcion === "" ||
      !archivoImagen
    ) {
      alert("Completá todos los campos correctamente.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      const imagenBase64 = reader.result;

      let salonesGuardados = localStorage.getItem("salones");
      let salones = salonesGuardados ? JSON.parse(salonesGuardados) : [];

      let ultimoId = salones.reduce((maxId, salon) => salon.id > maxId ? salon.id : maxId, 0);

      let nuevoSalon = {
        id: ultimoId + 1,
        nombre: nombre,
        tipo: tipo,
        capacidad: capacidad,
        direccion: direccion,
        precio: precio,
        descripcion: descripcion,
        imagen: imagenBase64 // Se guarda la imagen personalizada en base64
      };

      salones.push(nuevoSalon);
      localStorage.setItem("salones", JSON.stringify(salones));

      alert("Salón guardado correctamente.");
      formulario.reset();

      mostrarTablaSalones?.(); // Por si ya está definida en tablaSalones.js
    };

    reader.readAsDataURL(archivoImagen); // Convierte la imagen a base64
  });
});

