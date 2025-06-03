const motos = require('./motos.json');
/*
¿Qué moto tiene menos de 25.000
km, más de 350cc de cilindrada y
cuesta entre 1.800 y 2.200 eur?
*/
const motoEspecifica = motos
  .filter(moto => moto.km < 25000 && moto.cc > 350 &&
          moto.eur >= 1800 && moto.eur <= 2200)

console.log(`La moto específica es:`);
console.log(motoEspecifica);

