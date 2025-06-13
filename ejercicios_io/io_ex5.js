/**
 * 
Ejercicio 5: CSV con errores
Convierte mal_format.csv a JSON, ignorando o reportando las líneas con errores.
Requisitos:
• Muestra por consola un aviso por cada línea mal formateada (vacía, columnas incorrectas,
etc.).
• Las líneas válidas deben guardarse en limpio.json.
Entrada: mal_formato.csv
Salida esperada: limpio.json
Líneas con errores deben ser identificadas y omitidas.
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
    console.error('Uso: node io_ex5.js --input ./data/mal_formato.csv');
    console.error('   o: node io_ex5.js -i ./data/mal_formato.csv');
    console.error('   o: node io_ex5.js ./data/mal_formato.csv');
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
    const filteredLines = lines.slice(1).filter(line => {
        const values = line.split(',');
        if (values.length !== headers.length) {
            console.warn(`Línea mal formateada (columnas incorrectas): ${line}`);
            return false; // Ignorar líneas con columnas incorrectas
        }
        if (line.trim() === '') {
            console.warn('Línea vacía encontrada y omitida.');
            return false; // Ignorar líneas vacías
        }
        // Verificar valores vacíos
        for (const value of values) {
            if (value.trim() === '') {
                console.warn(`Valor vacío encontrado en la línea: ${line}`);
                return false;
            }
        }

        const edadIndex = headers.findIndex(h => h === 'edad');
        if (edadIndex !== -1 && !/^\d+$/.test(values[edadIndex].trim())) {
            console.warn(`Valor de edad no numérico en la línea: ${line}`);
            return false;
        }
        return true; // Mantener líneas válidas
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
    const outputFilePath = path.resolve(__dirname + '/out', 'ex5_limpio.json');
    fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
            console.error(`Error al escribir el archivo JSON: ${err.message}`);
            process.exit(1);
        }
        console.log(`Archivo JSON guardado correctamente en ${outputFilePath}`);
    });
});