const motos = require('./motos.json');

/*
¿Cuántas motos hay con menos de
30.000 km de la marca HONDA?
*/
const motosHonda = motos
  .filter(moto => moto.km < 30000 && moto.marca === 'HONDA')

console.log(`Hay ${motosHonda.length} motos de Honda con menos de 30,000 km`);