// Enunciado: Inserta uno o más elementos en la mitad de un array usando el parámetro rest y el spread operator.
// Esta función inserta los elementos recibidos en la mitad del array original usando rest y spread.
function insertaEnMedio(arr, ...elementos) {
  const mitad = Math.floor(arr.length / 2);
  arr.splice(mitad, 0, ...elementos);
  console.log(arr)
}

insertaEnMedio([1,2,3], 4,5,6)
