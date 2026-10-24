export const regionesChile = [
  { nombre: 'Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'] },
  { nombre: 'Tarapacá', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica'] },
  { nombre: 'Antofagasta', comunas: ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones', 'Taltal'] },
  { nombre: 'Atacama', comunas: ['Copiapó', 'Vallenar', 'Caldera', 'Chañaral', 'Huasco'] },
  { nombre: 'Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel', 'Vicuña'] },
  {
    nombre: 'Valparaíso',
    comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio', 'Quillota'],
  },
  {
    nombre: 'Metropolitana de Santiago',
    comunas: [
      'Santiago',
      'Providencia',
      'Las Condes',
      'Maipú',
      'Puente Alto',
      'La Florida',
      'Ñuñoa',
      'Recoleta',
      'San Bernardo',
    ],
  },
  {
    nombre: "Libertador General Bernardo O'Higgins",
    comunas: ['Rancagua', 'San Fernando', 'Rengo', 'Machalí', 'Santa Cruz'],
  },
  { nombre: 'Maule', comunas: ['Talca', 'Curicó', 'Linares', 'Constitución', 'Cauquenes'] },
  { nombre: 'Ñuble', comunas: ['Chillán', 'Chillán Viejo', 'San Carlos', 'Bulnes', 'Quirihue'] },
  {
    nombre: 'Biobío',
    comunas: [
      'Concepción',
      'Talcahuano',
      'Los Ángeles',
      'Chiguayante',
      'San Pedro de la Paz',
      'Coronel',
    ],
  },
  {
    nombre: 'La Araucanía',
    comunas: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Angol', 'Pucón'],
  },
  { nombre: 'Los Ríos', comunas: ['Valdivia', 'La Unión', 'Río Bueno', 'Panguipulli', 'Lanco'] },
  { nombre: 'Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Castro', 'Ancud', 'Puerto Varas'] },
  {
    nombre: 'Aysén del General Carlos Ibáñez del Campo',
    comunas: ['Coyhaique', 'Puerto Aysén', 'Chile Chico', 'Cochrane'],
  },
  {
    nombre: 'Magallanes y de la Antártica Chilena',
    comunas: ['Punta Arenas', 'Puerto Natales', 'Porvenir', 'Cabo de Hornos'],
  },
]

export function comunasDe(nombreRegion) {
  const region = regionesChile.find((item) => item.nombre === nombreRegion)
  return region ? region.comunas : []
}
