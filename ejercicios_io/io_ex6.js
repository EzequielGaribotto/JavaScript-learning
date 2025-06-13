/**
Ejercicio 6: Conversión de TXT estructurado a JSON
Convertir el contenido de datos.txt en un archivo datos.json con una lista de objetos
Requisitos:
• Identificar los registros
• Los registros válidos deben guardarse en datos.json
Entrada: datos.txt
Salida esperada: datos.json
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
    console.error('Por favor, proporciona el nombre del archivo TXT como argumento.');
    console.error('Uso: node io_ex6.js --input ./data/datos.txt');
    console.error('   o: node io_ex6.js -i ./data/datos.txt');
    console.error('   o: node io_ex6.js ./data/datos.txt');
    process.exit(1);
}

// Verificar que el archivo existe
const inputFilePath = path.resolve(__dirname, inputFile);
if (!fs.existsSync(inputFilePath)) {
    console.error(`El archivo ${inputFile} no existe.`);
    process.exit(1);
}


// Leer el archivo TXT
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error al leer el archivo: ${err.message}`);
        process.exit(1);
    }

    // Dividir el contenido del CSV en líneas
    const lines = data.trim().split('\n');

    // Separate the objects based on the empty lines
    const objects = [];
    let currentObject = {};
    lines.forEach((line, idx) => {
        if (line.trim() === '' || idx === lines.length - 1) {
            if (Object.keys(currentObject).length > 0) {
                objects.push(currentObject);
                currentObject = {};
            }
        } else {
            const [key, value] = line.split(':').map(part => part.trim());
            if (key && value) {
                currentObject[key] = value;
            } else {
                console.warn(`Línea mal formateada (clave o valor faltante): ${line}`);
            }
        }
    });

    // Guardar el resultado en un archivo JSON
    const outputFilePath = path.resolve(__dirname + '/out', 'ex6_datos.json');
    fs.writeFile(outputFilePath, JSON.stringify(objects, null, 2), 'utf8', err => {
        if (err) {
            console.error(`Error al escribir el archivo JSON: ${err.message}`);
            process.exit(1);
        }
        console.log(`Archivo JSON guardado correctamente en ${outputFilePath}`);
    });
});