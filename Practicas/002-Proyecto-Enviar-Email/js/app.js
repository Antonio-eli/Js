//* Importación de módulos.
//* Declaración de variables.
const btnEnviar = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
// Variables para campos.
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;



eventListener();

function eventListener() {
    // Cuando la App arranca.
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario.
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Reinicia el formulario.
    resetBtn.addEventListener('click', resetearFormulario);

    // Enivar Email
    formulario.addEventListener('submit', enviarEmail);

}

//* Declaración de funciones.
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario.
function validarFormulario(e) {
    // console.log(e.target.type);
    if (e.target.value.length > 0) {
        // console.log('si hay algo');
        //Todo: Elimina los errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        // e.target.style.borderBottomColor = 'red';
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
    if (e.target.type === 'email') {
        // const resultado = e.target.value.indexOf('@');
        if (er.test(e.target.value)) {
            //Todo: Elimina los errores
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'bg-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

// Enviar email
function enviarEmail(e) {
    e.preventDefault();


    // Mostrar el spiner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Déspues de 3 segundos ocultar el spinner y mostrar el mensaje.
    setTimeout(() => {
        spinner.style.display = 'none';

        // Mensaje que dice se envió correctamente.
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Inserta el parrafo antes del spinner.
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            parrafo.remove(); //Elimina el mensaje de exito.
            resetearFormulario();
        }, 5000);
    }), 3000;
}

// Reseteo del formulario.
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
    eliminarColores(email, asunto, mensaje);

}

function eliminarColores(correo, asunto, mensaje) {
    const clases = 'border-green-500'; //Se elimina los verdes al hacer exitoso el correo
    const clases2 = 'border-red-500'; //Se elimina los rojos al presionar cualquier campo, salirse, y darle al reset, se elimina los rojos
    correo.classList.remove(clases, clases2);
    asunto.classList.remove(clases, clases2);
    mensaje.classList.remove(clases, clases2);

    const error = document.querySelector('p.error'); //Se selecciona el error del parrafo
    if (error) {
        error.remove(); //Se elimina dicha clase
    }
};
//* Ejecución de código.