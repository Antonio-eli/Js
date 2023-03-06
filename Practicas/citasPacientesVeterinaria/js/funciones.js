import Citas from '../js/classes/Citas.js';
import UI from '../js/classes/UI.js';
import { inputMascota, inputPropietario, inputTelefono, inputFecha, inputHora, inputSintomas, formulario } from './selectores.js';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let editando;

export let DB;

const objCita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function baseDatos() {

    window.onload = () => {
        crearDB();
    }
}

//Funciones
function crearDB() {
    //crear la base de datos 1.0
    const crearDB = window.indexedDB.open('citasModulo', 1);

    //si hay un error al crear la base de datos
    crearDB.onerror = function() {
        console.log('Hay un error');

    }

    //si se crea correctamente la base de datos
    crearDB.onsuccess = function() {
        console.log('Base de datos creada con éxito');
        //instanciamos la base de datos creada a DB
        DB = crearDB.result;

        //Mostrar las citas al cargar (Cuando indexDB ya este listo)
        ui.imprimirCitas();
    }

    //definimos las columnas
    crearDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('citasModulo', {
            keyPath: 'id',
            autoIncrement: true
        });

        //definimos todas las columnas
        objectStore.createIndex('mascota', 'mascota', { unique: false });
        objectStore.createIndex('propietario', 'propietario', { unique: false });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('fecha', 'fecha', { unique: false });
        objectStore.createIndex('hora', 'hora', { unique: false });
        objectStore.createIndex('sintomas', 'sintomas', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });

        console.log('Db creada y lista');

    }

}

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
        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...objCita })

        //Insertar registro en IndexDB
        const transaction = DB.transaction(['citasModulo'], 'readwrite');
        //Habilitar el objectStore
        const objectStore = transaction.objectStore('citasModulo');

        //insertamos todos los objectos creados al indexDB
        objectStore.put(objCita);

        //Si se completo la accion de agregar entonces
        transaction.oncomplete = () => {
            console.log('La cita se edito correctamente');
            //Mensaje de agregado correctamente
            ui.imprimirAlerta('La cita se edito correctamente');
            //Cambiar el texto del button
            formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
            editando = false;
        }

        transaction.onerror = () => {
            console.log('Hubo un error');
        }
    } else {
        //Generar un id unico
        objCita.id = Date.now();

        //Creando una nueva cita
        administrarCitas.agregarCita({...objCita });

        //Insertar registro en IndexDB
        const transaction = DB.transaction(['citasModulo'], 'readwrite');

        //Habilitar el objectStore
        const objectStore = transaction.objectStore('citasModulo');

        //insertamos todos los objectos creados al indexDB
        objectStore.add(objCita);

        //Si se completo la accion de agregar entonces
        transaction.oncomplete = function() {
            console.log('cita agregada');
            //Mensaje de agregado correctamente
            ui.imprimirAlerta('La cita se agrego correctamente');
        }

    }

    //Reiniciar el objeto para la validacion
    reiniciarObjeto();
    //Reiniciar el formulario
    formulario.reset();

    //Mostrar citas en el Html
    ui.imprimirCitas();
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
    const transaction = DB.transaction(['citasModulo'], 'readwrite');
    const objectStore = transaction.objectStore('citasModulo');
    objectStore.delete(id);

    transaction.oncomplete = () => {
        //Mostrar un mensaje
        ui.imprimirAlerta(`La cita ${id} se elimino correctamente`);
        //Refrescar las citas
        ui.imprimirCitas();

    }

    transaction.onerror = () => {
        console.log('Hubo un error');
    }
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