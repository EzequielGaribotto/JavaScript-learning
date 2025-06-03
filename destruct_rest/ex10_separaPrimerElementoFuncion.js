// Enunciado: separaPrimerElementoFuncion - Separa el primer elemento de un array del resto usando destructuring y el operador rest en una función.
// Esta función devuelve el primer elemento y el resto del array como un array de dos elementos.
function separaPrimerElementoFuncion(...numeros) {
  let [first, ...rest] = numeros;
  return {
    inicio: first,
    resto: rest,
  }
}

let [first, rest] = separaPrimerElementoFuncion(100,200,300,400);

console.log(first);  // 100
console.log(rest);   // [200, 300, 400]
