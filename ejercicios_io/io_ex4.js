/**
Ejercicio 4: Filtrado durante la conversión 
Convierte edades.csv a mayores.json, filtrando solo las personas de 18 años o más.
Requisitos:
• El archivo de entrada tiene columnas: nombre, edad.
• El JSON de salida debe incluir solo las personas mayores de edad.
Entrada: edades.csv
Salida esperada: mayores.json
 */


const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Obtener los argumentos usando minimist
const argv = minimist(process.argv.slice(2), {
    string: ['input'],
    alias: { input: 'i' },
    default: { input: null }
},
);


// Obtener el nombre del archivo CSV desde los argumentos
const inputFile = argv.input || argv._[0];
if (!inputFile) {
    console.error('Por favor, proporciona el nombre del archivo CSV como argumento.');
    console.error('Uso: node io_ex3.js --input ./data/edades.csv');
    console.error('   o: node io_ex3.js -i ./data/edades.csv');
    console.error('   o: node io_ex3.js ./data/edades.csv');
    process.exit(1);
}

// Verificar que el archivo existe
const inputFilePath = path.resolve(__dirname, inputFile);
if (!fs.existsSync(inputFilePath)) {
    console.error(`El archivo ${inputFile} no existe.`);
    process.exit(1);
}


// Leer el archivo CSV
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error al leer el archivo: ${err.message}`);
        process.exit(1);
    }

    // Dividir el contenido del CSV en líneas
    const lines = data.trim().split('\n');
    
    // Obtener las cabeceras del CSV
    const headers = lines[0].split(',');

    // Convertir cada línea a un objeto JSON
    const filteredLines = lines.filter(line => {
        const values = line.split(',');
        const edadIndex = headers.indexOf('edad');
        if (edadIndex === -1) {
            console.error('La columna "edad" no se encuentra en el archivo CSV.');
            process.exit(1);
        }
        const edad = parseInt(values[edadIndex].trim(), 10);
        return edad >= 18; // Filtrar solo mayores de edad
    });
    const jsonData = filteredLines.map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
        });
        return obj;
    });

    // Guardar el resultado en un archivo JSON
    const outputFilePath = path.resolve(__dirname + '/out', 'ex4_mayores.json');
    fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
            console.error(`Error al escribir el archivo JSON: ${err.message}`);
            process.exit(1);
        }
        console.log(`Archivo JSON guardado correctamente en ${outputFilePath}`);
    });
});