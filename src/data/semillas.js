export const categoriasSemilla = [
  {
    id: 1,
    slug: 'teclados',
    nombre: 'Teclados',
    descripcion: 'Mecánicos, de membrana y compactos para cada tipo de escritorio.',
    imagen: '/assets/img/teclado.jpg',
  },
  {
    id: 2,
    slug: 'mouse',
    nombre: 'Mouse',
    descripcion: 'Sensores de alta precisión, con cable e inalámbricos.',
    imagen: '/assets/img/mouse.jpg',
  },
  {
    id: 3,
    slug: 'notebooks',
    nombre: 'Notebooks',
    descripcion: 'Equipos portátiles con tarjeta dedicada y pantallas de alta tasa de refresco.',
    imagen: '/assets/img/laptop.webp',
  },
  {
    id: 4,
    slug: 'accesorios',
    nombre: 'Accesorios',
    descripcion: 'Mousepads, audífonos y todo lo que completa el setup.',
    imagen: '/assets/img/portada.jpg',
  },
]

export const productosSemilla = [
  {
    id: 1,
    nombre: 'Teclado mecánico Zone K80 RGB',
    categoria: 'teclados',
    precio: 59990,
    oferta: 47990,
    stock: 12,
    marca: 'Zone',
    garantia: '12 meses',
    imagen: '/assets/img/teclado.jpg',
    descripcion:
      'Teclado mecánico de tamaño completo con switches rojos, retroiluminación RGB por tecla y estructura de aluminio.',
  },
  {
    id: 2,
    nombre: 'Teclado compacto Zone K60 TKL',
    categoria: 'teclados',
    precio: 39990,
    oferta: null,
    stock: 3,
    marca: 'Zone',
    garantia: '12 meses',
    imagen: '/assets/img/teclado.jpg',
    descripcion:
      'Formato sin teclado numérico, ideal para escritorios pequeños y para jugadores que mueven mucho el mouse.',
  },
  {
    id: 3,
    nombre: 'Mouse gamer Zone M5 Pro',
    categoria: 'mouse',
    precio: 29990,
    oferta: 24990,
    stock: 20,
    marca: 'Zone',
    garantia: '12 meses',
    imagen: '/assets/img/mouse.jpg',
    descripcion:
      'Mouse de 16000 DPI ajustables, seis botones programables y sensor óptico de alta precisión.',
  },
  {
    id: 4,
    nombre: 'Mouse inalámbrico Zone M2 Air',
    categoria: 'mouse',
    precio: 24990,
    oferta: null,
    stock: 2,
    marca: 'Zone',
    garantia: '12 meses',
    imagen: '/assets/img/mouse.jpg',
    descripcion:
      'Conexión de 2.4 GHz con receptor USB, 70 horas de autonomía y peso de 68 gramos.',
  },
  {
    id: 5,
    nombre: 'Notebook gamer Zone Raptor 15',
    categoria: 'notebooks',
    precio: 899990,
    oferta: null,
    stock: 5,
    marca: 'Zone',
    garantia: '24 meses',
    imagen: '/assets/img/laptop.webp',
    descripcion:
      'Notebook de 15 pulgadas con pantalla de 144 Hz, 16 GB de memoria RAM y disco sólido de 512 GB.',
  },
  {
    id: 6,
    nombre: 'Notebook Zone Raptor 17 Ultra',
    categoria: 'notebooks',
    precio: 1299990,
    oferta: 1149990,
    stock: 1,
    marca: 'Zone',
    garantia: '24 meses',
    imagen: '/assets/img/laptop.webp',
    descripcion:
      'Pantalla de 17 pulgadas a 165 Hz, 32 GB de memoria RAM y refrigeración por cámara de vapor.',
  },
  {
    id: 7,
    nombre: 'Mousepad XL Zone Grid',
    categoria: 'accesorios',
    precio: 12990,
    oferta: 9990,
    stock: 30,
    marca: 'Zone',
    garantia: '6 meses',
    imagen: '/assets/img/portada.jpg',
    descripcion:
      'Superficie de 900 x 400 mm con base antideslizante y bordes cosidos que evitan el desgaste.',
  },
  {
    id: 8,
    nombre: 'Audífonos Zone H3 Surround',
    categoria: 'accesorios',
    precio: 49990,
    oferta: null,
    stock: 8,
    marca: 'Zone',
    garantia: '12 meses',
    imagen: '/assets/img/portada.jpg',
    descripcion:
      'Sonido envolvente 7.1 por software, micrófono retráctil con cancelación de ruido y almohadillas de espuma viscoelástica.',
  },
]

export const usuariosSemilla = [
  {
    id: 1,
    nombre: 'Patricio Ormazabal',
    correo: 'admin@thezone.cl',
    clave: 'Admin123',
    rol: 'administrador',
    region: 'Metropolitana de Santiago',
    comuna: 'Providencia',
    calle: 'Av. Providencia 1234',
    activo: true,
  },
  {
    id: 2,
    nombre: 'Pedro Hacker',
    correo: 'pedro@example.com',
    clave: 'Cliente123',
    rol: 'cliente',
    region: 'Metropolitana de Santiago',
    comuna: 'Maipú',
    calle: 'Los Crisantemos 456',
    activo: true,
  },
]

export const entradasBlog = [
  {
    slug: 'elegir-primer-teclado-mecanico',
    titulo: 'Cómo elegir tu primer teclado mecánico',
    fecha: '2026-09-02',
    resumen:
      'Switch rojo, azul o marrón: la diferencia está en el recorrido y en el ruido. Te explicamos cuál conviene según el uso que le vayas a dar.',
    cuerpo: [
      'El switch es la pieza que hay debajo de cada tecla y define cómo se siente escribir. Los rojos son lineales: bajan parejo, sin tope intermedio, y por eso se prefieren para jugar.',
      'Los azules tienen un clic audible y un tope que se nota en el dedo. Escribir con ellos es muy cómodo, pero en una llamada por voz el micrófono los va a captar enteros.',
      'Los marrones están en el medio: tienen el tope, pero sin el clic. Si no tienes claro para qué lo vas a usar más, es la opción segura.',
    ],
  },
  {
    slug: 'dpi-hz-latencia',
    titulo: 'DPI, Hz y latencia explicados sin tecnicismos',
    fecha: '2026-08-21',
    resumen:
      'Tres números que aparecen en toda ficha técnica y que casi nadie explica bien. Aquí van en palabras simples.',
    cuerpo: [
      'El DPI dice cuántos puntos recorre el cursor por cada pulgada que mueves el mouse. Más DPI no es mejor: es más rápido, y pasado cierto punto se vuelve imposible de controlar.',
      'Los Hz del monitor son cuántas imágenes alcanza a dibujar por segundo. A 60 Hz ves 60 fotos por segundo; a 144 Hz, 144. El movimiento se ve más continuo.',
      'La latencia es el tiempo entre que mueves el mouse y lo ves en pantalla. Es la que de verdad se siente, y la que menos aparece en las cajas.',
    ],
  },
  {
    slug: 'ergonomia-setup',
    titulo: 'Ergonomía: cómo no terminar con dolor de espalda',
    fecha: '2026-08-05',
    resumen:
      'La altura de la silla, la distancia al monitor y la posición de los brazos importan más que la marca de tu equipo.',
    cuerpo: [
      'La regla corta: los ojos a la altura del borde superior de la pantalla, los codos en ángulo recto y los pies apoyados en el suelo.',
      'Si el escritorio queda alto y no se puede bajar, sube la silla y usa un apoyo para los pies. Trabajar con los hombros encogidos pasa la cuenta en un par de meses.',
      'Levantarse cinco minutos cada hora hace más por tu espalda que cualquier silla cara.',
    ],
  },
  {
    slug: 'monitores-144hz',
    titulo: 'Monitores de 144 Hz: vale la pena el salto',
    fecha: '2026-07-18',
    resumen:
      'Comparamos 60, 144 y 165 Hz en juegos competitivos y en uso diario para ver dónde se nota de verdad la diferencia.',
    cuerpo: [
      'El salto de 60 a 144 Hz es el más notorio de todos, y se nota incluso moviendo el cursor en el escritorio.',
      'De 144 a 165 Hz la diferencia existe, pero hay que estar buscándola. Si el presupuesto está justo, conviene gastarlo en el panel antes que en los Hz.',
      'Ojo con una cosa: de nada sirve un monitor de 144 Hz si el equipo entrega 50 cuadros por segundo en ese juego.',
    ],
  },
  {
    slug: 'limpieza-perifericos',
    titulo: 'Limpieza y mantención de tus periféricos',
    fecha: '2026-07-03',
    resumen:
      'Una rutina simple cada tres meses alarga la vida útil de tu teclado y de tu mouse bastante más de lo que crees.',
    cuerpo: [
      'Desconecta, da vuelta el teclado y sacúdelo con cuidado. La mayor parte de lo que se acumula sale así, sin desarmar nada.',
      'Para las teclas usa un extractor de keycaps o, si no tienes, un clip doblado. Lávalas con agua tibia y déjalas secar al menos doce horas antes de volver a ponerlas.',
      'El mouse se limpia con un paño apenas húmedo y un bastoncillo en los patines. Nada de alcohol directo sobre el sensor.',
    ],
  },
  {
    slug: 'setup-bajo-300-mil',
    titulo: 'Arma tu setup con menos de $300.000',
    fecha: '2026-06-20',
    resumen:
      'Seleccionamos una combinación de teclado, mouse, audífonos y mousepad que rinde bien sin gastar de más.',
    cuerpo: [
      'La repartición que nos resultó mejor: la mitad del presupuesto en el teclado y los audífonos, un tercio en el mouse y el resto en el mousepad.',
      'Con los productos del catálogo, un K60 TKL, un M5 Pro, los H3 Surround y un Grid XL quedan dentro del presupuesto y cubren todo.',
      'Lo que no recomendamos recortar: el mousepad. Es la pieza más barata y la que más cambia la sensación al apuntar.',
    ],
  },
]
