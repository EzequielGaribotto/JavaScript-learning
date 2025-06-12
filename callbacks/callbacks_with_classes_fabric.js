/**
 * Implementa una clase Fabrica que permita gestionar un sistema de procesamiento de
productos de manera flexible. Esta clase deberá ofrecer los siguientes métodos:
• .registrarPaso(callback): añade una función de procesamiento (paso) a una lista de
pasos. Cada paso será una función que recibe un producto, lo modifica y lo devuelve.
• .procesarProducto(producto): ejecuta, en orden, todos los pasos registrados sobre el
objeto producto, aplicando cada función secuencialmente.
• .limpiarPasos(): elimina todos los pasos registrados hasta el momento.
Cada paso debe modificar el producto y registrar internamente que ese paso ha sido
ejecutado.
Además, crea una clase Producto que represente un objeto que pasa por la fábrica. Esta
clase deberá incluir:
• Una propiedad nombre (string), que identifica al producto.
• Una propiedad historial (array de strings), que almacena los nombres de los pasos
aplicados.
• Un método marcarPaso(nombrePaso) que añada el nombre del paso al historial.
Finalmente, demuestra cómo varias funciones pueden registrarse como pasos de
procesamiento, cómo diferentes productos pueden ser procesados por la fábrica, y cómo el
historial de cada producto refleja los pasos aplicados en orden.
 */

class Fabrica {
    constructor() {
        this.pasos = [];
    }
    registrarPaso(callback) {
        this.pasos.push(callback);
    }

    procesarProducto(producto) {
        this.pasos.forEach(paso => {
            paso(producto);
        })
    }

    limpiarPasos() {
        this.pasos = [];
    }
}


class Producto {
    constructor(nombre = "nombreDelProducto", historial = []) {
        this.nombre = nombre
        this.historial = historial
    }

    marcarPaso(nombrePaso) {
        this.historial.push(nombrePaso)
    }
}


function cortar(producto) {
    producto.marcarPaso("Corte");
    producto.cortado = true;
    return producto;
}

function pintar(producto) {
    producto.marcarPaso("Pintura");
    producto.pintado = true;
    return producto;
}

function embalar(producto) {
    producto.marcarPaso("Embalaje");
    producto.embalado = true;
    return producto;
}

const fabrica = new Fabrica();
fabrica.registrarPaso(cortar);
fabrica.registrarPaso(pintar);
fabrica.registrarPaso(embalar);

const productos = [new Producto("Mesa"), new Producto("Silla")]

productos.forEach(producto => {
    fabrica.procesarProducto(producto)
})

productos.forEach(producto => {
    console.log(producto.nombre, producto.historial);
})

fabrica.limpiarPasos();