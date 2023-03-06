import { eliminarCita, editarCita, DB } from '../funciones.js';
import { listadoCitas, heading } from '../selectores.js';

class UI {
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase css en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar al dom
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        }, 4000);
    }

    imprimirCitas() {
        this.limpiarHtml();

        //leemos el contenido de la base de datos
        const objectStore = DB.transaction('citasModulo').objectStore('citasModulo');

        //accedemos a los valores que podemos acceder, esto para poder mostrar el mensaje del heading
        const total = objectStore.count();

        //por razones del scope tendremos que asignar la funcion textHeading a una variable
        const mostrarHeading = this.textoHeading;

        //para acceder unicamente a la cantidad de datos que contiene la base de datos
        total.onsuccess = function () {
            mostrarHeading(total.result);
        }


        //Aquí accederemos a las filas de le base de datos y sera con openCursor
        objectStore.openCursor().onsuccess = function(e) {
            console.log(e.target.result);
            //trae los valores que hay en la base de datos
            const cursor = e.target.result;

            //si existen valores en la base de datos entonces mostraremos en la pantalla
            if (cursor) {
                const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;
                const divCita = document.createElement('div');
                divCita.classList.add('cita', 'p-3');
                divCita.dataset.id = id;

                //Scripting de los datos de la cita
                const mascotaParrafo = document.createElement('h2');
                mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
                mascotaParrafo.textContent = mascota;

                const propietarioParrafo = document.createElement('p');
                propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

                const telefonoParrafo = document.createElement('p');
                telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

                const fechaParrafo = document.createElement('p');
                fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

                const horaParrafo = document.createElement('p');
                horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

                const sintomasParrafo = document.createElement('p');
                sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

                //Btn eliminar cita
                const btnEliminar = document.createElement('button');
                btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
                btnEliminar.textContent = 'Eliminar cita';
                btnEliminar.onclick = () => eliminarCita(id);

                //Editar la cita
                const btnEditar = document.createElement('button');
                const cita = cursor.value;
                btnEditar.onclick = () => cargarEdicion(cita);
                btnEditar.classList.add('btn', 'btn-info');
                btnEditar.textContent = 'Editar cita';
                btnEditar.onclick = () => editarCita(cita);

                //Agregar los parrafos al divCita
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);
                divCita.appendChild(btnEliminar);
                divCita.appendChild(btnEditar);

                //Agregar las citas al Html
                listadoCitas.appendChild(divCita);

                //Para avanzar a la siguiente fila y de esta manera mostrar todas las filas
                cursor.continue();

            }
        }
    }

    textoHeading(resultado) {
        if (resultado > 0) {
            heading.textContent = 'Administra tus Citas '
        } else {
            heading.textContent = 'No hay Citas, comienza creando una'
        }
    }

    limpiarHtml() {
        while (listadoCitas.firstChild) {
            listadoCitas.removeChild(listadoCitas.firstChild);
        }
    }
}

export default UI;