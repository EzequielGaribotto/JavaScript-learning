const bicis = require('./bicing.json');

/*
Función que devuelva las X estaciones más
cercanas a la ubicación 41.388163,
2.179769.

Cálculo de distancia entre (x,y) y (x',y'):
● Raíz cuadrada de la suma de los
cuadrados de (y-y') y (x-x').
Utilizar sort basado en esta distancia.
*/

function estacionesCercanas(bicis, lat, lon, numEstaciones) {
    const estacionesConDistancia = bicis.map(estacion => {
        const distancia = Math.sqrt(
            Math.pow(estacion.latitude - lat, 2) +
            Math.pow(estacion.longitude - lon, 2)
        );
        return { ...estacion, distancia };
    });

    const estacionesOrdenadas = estacionesConDistancia.sort((a, b) => a.distancia - b.distancia);
    const estacionesCercanas = estacionesOrdenadas.slice(0, numEstaciones);

    return estacionesCercanas.map(estacion => estacion.name);
}

const lat = 41.388163;
const lon = 2.179769;

const numEstaciones = 5; // Número de estaciones más cercanas a devolver
const estaciones = estacionesCercanas(bicis, lat, lon, numEstaciones);
console.log(`Las ${numEstaciones} estaciones más cercanas a (${lat}, ${lon}) son:\n` 
            + estaciones.join('\n'));