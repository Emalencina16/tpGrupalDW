document.addEventListener("DOMContentLoaded", function () {
  var formulario = document.getElementById("formSalon");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombreSalon").value.trim();
    let tipo = document.getElementById("tipoSalon").value.trim();
    let capacidad = parseInt(document.getElementById("capacidadSalon").value);
    let direccion = document.getElementById("direccionSalon").value.trim();
    let precio = parseFloat(document.getElementById("precioSalon").value);
    let descripcion = document.getElementById("descripcionSalon").value.trim();

    if (nombre === "" || tipo === ""|| isNaN(capacidad) || direccion === "" || isNaN(precio) || descripcion === "") {
      alert("Completá todos los campos correctamente.");
      return;
    }

    let salonesGuardados = localStorage.getItem("salones");
    let salones = salonesGuardados ? JSON.parse(salonesGuardados) : [];

    let ultimoId = 0;
    salones.forEach(function (salon) {
      if (salon.id > ultimoId) {
        ultimoId = salon.id;
      }
    });

    let nuevoSalon = {
      id: ultimoId + 1,
      nombre: nombre,
      tipo: tipo,
      capacidad: capacidad,
      direccion: direccion,
      precio: precio,
      descripcion: descripcion
    };

    salones.push(nuevoSalon);
    localStorage.setItem("salones", JSON.stringify(salones));

    alert("Salón guardado correctamente.");
    formulario.reset();
  });
});
