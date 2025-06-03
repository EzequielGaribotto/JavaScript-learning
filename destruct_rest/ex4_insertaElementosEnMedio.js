// Enunciado: insertaElementosEnMedio - Inserta uno o más elementos en la mitad de un array usando el parámetro rest y el spread operator.
// Esta función inserta los elementos recibidos en la mitad del array original usando rest y spread.
function insertaElementosEnMedio(arr, ...elementos) {
  const mitad = Math.floor(arr.length / 2);
  arr.splice(mitad, 0, ...elementos);
  // o
  // arr = [...arr.slice(0, mitad), ...elementos, ...arr.slice(mitad)];
  console.log(arr) // [1, 2, 4, 5, 6, 3]
}

insertaElementosEnMedio([1,2,3], 4,5,6)
