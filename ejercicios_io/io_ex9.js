/**
 * Ejercicio 9: Conversor extensible orientado a clases
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Base class for all format handlers
class FormatoHandler {
  constructor() {
    if (this.constructor === FormatoHandler) {
      throw new Error('FormatoHandler is an abstract class and cannot be instantiated directly');
    }
  }

  read(filePath, options = {}) {
    throw new Error('Method "read" must be implemented by subclasses');
  }

  write(data, filePath, options = {}) {
    throw new Error('Method "write" must be implemented by subclasses');
  }
}

// CSV format handler
class CSVHandler extends FormatoHandler {
  read(filePath, options = {}) {
    const separator = options.separator || ',';
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.trim().split('\n');
    const headers = lines[0].split(separator);
    
    return lines.slice(1).map(line => {
      const values = line.split(separator);
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index] ? values[index].trim() : '';
      });
      return obj;
    });
  }

  write(data, filePath, options = {}) {
    const separator = options.separator || ',';
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Data must be a non-empty array of objects');
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(separator),
      ...data.map(item => headers.map(key => item[key] || '').join(separator))
    ].join('\n');
    
    fs.writeFileSync(filePath, csvContent);
  }
}

// JSON format handler
class JSONHandler extends FormatoHandler {
  read(filePath, options = {}) {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  }

  write(data, filePath, options = {}) {
    const jsonContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonContent);
  }
}

// TXT format handler
class TXTHandler extends FormatoHandler {
  read(filePath, options = {}) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Split the content into lines
    const lines = content.trim().split('\n');

    // Separate the objects based on the empty lines
    const objects = [];
    let currentObject = {};
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.trim() === '') {
        // Empty line - push current object if not empty
        if (Object.keys(currentObject).length > 0) {
          objects.push({...currentObject});
          currentObject = {};
        }
      } else {
        // Process key-value pair
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join(':').trim();
          currentObject[key] = value;
        } else {
          console.warn(`Malformed line (missing key or value): ${line}`);
        }
      }
    }
    
    // Don't forget to add the last object if there was no empty line at the end
    if (Object.keys(currentObject).length > 0) {
      objects.push({...currentObject});
    }
    
    return objects;
  }

  write(data, filePath, options = {}) {
    let txtContent = '';
    
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        Object.entries(item).forEach(([key, value]) => {
          txtContent += `${key}: ${value}\n`;
        });
        txtContent += '\n';
      });
    } else {
      Object.entries(data).forEach(([key, value]) => {
        txtContent += `${key}: ${value}\n`;
      });
    }
    
    fs.writeFileSync(filePath, txtContent);
  }
}

// YAML format handler
class YAMLHandler extends FormatoHandler {
  read(filePath, options = {}) {
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
  }

  write(data, filePath, options = {}) {
    const yamlContent = yaml.dump(data);
    fs.writeFileSync(filePath, yamlContent);
  }
}

// Converter class to manage the conversion process
class Converter {
  constructor() {
    this.handlers = {
      csv: new CSVHandler(),
      json: new JSONHandler(),
      txt: new TXTHandler(),
      yaml: new YAMLHandler(),
      yml: new YAMLHandler()
    };
  }

  convert(inputFile, options) {
    const fromFormat = options.from || path.extname(inputFile).slice(1);
    const toFormat = options.to;
    
    if (!this.handlers[fromFormat]) {
      throw new Error(`Unsupported input format: ${fromFormat}`);
    }
    
    if (!this.handlers[toFormat]) {
      throw new Error(`Unsupported output format: ${toFormat}`);
    }
    
    // Verify input file exists
    if (!fs.existsSync(inputFile)) {
      throw new Error(`Input file does not exist: ${inputFile}`);
    }
    
    console.log(`Reading data from ${inputFile} as ${fromFormat}...`);
    // Read the data
    const data = this.handlers[fromFormat].read(inputFile, { separator: options.sep });
    
    // Verify data was read correctly
    if (!data) {
      throw new Error('No data was read from the input file');
    }
    console.log(`Read data successfully. Data type: ${Array.isArray(data) ? 'Array' : typeof data}, Length: ${Array.isArray(data) ? data.length : Object.keys(data).length}`);
    
    // Generate output filename
    const outputDir = path.join('./out/ex9/');
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      console.log(`Creating output directory: ${outputDir}`);
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFile = options.output || 
      path.join(outputDir, `${path.basename(inputFile, path.extname(inputFile))}.${toFormat}`);
    
    console.log(`Writing data to ${outputFile} as ${toFormat}...`);
    try {
      // Write the data in the target format
      this.handlers[toFormat].write(data, outputFile, { separator: options.sep });
      
      // Verify file was written
      if (fs.existsSync(outputFile)) {
        const stats = fs.statSync(outputFile);
        console.log(`File written successfully. Size: ${stats.size} bytes`);
      } else {
        throw new Error(`File was not created: ${outputFile}`);
      }
      
      console.log(`Conversion successful: ${inputFile} -> ${outputFile}`);
    } catch (error) {
      throw new Error(`Error writing to ${outputFile}: ${error.message}`);
    }
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const inputFile = args[0];
  const options = {};
  
  args.slice(1).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      options[key] = value || true;
    }
  });
  
  return { inputFile, options };
}

// Main function
function main() {
  try {
    const { inputFile, options } = parseArgs();
    
    if (!inputFile) {
      console.error('Input file is required');
      console.log('Usage: node conversor.js <inputFile> --from=<format> --to=<format> [--sep=<separator>]');
      process.exit(1);
    }
    
    if (!options.to) {
      console.error('Output format (--to) is required');
      process.exit(1);
    }
    
    const converter = new Converter();
    converter.convert(inputFile, options);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Execute the main function
main();

