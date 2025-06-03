// Enunciado: Separa el primer elemento de un array del resto usando destructuring y el operador rest en una función.
// Esta función devuelve el primer elemento y el resto del array como un array de dos elementos.
function separateFirst(arr) {
  let [first, ...rest] = arr;
  return [first, rest];
}

let array = [100, 200, 300, 400];
let [first, rest] = separateFirst(array);

console.log(first);  // 100
console.log(rest);   // [200, 300, 400]
