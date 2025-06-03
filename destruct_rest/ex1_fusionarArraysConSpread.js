// Enunciado: fusionarArraysConSpread - Fusiona dos arrays en uno solo utilizando el operador spread.
// Esta función recibe dos arrays y devuelve uno nuevo que contiene todos los elementos de ambos arrays usando el spread operator.
function fusionarArraysConSpread(arr1, arr2) {
  console.log ([...arr1, ...arr2])
  return [...arr1, ...arr2]
}

fusionarArraysConSpread([1, 2], [2, 4, 5])
