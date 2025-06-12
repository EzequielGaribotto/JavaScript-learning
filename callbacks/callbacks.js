/**
 * Ejercicios sobre Callbacks
1. Crea una función registrarUsuario(nombre, callback) que valide si el nombre tiene al
menos 3 caracteres.
Si no es válido, el callback debe recibir un mensaje de error.
Si es válido, genera un ID aleatorio y pasa al callback un mensaje como:
“ Usuario Laura registrado con ID 438”
 */

function registrarUsuario(nombre, callback) {
    const id = Math.floor(Math.random() * 900) + 100;
    if (nombre.length >= 3) {
        callback(null, `Usuario ${nombre} registrado con ID ${id}`);
    } else {
        callback("Error: El nombre", null)
    }
}

registrarUsuario("Laura", (error, mensaje) => {
    if (error) {
        console.log('\x1b[31m%s\x1b[0m', error);
    } else {
        console.log('\x1b[32m%s\x1b[0m', mensaje);
    }
});
/**
 * 2. Crea la función procesarPedido(pedido, callback) que reciba un objeto como:
{ producto: "Pizza", cantidad: 3 }
• Si falta algún dato o la cantidad es menor o igual a 0, pasa al callback un mensaje de
error.
• Si todo está correcto, simula un tiempo de procesamiento (cantidad * 500ms) con
setTimeout.
• Al terminar, pasa al callback un mensaje como:
" Tu pedido de 3 Pizza(s) ha sido procesado en 1500ms"
 */

function procesarPedido(pedido, callback) {
    if (
        !pedido ||
        typeof pedido.producto !== "string" ||
        typeof pedido.cantidad !== "number" ||
        pedido.cantidad <= 0
    ) {
        callback("Error: Datos de pedido inválidos");
        return;
    }
    const tiempo = pedido.cantidad * 500;
    setTimeout(() => {
        callback(
            null,
            `Tu pedido de ${pedido.cantidad} ${pedido.producto}(s) ha sido procesado en ${tiempo}ms`
        );
    }, tiempo);
}

procesarPedido({ producto: "Pizza", cantidad: 3 }, (error = null, mensaje = null) => {
    if (error) {
        console.log('\x1b[31m%s\x1b[0m', error); // rojo
    } else {
        console.log('\x1b[32m%s\x1b[0m', mensaje); // verde
    }
});

/**
 * 3. Crea una función realizarOperacion(a, b, callback) que:
• Valide que a y b sean números.
• Aplique la operación matemática definida en el callback (suma, resta, multiplicación,
etc.).
• Muestra el resultado por consola o un mensaje de error.
Ejemplo de uso:
realizarOperacion(10, 5, (x, y) => x * y); // Resultado: 50
 */

function realizarOperacion(a, b, callback) {
    const resultado = callback(a, b);
    console.log('\x1b[32m%s\x1b[0m', `Resultado: ${resultado}`);
}

// Ejemplo de uso:
realizarOperacion(10, 5, (x, y) => x * y);

/**
 * 4. Simula una operación asincrónica usando setTimeout con un callback que imprima
'Operación completada' después de 2 segundos.
 */

function operacionAsincrona(callback) {
    setTimeout(() => {
        callback('Operación completada')
    }, 2000)
}

/**
 * 5. Crea una función validarEmail(email, onSuccess, onError) que:
• Verifique si el email contiene "@" y ".".
• Si es válido, llama al callback “onSuccess” con el dominio del email.
• Si no es válido, llama al callback “onError”.

 */

function validarEmail(email, onSuccess, onError) {
    if (email.includes("@") && email.includes(".")) {
        const partes = email.split("@");
        if (partes.length === 2 && partes[1].includes(".")) {
            onSuccess(partes[1]); // dominio
            return;
        }
    }
    onError();
}

// Ejemplo de uso:
validarEmail(
    "usuario@dominio.com",
    dominio => console.log('\x1b[32m%s\x1b[0m', `Dominio válido: ${dominio}`),
    () => console.log('\x1b[31m%s\x1b[0m', "Email no válido")
);

validarEmail(
    "usuario_invalido.com",
    dominio => console.log('\x1b[32m%s\x1b[0m', `Dominio válido: ${dominio}`),
    () => console.log('\x1b[31m%s\x1b[0m', "Email no válido")
);

/**
 * 6. Crea tres funciones: lavarPlatos, secarPlatos y guardarPlatos. Cada una recibe un callback
que debe ejecutarse al terminar su tarea (simula con setTimeout).
 */

function lavarPlatos(secarPlatos) {
    console.log("Lavando platos...")
    setTimeout(() => {
        secarPlatos()
    }, 500)
}

function secarPlatos(guardarPlatos) {
    console.log("Secando platos...")
    setTimeout(() => {
        guardarPlatos()
    }, 500)
}

function guardarPlatos(lavarPlatos) {
    console.log("Guardando platos...")
    setTimeout(() => {
        lavarPlatos()
    }, 500)
}

/**
 * 7. Crea una función intentar(fn, veces) que intente ejecutar una función fn. Si la función
lanza un error, vuelve a intentarlo hasta veces veces. Cuando tenga éxito, imprime el
resultado. Si falla siempre, imprime "Error final". La función fn tiene que tener un 70% de
posibilidades de fallar.
 */

function intentar(fn, veces) {
    for (let i = 0; i < veces; i++) {
        try {
            const resultado = fn();
            console.log('\x1b[32m%s\x1b[0m', `Resultado: ${resultado}`);
            return;
        } catch (error) {
            // Intenta de nuevo
        }
    }
    console.log('\x1b[31m%s\x1b[0m', "Error final");
}


function funcionAleatoria() {
    if (Math.random() < 0.7) {
        throw new Error("Falló")
    }
    return "¡Éxito"
}

intentar(funcionAleatoria, 5)