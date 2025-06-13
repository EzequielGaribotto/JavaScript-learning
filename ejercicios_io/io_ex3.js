/**
 * Ejercicio 3: Conversión con separador personalizado (;) Convierte el archivo clientes.csv (separado por ;) a JSON.
Requisitos:
•
El separador (;) debe poder especificarse como argumento (ej: --sep=";").
•
El resultado debe guardarse en clientes.json.
Entrada: clientes.csv Salida esperada: clientes.json
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
{
    string: ['sep'],
    alias: { sep: 's' },
    default: { sep: ',' }
}
);

const separator = argv.sep || ','; // Usar el separador proporcionado o por defecto ','

// Obtener el nombre del archivo CSV desde los argumentos
const inputFile = argv.input || argv._[0];
if (!inputFile) {
    console.error('Por favor, proporciona el nombre del archivo CSV como argumento y el separador.');
    console.error('Uso: node io_ex3.js --input ./data/clientes.csv --sep=";"');
    console.error('   o: node io_ex3.js -i ./data/clientes.csv -s ";"');
    console.error('   o: node io_ex3.js ./data/clientes.csv ";"');
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
    const headers = lines[0].split(separator);

    // Convertir cada línea a un objeto JSON
    const jsonData = lines.slice(1).map(line => {
        const values = line.split(separator);
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
        });
        return obj;
    });

    // Guardar el resultado en un archivo JSON
    const outputFilePath = path.resolve(__dirname + '/out', 'ex3_clientes.json');
    fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
            console.error(`Error al escribir el archivo JSON: ${err.message}`);
            process.exit(1);
        }
        console.log(`Archivo JSON guardado correctamente en ${outputFilePath}`);
    });
});