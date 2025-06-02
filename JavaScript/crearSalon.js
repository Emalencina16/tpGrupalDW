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

    if (nombre === "" ||
       tipo === ""||
        isNaN(parseInt(capacidad)) || 
        direccion === "" || 
        isNaN(parseInt(precio)) || 
        descripcion === "") {
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
      capacidad: parseInt(capacidad),
      direccion: direccion,
      precio: parseInt(precio),
      descripcion: descripcion,
      imagen: `../img/default.jpg` // Asignar una imagen basada en el nombre y tipo
    };

    salones.push(nuevoSalon);
    localStorage.setItem("salones", JSON.stringify(salones));

    alert("Salón guardado correctamente.");
    formulario.reset();

    mostrarTablaSalones();
  });
});
