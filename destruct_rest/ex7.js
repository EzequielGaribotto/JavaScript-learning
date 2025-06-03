// Enunciado: Recorre un array de arrays y usa destructuring para extraer los valores.
// Este ejemplo muestra cómo usar destructuring en un bucle para extraer los valores de subarrays.
let array = [[1, "uno"], [2, "dos"], [3, "tres"]];

for (let [numero, texto] of array) {
  console.log(numero + " es " + texto);
}
