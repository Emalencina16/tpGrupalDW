function inicializarLocalStorage() {
  if (!localStorage.getItem("salones")) {
    let salones = [
      { id: 1, nombre: "Salón Encanto", tipo:"Interior", capacidad: 120, direccion: "Av. Sarmiento 1123", precio: 25000, descripcion: "Un salón versátil con un toque de elegancia y calidez. Ideal para celebraciones sociales, cuenta con un ambiente cómodo y detalles encantadores que se adaptan a distintos estilos de eventos. Perfecto para quienes buscan un espacio con personalidad.", imagen: "../img/salones%20interior/salonEncanto.png" },
      { id: 2, nombre: "Salón Estrellas", tipo:"Interior", capacidad: 180, direccion: "Belgrano 456", precio: 30000, descripcion: "Amplio, moderno y luminoso, este salón está preparado para grandes eventos. Su distribución abierta permite una organización flexible, ideal para fiestas, recepciones o reuniones importantes. Un espacio donde cada detalle brilla.", imagen: "../img/salones%20interior/salonEstrellas.png" },
      { id: 3, nombre: "Salón Jardín", tipo:"Interior", capacidad: 100, direccion: "Mitre 879", precio: 27000, descripcion: "Con un diseño sobrio y acogedor, este salón combina funcionalidad y buen gusto. Perfecto para celebraciones íntimas, reuniones familiares o eventos elegantes, ofrece un entorno sereno con estilo natural y decoración adaptable.", imagen: "../img/salones%20interior/salonJardin.jpg" },
      { id: 4, nombre: "Salón Aires", tipo:"Interior", capacidad: 90, direccion: "Güemes 1330", precio: 24000, descripcion: "Ideal para encuentros cálidos y eventos privados, este salón destaca por su comodidad y estética simple pero refinada. Equipado con todo lo necesario para una celebración fluida y memorable, es la elección ideal para quienes valoran la armonía del espacio.", imagen: "../img/salones%20interior/salonAires.png" },
      { id: 5, nombre: "Salón Brisas", tipo:"Interior", capacidad: 130, direccion: "Bolívar 742", precio: 28000, descripcion: "Elegante y funcional, este salón ofrece un entorno moderno para eventos sociales, cumpleaños, despedidas o aniversarios. Con buena iluminación, climatización y espacio adaptable, es el escenario perfecto para crear momentos especiales.", imagen: "../img/salones%20interior/salonBrisas.jpg" },

      { id: 6, nombre: "Salón Jungla Divertida", tipo:"Infantil", capacidad: 50, direccion: "Monte Caseros 1203", precio: 15000, descripcion: "Un lugar mágico con castillos inflables y disfraces para los pequeños. Incluye zona de juegos blandos.", imagen: "../img/salones%20infantiles/junglaDivertida.png" },
      { id: 7, nombre: "Salón Dulce Aventura", tipo:"Infantil", capacidad: 40, direccion: "San Martín 2340", precio: 18000, descripcion: "Parque de juegos con toboganes y laberintos. Diversión garantizada.", imagen: "../img/salones%20infantiles/dulceAventura.png" },
      { id: 8, nombre: "Salón Mundo Mágico", tipo:"Infantil", capacidad: 60, direccion: "Avenida Ramírez 1520", precio: 12000, descripcion: "Salón temático de cuentos con actividades creativas, zona de lectura y un castillo interactivo.", imagen: "../img/salones%20infantiles/mundoMagico.png" },
      { id: 9, nombre: "Salón Estrellitas", tipo:"Infantil", capacidad: 60, direccion: "Av. Ramírez 3120", precio: 22000, descripcion: "Amplio salón con escenario para espectáculos, animación profesional y opciones de menú adaptadas a niños.", imagen: "../img/salones%20infantiles/estrellitas.png" },
      { id: 10, nombre: "Salón Pequeños Sueños", tipo:"Infantil", capacidad: 55, direccion: "Buenos Aires 988", precio: 16000, descripcion: "Espacio acogedor con juegos didácticos, talleres y actividades de integración para todas las edades. Muy seguro.", imagen: "../img/salones%20infantiles/peqSuenos.png" },
      
      { id: 11, nombre: "Salón Aurora", tipo:"Exterior", capacidad: 150, direccion: "España 2369", precio: 15000, descripcion: "Espacio rodeado de palmeras y césped natural, ideal para celebraciones al aire libre con ambientación tropical. Cuenta con pérgolas, iluminación cálida y capacidad para 150 personas.", imagen: "../img/salones%20exterior/aurora.webp" },
      { id: 12, nombre: "Salón Zafiro", tipo:"Exterior", capacidad: 130, direccion: "Urquiza 1557", precio: 18000, descripcion: "Salón estilo campestre con vistas panorámicas y una gran arboleda. Perfecto para bodas, eventos corporativos o reuniones familiares. Dispone de estacionamiento y carpa opcional.", imagen: "../img/salones%20exterior/zafiro.jpg" },
      { id: 13, nombre: "Salón Ébano", tipo:"Exterior", capacidad: 90, direccion: "Batalla de Caseros 583", precio: 12000, descripcion: "Salón exterior rodeado de aromos y flores de estación, con un diseño elegante y romántico. Ofrece servicios de catering y decoración personalizada.", imagen: "../img/salones%20exterior/ebano.jpeg" },
      { id: 14, nombre: "Salón Horizonte", tipo:"Exterior", capacidad: 100, direccion: "Cochabamba 749", precio: 22000, descripcion: "Espacio moderno junto al río, con deck de madera, barra al aire libre y vista privilegiada del atardecer. Ideal para eventos sociales y fiestas exclusivas.", imagen: "../img/salones%20exterior/horizonte.jpg" },
      { id: 15, nombre: "Salón Prisma", tipo:"Exterior", capacidad: 200, direccion: "Falso 123", precio: 16000, descripcion: "Ambiente rústico y natural con amplios espacios verdes, lago artificial y zona de juegos. Ideal para eventos diurnos con actividades al aire libre.", imagen: "../img/salones%20exterior/prisma.jpg" },
      
      { id: 16, nombre: "Salón Coliseo", tipo:"Pileta", capacidad: 40, direccion: "Garrigo 4322, Crespo, Entre Ríos", precio: 14000, descripcion: "Salón moderno con piscina climatizada y zonas de descanso. Ideal para eventos pequeños con ambiente relajado y vista al jardín.", imagen: "../img/salones-con-piscinas/pile-5.jpeg" },
      { id: 17, nombre: "Salón El Espejo", tipo:"Pileta", capacidad: 25, direccion: "Las chacras 1327, Villa Gesell, Buenos Aires", precio: 12500, descripcion: "Salón íntimo con pileta descubierta, ideal para reuniones familiares o fiestas privadas. Cuenta con zona de parrilla y solárium.", imagen: "../img/salones-con-piscinas/pile-2.webp" },
      { id: 18, nombre: "Salón La Bodega", tipo:"Pileta", capacidad: 60, direccion: "Los cardenales 3256, Carlos Paz, Córdoba", precio: 17000, descripcion: "Amplio salón con pileta iluminada, perfecto para eventos de noche. Ofrece cocina equipada, estacionamiento y DJ booth.", imagen: "../img/salones-con-piscinas/pile-3.jpg" },
      { id: 19, nombre: "Salón El Remanso", tipo:"Pileta", capacidad: 30, direccion: "Av Ejercito 1567, Colonia Avellaneda, Entre Ríos", precio: 13000, descripcion: "Salón rodeado de vegetación con piscina semiolímpica, sector lounge y áreas cubiertas para catering y entretenimiento.", imagen: "../img/salones-con-piscinas/pile-4.jpg" },
      { id: 20, nombre: "Salón El Refugio", tipo:"Pileta", capacidad: 45, direccion: "Echague 879, Paraná, Entre Ríos", precio: 15000, descripcion: "Espacio versátil con pileta exterior, zona techada y servicio de ambientación. Ideal para fiestas de cumpleaños y eventos sociales.", imagen: "../img/salones-con-piscinas/pile-1.jpeg" }

    ];
    localStorage.setItem("salones", JSON.stringify(salones));
    
  }
}



inicializarLocalStorage();


