const motos = require('./motos.json');
/*
¿Cuántas motos hay con menos de
30.000 km de más de 240cc?
*/
const motosResult = motos
  .filter(moto => moto.km < 30000 && moto.cc >= 240)

console.log(`Hay ${motosResult.length} motos con menos de 30.000 km con al menos 240cc`);