// Enunciado: copiaArrayYAgregaElemento - Crea una copia de un array y añade un elemento al final usando el spread operator.
// Esta función copia un array recibido y le añade el elemento "patata" al final, mostrando ambos arrays para ver que el original no cambia.
function copiaArrayYAgregaElemento(arr1) {
  let nuevoArray = [...arr1, "patata"]
  console.log(nuevoArray)
  console.log(arr1)
}

copiaArrayYAgregaElemento(["peras"])
