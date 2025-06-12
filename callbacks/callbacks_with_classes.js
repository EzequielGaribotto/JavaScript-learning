/**
 * Implementa una clase EventManager que permita gestionar un sistema de eventos de
manera flexible. Esta clase deberá ofrecer los siguientes métodos:
• .suscribir(evento, callback): registra una función suscriptora para un evento
concreto (por ejemplo, "mensaje" o "oferta").
• .emitir(evento, datos): emite un evento y ejecuta todas las funciones suscritas,
pasándoles los datos correspondientes.
• .cancelar(evento, callback): elimina una suscripción específica para un evento
determinado.
Cada suscripción debe estar asociada a un nombre de evento (string), lo que permite tener
distintos tipos de eventos con diferentes funciones suscritas.
 */

class EventManager {
    constructor() {
        this.suscripciones = {}
    }

    suscribir(evento, callback) {
        if (this.suscripciones.hasOwnProperty(evento)) {
            this.suscripciones[evento].push(callback);
        } else {
            this.suscripciones[evento] = [callback]
        }
    }

    emitir(evento, datos) {
        if (this.suscripciones.hasOwnProperty(evento)) {
            this.suscripciones[evento].forEach(fn => {
                fn(datos)
            })
        } else {
            console.log(`No se ha suscrito a ningun evento ${evento}`)
        }
    }
    
    cancelar(evento, callback) {
        if (this.suscripciones.hasOwnProperty(evento)) {
            this.suscripciones[evento] = this.suscripciones[evento].filter(fn => {
                return fn !== callback
            });
            // Si ya no quedan callbacks para ese evento, puedes eliminar la clave:
            if (this.suscripciones[evento].length === 0) {
                delete this.suscripciones[evento];
            }
        }
    }
}

/**
 * Además, crea una clase Usuario que represente a un usuario del sistema. Esta clase deberá
incluir:
• Una propiedad nombre (string), que identifica al usuario.
• Una propiedad numeroDeMensajesRecibidos (número), que lleve la cuenta de los
mensajes que ha recibido
• Un método recibirMensaje(mensaje) que actualice la cuenta de mensajes y muestre
el contenido recibido de forma personalizada.
Finalmente, muestra cómo varias instancias de Usuario pueden suscribirse a un evento
llamado "mensaje" usando sus propios métodos como callbacks, y cómo EventManager se
encarga de emitir los mensajes y gestionar las suscripciones.
 */

class Usuario {
    constructor(nombre, numeroDeMensajesRecibidos) {
        this.nombre = nombre
        this.numeroDeMensajesRecibidos = numeroDeMensajesRecibidos
    }

    recibirMensaje(mensaje) {
        this.numeroDeMensajesRecibidos += 1
        console.log(`Mensaje nuevo para ${this.nombre}: ${mensaje}`)
    }
}

const gestorEventos = new EventManager();
const usuario1 = new Usuario("Ana", 0);
const usuario2 = new Usuario("Luis", 0);
let usuarios = [usuario1, usuario2];
gestorEventos.suscribir("mensaje", usuario1.recibirMensaje.bind(usuario1));

gestorEventos.emitir("mensaje", "¡Hola a todos!");

gestorEventos.suscribir("mensaje", usuario2.recibirMensaje.bind(usuario2));
gestorEventos.emitir("mensaje", "Segundo mensaje para todos.");

usuarios.forEach((usuario) => {
        console.log(`${usuario.nombre} ha recibido ${usuario.numeroDeMensajesRecibidos} mensajes`)
        gestorEventos.cancelar("mensaje", usuario.recibirMensaje.bind(usuario))
    }
)