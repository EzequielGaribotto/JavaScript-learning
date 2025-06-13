/**
 * Ejercicio 2: JSON → CSV (productos) Crea un script que convierta un archivo productos.json a un archivo productos.csv.
Requisitos:
• Detecta automáticamente las claves de cada objeto para generar la cabecera del CSV.
• El archivo CSV debe tener los campos separados por comas.
• El script debe funcionar indicando el archivo JSON como argumento.
Entrada: productos.json Salida esperada: productos.csv

 */


const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Obtener los argumentos usando minimist
const argv = minimist(process.argv.slice(2), {
    string: ['input'],
    alias: { input: 'i' },
    default: { input: null }
});

// Obtener el nombre del archivo CSV desde los argumentos
const inputFile = argv.input || argv._[0];
if (!inputFile) {
    console.error('Por favor, proporciona el nombre del archivo JSON como argumento.');
    console.error('Uso: node io_ex2.js --input ./data/productos.json');
    console.error('   o: node io_ex2.js -i ./data/productos.json');
    console.error('   o: node io_ex2.js ./data/productos.json');
    process.exit(1);
}

// Verificar que el archivo existe
const inputFilePath = path.resolve(__dirname, inputFile);
if (!fs.existsSync(inputFilePath)) {
    console.error(`El archivo ${inputFile} no existe.`);
    process.exit(1);
}

// Leer el archivo JSON
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error al leer el archivo: ${err.message}`);
        process.exit(1);
    }

    // Parsear el contenido JSON
    let jsonData;
    try {
        jsonData = JSON.parse(data); // crates an array of objects
        console.log(jsonData)
    } catch (err) {
        console.error(`Error al parsear el archivo JSON: ${err.message}`);
        process.exit(1);
    }

    // Obtener las cabeceras del CSV
    const headers = Object.keys(jsonData[0]);
    console.log(`Cabeceras detectadas: ${headers.join(', ')}`);

    // Convertir cada objeto JSON a una línea CSV
    const csvData = jsonData.map(row => {
        return headers.map(header => JSON.stringify(row[header] || '')).join(',');
    });
    console.log(`${csvData.join('\n')}`);

    // Guardar el resultado en un archivo CSV
    const outputFilePath = path.resolve(__dirname + '/out', 'ex2_productos.csv');
    fs.writeFile(outputFilePath, [headers.join(','), ...csvData].join('\n'), 'utf8', err => {
        if (err) {
            console.error(`Error al escribir el archivo CSV: ${err.message}`);
            process.exit(1);
        }
        console.log(`Archivo CSV guardado correctamente en ${outputFilePath}`);
    });
});