const motos = require('./motos.json');

/*
Una lista de marcas distintas con el
número de motos de cada una.
*/
let marcas = motos.map(moto => moto.marca);
marcas = [...new Set(marcas)];

let marcasDict = {};
for (let marca of marcas) {
  const motosCount = motos.filter(moto => moto.marca === marca).length;
  marcasDict[marca] = motosCount;
}

for (let marca in marcasDict) {
  console.log(`Marca: ${marca}, Motos: ${marcasDict[marca]}`);
}

