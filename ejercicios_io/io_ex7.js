/**
 * Ejercicio 7: Conversión de JSON a TXT tipo clave – valor
Convierte el archivo usuarios.json a usuarios.txt (TXT estructurado)
Requisitos del script:
• Leer el archivo JSON desde línea de comandos.
• Convertir cada objeto en un bloque de texto clave: valor.
• Separar los bloques con una línea en blanco.
• Guardar el resultado en usuarios.txt.
Entrada: usuarios.json Salida esperada: usuarios.txt
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
    console.error('Uso: node io_ex7.js --input ./data/usuarios.json');
    console.error('   o: node io_ex7.js -i ./data/usuarios.json');
    console.error('   o: node io_ex7.js ./data/usuarios.json');
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

    // Parsear el contenido JSON
    let jsonData;
    try {
        jsonData = JSON.parse(data); // crates an array of objects
        console.log(jsonData)
    } catch (err) {
        console.error(`Error al parsear el archivo JSON: ${err.message}`);
        process.exit(1);
    }

    txtData = jsonData.map(obj => {
        return Object.entries(obj)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    });

    // Guardar el resultado en un archivo JSON
    const outputFilePath = path.resolve(__dirname + '/out', 'ex7_usuarios.txt');
    fs.writeFile(outputFilePath, txtData.join('\n\n'), 'utf8', err => {
        if (err) {
            console.error(`Error al escribir el archivo TXT: ${err.message}`);
            process.exit(1);
        }
        console.log(`Archivo TXT guardado correctamente en ${outputFilePath}`);
    });
});