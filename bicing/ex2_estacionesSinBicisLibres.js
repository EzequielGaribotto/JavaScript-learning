const bicis = require('./bicing.json');
/*
Función que nos devuelva un array de
nombres de estaciones que no tienen
bicicletas libres (filter+map).
*/

function estacionesSinBicisLibres(bicis) {
    const estacionesSinBicis = bicis
        .filter(estacion => estacion.free_bikes === 0)
        .map(estacion => estacion.name);
    return estacionesSinBicis;
}

const estaciones = estacionesSinBicisLibres(bicis);
console.log(`Las estaciones sin bicicletas libres son:\n` 
            + estaciones.join('\n'));
