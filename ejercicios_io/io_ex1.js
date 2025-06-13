/**
 * Ejercicios básicos
Ejercicio 1: CSV → JSON (usuarios) Crea un script en Node.js que lea un archivo CSV llamado usuarios.csv y lo convierta en un archivo JSON llamado usuarios.json.
Requisitos:
• El archivo CSV contiene las columnas: nombre, edad, ciudad.
• El archivo JSON debe ser un array de objetos.
• El nombre del archivo de entrada debe indicarse por línea de comandos.
Entrada: usuarios.csv Salida esperada: usuarios.json
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
    console.error('Por favor, proporciona el nombre del archivo CSV como argumento.');
    console.error('Uso: node io_ex1.js --input ./data/usuarios.csv');
    console.error('   o: node io_ex1.js -i ./data/usuarios.csv');
    console.error('   o: node io_ex1.js ./data/usuarios.csv');
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
    const jsonData = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
        });
        return obj;
    });

    // Guardar el resultado en un archivo JSON
    const outputFilePath = path.resolve(__dirname + '/out', 'ex1_usuarios.json');
    fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
            console.error(`Error al escribir el archivo JSON: ${err.message}`);
            process.exit(1);
        }
        console.log(`Archivo JSON guardado correctamente en ${outputFilePath}`);
    });
});