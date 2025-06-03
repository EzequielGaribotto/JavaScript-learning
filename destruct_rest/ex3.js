// Enunciado: Suma todos los números recibidos como argumentos usando el parámetro rest.
// Esta función recibe cualquier cantidad de números como argumentos y los suma usando el parámetro rest y reduce.
function sumaTodos(...numeros) {
  let suma = numeros.reduce((acc, val) => acc + val, 0);
  console.log(suma)
}

sumaTodos(1,2,3,4)
