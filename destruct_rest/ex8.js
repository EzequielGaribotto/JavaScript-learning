// Enunciado: Extrae el primer y último elemento de un array usando destructuring y crea un nuevo array con ellos.
// Este ejemplo muestra cómo extraer elementos específicos de un array y crear uno nuevo con ellos.
let array = [1, 2, 3, 4];

let [first, , , last] = array;

let arrayNuevo = [first, last];

console.log(arrayNuevo);  // [1, 4]
