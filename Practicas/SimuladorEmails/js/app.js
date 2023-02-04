document.addEventListener('DOMContentLoaded', function() {
    //Selecionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    //Asignar eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo  ${e.target.id} es obligatorio`, e.target.parentElement);
            return;
        }
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            return;
        }
        limpiarAlerta(e.target.parentElement);
        console.log('depues del if');
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        //Generar alerta HTML
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //Pintar formulario en el front
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regx = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regx.test(email);
        return resultado;
    }


});