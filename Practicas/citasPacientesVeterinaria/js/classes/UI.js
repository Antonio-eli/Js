import { eliminarCita, editarCita } from '../funciones.js';
import { listadoCitas } from '../selectores.js';

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

    imprimirCitas({ citas }) {
        this.limpiarHtml();
        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
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
        });
    }

    limpiarHtml() {
        while (listadoCitas.firstChild) {
            listadoCitas.removeChild(listadoCitas.firstChild);
        }
    }
}

export default UI;