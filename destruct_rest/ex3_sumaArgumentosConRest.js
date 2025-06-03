// Enunciado: sumaArgumentosConRest - Suma todos los números recibidos como argumentos usando el parámetro rest.
// Esta función recibe cualquier cantidad de números como argumentos y los suma usando el parámetro rest y reduce.
function sumaArgumentosConRest(...numeros) {
  let suma = numeros.reduce((acc, val) => acc + val, 0);
  console.log(suma)
}

sumaArgumentosConRest(1,2,3,4)
