/**
 * 
1. Convierte esta función a arrow function:
function suma(a, b) {
 return a + b;
 */

const suma = (a, b) => a + b;

// 2. Crea una arrow function que reciba un nombre y devuelva: "Hola, <nombre>!"

const saludo = nombre => `Hola, ${nombre}!`;


// 3. Crea una arrow function que reciba un número y devuelva su cuadrado.

const cuadrado = a => a*a;

// 4. Crea una arrow function que devuelva siempre el string "¡Hola mundo!"º
const holaMundo = () => "¡Hola mundo!";

// 5. Arrow function que reciba un número y devuelva "par" o "impar".
const esPar = num => num % 2 === 0 ? "par" : "impar"

// 6. Crea una arrow function que reciba un mensaje y un número, y lo repita n veces en
// consola.
const repiteMensaje = (mensaje, veces) => {
    for (let i = 0; i < veces; i++) {
        console.log(mensaje)
    }
}

// 7. Crea una arrow function que reciba cualquier cantidad de números y devuelva su
// promedio.
const mean = (...numbers) => {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total+=numbers[i]
    }
    return total / numbers.length
}
const meanSimple = (...numbers) => numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
// 8. Crea una arrow function con dos parámetros, el segundo con valor por defecto. Si no se
// pasa, que imprima "No se proporcionó valor"
const parameters = (a, b=-1) => {
    if (b === -1) {
        console.log("No se proporcionó valor")
    }
}