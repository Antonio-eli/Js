import Citas from '../js/classes/Citas.js';
import UI from '../js/classes/UI.js';
import { inputMascota, inputPropietario, inputTelefono, inputFecha, inputHora, inputSintomas, formulario } from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();
let editando;

const objCita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Funciones
export function datosCita(e) {
    objCita[e.target.name] = e.target.value;
    console.log(objCita);
}

//Valida y agrega una cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault();

    //Extrae la informacion del objeto de citas
    const { mascota, propietario, telefono, fecha, hora, sintomas } = objCita;

    //Valida
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if (editando) {
        ui.imprimirAlerta('La cita se edito correctamente');

        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...objCita })

        //Cambiar el texto del button
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        editando = false;
    } else {
        //Generar un id unico
        objCita.id = Date.now();

        //Creando una nueva cita
        administrarCitas.agregarCita({...objCita });

        //Mensaje de agregado correctamente
        ui.imprimirAlerta('La cita se agrego correctamente');
    }

    //Reiniciar el objeto para la validacion
    reiniciarObjeto();
    //Reiniciar el formulario
    formulario.reset();

    //Mostrar citas en el Html
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    objCita.mascota = '';
    objCita.propietario = '';
    objCita.telefono = '';
    objCita.fecha = '';
    objCita.hora = '';
    objCita.sintomas = '';
}

export function eliminarCita(id) {
    //Eliminar la cita
    administrarCitas.eliminarCita(id);
    //Mostrar un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

export function editarCita(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar los inputs
    inputMascota.value = mascota;
    inputPropietario.value = propietario;
    inputTelefono.value = telefono;
    inputFecha.value = fecha;
    inputHora.value = hora;
    inputSintomas.value = sintomas;

    //Llenar el objeto
    objCita.mascota = mascota;
    objCita.propietario = propietario;
    objCita.telefono = telefono;
    objCita.fecha = fecha;
    objCita.hora = hora;
    objCita.sintomas = sintomas;
    objCita.id = id;

    //Cambiar el texto del button
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
    editando = true;
}