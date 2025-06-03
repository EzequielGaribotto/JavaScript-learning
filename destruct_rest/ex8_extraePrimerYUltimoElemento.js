// Enunciado: extraePrimerYUltimoElemento - Extrae el primer y último elemento de un array usando destructuring y crea un nuevo array con ellos.
// Este ejemplo muestra cómo extraer elementos específicos de un array y crear uno nuevo con ellos.
let array = [1, 2, 3, 4];

let [first, , , last] = array;

let arrayNuevo = [first, last];

console.log(arrayNuevo);  // [1, 4]


// o

let array2 = [1, 2, 3, 4];

let first2 = array2[0];
let last2 = array2[array2.length - 1];

let arrayNuevo2 = [first2, last2];
console.log(arrayNuevo2);  // [1, 4]