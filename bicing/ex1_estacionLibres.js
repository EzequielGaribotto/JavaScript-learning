const bicis = require('./bicing.json');
/*
Función que nos devuelva la estación con
más bicicletas libres. (sort con función
compare personalizada, de más a menos
bicis libres, tomar primer elemento)
*/

function estacionConMasBicisLibres(bicis) {
    const sortedBicis = bicis.sort((a, b) => b.free_bikes - a.free_bikes);
    const estacionConMasBicisLibres = sortedBicis[0];
    return estacionConMasBicisLibres;
}

const estacion = estacionConMasBicisLibres(bicis);
console.log(`La estación con más bicicletas libres es:\n` 
            + estacion.name);
