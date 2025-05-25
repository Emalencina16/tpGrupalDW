function inicializarLocalStorage() {
  if (!localStorage.getItem("salones")) {
    var salones = [
      { id: 1, nombre: "Salón Encanto", capacidad: 120, direccion: "Av. Sarmiento 1123", precio: 25000 },
      { id: 2, nombre: "Salón Estrellas", capacidad: 180, direccion: "Belgrano 456", precio: 30000 },
      { id: 3, nombre: "Salón Jardín", capacidad: 100, direccion: "Mitre 879", precio: 27000 },
      { id: 4, nombre: "Salón Aires", capacidad: 90, direccion: "Güemes 1330", precio: 24000 },
      { id: 5, nombre: "Salón Brisas", capacidad: 130, direccion: "Bolívar 742", precio: 28000 }
    ];
    localStorage.setItem("salones", JSON.stringify(salones));
  }
}

inicializarLocalStorage();
