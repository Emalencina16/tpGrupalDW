document.addEventListener("DOMContentLoaded", function () {
  var formulario = document.getElementById("formSalon");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    var nombre = document.getElementById("nombreSalon").value.trim();
    var capacidad = parseInt(document.getElementById("capacidadSalon").value);
    var direccion = document.getElementById("direccionSalon").value.trim();
    var precio = parseFloat(document.getElementById("precioSalon").value);

    if (nombre === "" || isNaN(capacidad) || direccion === "" || isNaN(precio)) {
      alert("Completá todos los campos correctamente.");
      return;
    }

    var nuevoSalon = {
      id: Date.now(),
      nombre: nombre,
      capacidad: capacidad,
      direccion: direccion,
      precio: precio
    };

    var salonesGuardados = localStorage.getItem("salones");
    var salones = salonesGuardados ? JSON.parse(salonesGuardados) : [];
    salones.push(nuevoSalon);
    localStorage.setItem("salones", JSON.stringify(salones));

    alert("Salón guardado correctamente.");
    formulario.reset();
  });
});
