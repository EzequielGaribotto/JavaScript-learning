/**
 * 1. Dado un array de números, usa .map() con arrow function para obtener un nuevo array
 * con los cuadrados.
 */

const squaredArray = numberArr => numberArr.map(num => num * num);

/**
 * 2. Usa .filter() con arrow function para quedarte solo con los números pares de este array:
[1, 2, 3, 4, 5, 6]
 */

const pairNumbers = numberArr => numberArr.filter(num => num % 2 === 0)

/**
 * 3. Usa .reduce() con arrow function para sumar todos los elementos del array [10, 20, 30].
 */

const sumNumbers = numberArr => numberArr.reduce((acc, n) => acc + n, 0)

/**
 * 4. Dado un array de palabras, usa .map() con arrow function para crear un nuevo array con
la longitud de cada palabra.
 */

const mapWordLength = wordsArr => wordsArr.map(word => word.length)

/**
 * 5. Dado un array de objetos tipo {nombre: "Ana", edad: 25}, usa .filter() con una arrow
function para obtener solo los mayores de edad.
 */

const mapAdults = personsArray => personsArray.filter(person => person.edad > 18)

/**
 * 6. Dado un array de números, ordénalos de mayor a menor usando .sort() y una arrow
 * function.
 */

const sortNumbers = numbersArr => numbersArr.sort((a, b) => b - a);

/**
 * 7. Dado un array de nombres, usa .map() para obtener un array con el número de letras de
cada nombre.
 */
const mapCharacterLength = namesArr => namesArr.map(namee => namee.length)


/**
 * 8. Dado un array de objetos {producto: "Pan", precio: 2.5}, usa .map() para crear un array
con frases como "El producto Pan cuesta 2.5€".
 */

const panMessages = panesArr => panesArr.map(pan => `El producto ${pan.producto}, cuesta ${pan.precio}€`)

/**
 * 9. Dado un array de números, usa .filter() para obtener solo los múltiplos de 3.
 */
const getMultiplesOfThree = numbersArr => numbersArr.filter(num => num % 3 === 0)
/**
 * 10. Dado un array de objetos {nombre: "Ana", notas: [7, 9, 8]}, usa .map() y .reduce() para
obtener un nuevo array con los promedios de cada persona.
 */

const meanGradeArr = grades => grades.map(grade =>
    grade.notas.reduce((acc, val) => acc+val, 0) / grade.notas.length
);

/**
 * 11. Dado un array de números, usa .reduce() para contar cuántos son pares.
 */
const countPairs = numbersArr => numbersArr.reduce((acc, val) => {
    if (val % 2 === 0) {
        return acc+1
    } else {
        return acc
    }
}, 0);
/**
/**
 * 12. Dado un array de strings, usa .forEach() para imprimir cada uno con su posición (ej: "0: Hola").
 */
const printStringPositions = stringArr =>
    stringArr.forEach((str, idx) => console.log(`${idx}: ${str}`));
/**
 * 
13. Dado un array de precios, usa .reduce() para calcular el total y luego el precio medio.
 */

const avgPrice = pricesArr => pricesArr.reduce((acc, val) => acc+val, 0) / pricesArr.length

/**
 * 14. Dado un array de nombres, usa .sort() para ordenarlos por orden alfabético inverso.
 */

const sortNames = namesArr => namesArr.sort((a,b) => b.localeCompare(a));

/**
 * 15. Dado un array de objetos {nombre: "Pepe", edad: 30}, usa .sort() para ordenarlos de
menor a mayor edad.
 */

const sortPersonAges = person => person.sort((a, b) => a.edad - b.edad)

/**
 * 16. Dado un array de números, usa .filter() para eliminar los duplicados. (Pista: puedes usar
 * .filter() junto con .indexOf().)
 */

const filterDuplicates = numberArr =>
    numberArr.filter((num, idx, arr) => arr.indexOf(num) === idx);