/**

Ejercicio 8: Conversor de formatos flexible
Crear una herramienta en Node.js que reciba por línea de comandos:
• El archivo de entrada
• El formato de entrada (--from)
• El formato de salida (--to)
• (Opcional) el separador si es CSV (--sep)
Formatos soportados:
• csv
• json
Ejemplo de uso:
• node conversor.js datos.csv --from=csv --to=json --sep=";"
• node conversor.js productos.json --from=json --to=csv
Comportamiento esperado:
• Detecta si el archivo existe.
• Parsea según el formato de entrada.
• Convierte al formato de salida.
• Guarda un nuevo archivo con el mismo nombre base y la nueva extensión (datos.json, productos.csv, etc.).
• Muestra errores claros si el formato no está soportado o el archivo es incorrecto.
 */



const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Obtener los argumentos usando minimist
const argv = minimist(process.argv.slice(2), 
{
    string: ['input'],
    alias: { input: 'i' },
    default: { input: null }
},
{
    string: ['sep'],
    alias: { sep: 's' },
    default: { sep: ',' }
},
{
    string: ['from', 'to'],
    alias: { from: 'f', to: 't' },
    default: { from: 'csv', to: 'json' }
}
);

const from = argv.from || 'csv'; // Formato de entrada
const to = argv.to || 'json'; // Formato de salida


// Obtener el nombre del archivo CSV desde los argumentos
const inputFile = argv.input || argv._[0];
if (!inputFile) {
    console.error('Por favor, proporciona el nombre del archivo como argumento.');
    console.error('Uso: node io_ex09.js --input ./data/usuarios.json');
    console.error('   o: node io_ex09.js -i ./data/usuarios.json');
    console.error('   o: node io_ex09.js ./data/usuarios.json --from=csv --to=json');
    process.exit(1);
}

// Verificar que el archivo existe
const inputFilePath = path.resolve(__dirname, inputFile);
if (!fs.existsSync(inputFilePath)) {
    console.error(`El archivo ${inputFile} no existe.`);
    process.exit(1);
}

if (from === 'csv' && to === 'json') {
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
        const outputFilePath = path.resolve(__dirname + '/out', path.basename(inputFile, path.extname(inputFile)) + '.json');
        fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
            if (err) {
                console.error(`Error al escribir el archivo JSON: ${err.message}`);
                process.exit(1);
            }
            console.log(`Archivo JSON guardado correctamente en ${outputFilePath}`);
        });
    });
} else if (from === 'json' && to === 'csv') {
    // Leer el archivo JSON
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error al leer el archivo: ${err.message}`);
            process.exit(1);
        }

        // Parsear el contenido JSON
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (err) {
            console.error(`Error al parsear el archivo JSON: ${err.message}`);
            process.exit(1);
        }

        // Obtener las cabeceras del CSV
        const headers = Object.keys(jsonData[0]);
        
        // Convertir cada objeto JSON a una línea CSV
        const csvData = jsonData.map(row => {
            return headers.map(header => JSON.stringify(row[header] || '')).join(argv.sep);
        });

        // Guardar el resultado en un archivo CSV
        const outputFilePath = path.resolve(__dirname + '/out', path.basename(inputFile, path.extname(inputFile)) + '.csv');
        fs.writeFile(outputFilePath, [headers.join(argv.sep), ...csvData].join('\n'), 'utf8', err => {
            if (err) {
                console.error(`Error al escribir el archivo CSV: ${err.message}`);
                process.exit(1);
            }
            console.log(`Archivo convertido y guardado en: ${outputFilePath}`);
        });
    });
}
