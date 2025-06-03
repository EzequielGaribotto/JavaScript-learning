const motos = require('./motos.json');

/*
La moto más cara y más barata.
*/
 const motoMasCara = motos.reduce((max, moto) => moto.eur > max.eur ? moto : max, motos[0]);
const motoMasBarata = motos.reduce((min, moto) => moto.eur < min.eur ? moto : min, motos[0]);
console.log('La moto más cara es:');
console.log(motoMasCara);
console.log('La moto más barata es:');
console.log(motoMasBarata);