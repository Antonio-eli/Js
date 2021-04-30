//* Importación de módulos.

//* Declaración de variables.
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//* Eventos.
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}

//* Clases.
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        // console.log(gasto);
        this.gastos = [...this.gastos, gasto];
        // console.log(this.gastos);
        this.calcularRestante();
    }
    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        // console.log(gastado);
        this.restante = this.presupuesto - gastado;
        // console.log(this.restante);
    }
    eliminarGasto(id) {
        // console.log('Desde la clase');
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        // console.log(this.gastos);
        this.calcularRestante();
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        // Extrayendo los valores.
        const { presupuesto, restante } = cantidad;

        // Agregar al HTML.
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        // Crear el div.
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error.
        divMensaje.textContent = mensaje;

        // Insertar en el HTML.
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar el HTML.
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
    agregarGastoListado(gastos) {
        this.limpiarHTML(); //Elimina el HTML previo.
        // console.log(gastos);
        gastos.forEach((gasto) => {
            const { cantidad, nombre, id } = gasto;

            // Crear un li.
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            // nuevoGasto.setAttribute('data-id', id); Forma desactualizada.
            nuevoGasto.dataset.id = id;

            // Agregar al HTML.
            // !No es recomendable utilizar innerHTML.
            nuevoGasto.innerHTML = `${nombre} <span class='badge badge-primary badge-pill'>$ ${cantidad}</span>`

            // Botón para borrar el gasto.
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            // Agregar al HTML.
            gastoListado.appendChild(nuevoGasto);
        });
    }
    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }
    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');

        // Comprobar el 25%
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        } else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        // Si el total es 0 o menor
        if (restante <= 0) {
            ui.imprimirAlerta('el presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
            // este es el código que agregue para dicho error //
        } else if (restante > 0) {
            formulario.querySelector('button[type="submit"]').disabled = false;
        };
    }
}

// Instanciar
const ui = new UI();

let presupuesto;

//* Declaración de funciones.
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
    console.log(Number(presupuestoUsuario));

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    // Presupuesto válido.
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);
    ui.insertarPresupuesto(presupuesto);
}

// Añade los gastos.
function agregarGasto(e) {
    e.preventDefault();

    // Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios.', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida.', 'error');
        return;
    }

    // console.log('Agregando gasto...');
    // Generar un objeto con el gasto.
    const gasto = { nombre, cantidad, id: Date.now() }

    // Añade un nuevo gasto.
    presupuesto.nuevoGasto(gasto);
    // console.log(gasto);

    // Mensaje de todo bien.
    ui.imprimirAlerta('Gasto agregado correctamente');

    // Imprimir los gastos.
    const { gastos, restante } = presupuesto;
    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    // Reinicia el formulario.
    formulario.reset();
}

function eliminarGasto(id) {
    // Elimina el objeto.
    presupuesto.eliminarGasto(id);

    // Elimina los gastos del HTML.
    const { gastos, restante } = presupuesto;

    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
}


//* Ejecución de código.