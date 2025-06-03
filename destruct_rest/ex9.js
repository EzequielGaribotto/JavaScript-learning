// Enunciado: Usa destructuring y el operador rest para separar el primer elemento del resto en un array.
// Este ejemplo muestra cómo separar el primer elemento de un array y el resto en otra variable.
let array = [100, 200, 300, 400];

let [first, ...rest] = array;

console.log(first); // 100
console.log(rest);  // [200, 300, 400]
