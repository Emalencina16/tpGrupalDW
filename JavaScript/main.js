const contenedor = document.getElementById('contenedor-salones');

salones.forEach(salon => {
  const card = document.createElement('div');
  card.className = 'card-salon';
  card.innerHTML = `
    <img src="${salon.imagen}" alt="${salon.nombre}">
    <h3>${salon.nombre}</h3>
    <p>Tipo: ${salon.tipo}</p>
    <p>Capacidad: ${salon.capacidad}</p>
  `;
  contenedor.appendChild(card);
});