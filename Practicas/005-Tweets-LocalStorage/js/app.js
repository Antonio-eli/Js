//* Importación de módulos.

//* Declaración de variables.

const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets = [];

//* Eventos.
eventListeners();

function eventListeners() {
    //Cuando se envia el formulario
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo.
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
}


//* Declaración de funciones.

function agregarTweet(e) {
    e.preventDefault();
    // console.log('Agregando...');
    // leer el valor del textarea
    const tweet = document.querySelector('#tweet').value;
    // Validación...
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');

        return; //Evita que se ejecuten más lineas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de Tweets.
    tweets = [...tweets, tweetObj];
    console.log(tweets);

    // Una vez agreagdo vamos a crear el HTML.
    crearHTML();

    // Reiniciar el formulario.
    formulario.reset();

}

// Mostrar mensaje de error.
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertando el contenido.
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta depués de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los Tweets
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Crear un botón de eliminar.
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la función de eliminar;
            btnEliminar.onclick = () => {
                    borrarTweet(tweet.id);
                }
                // Crear el HTML
            const li = document.createElement('li');
            // Añadimos el texto.
            li.innerText = tweet.tweet;
            // Asignamos el botón.
            li.appendChild(btnEliminar);
            // Insertarlo en el HTML.
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los Tweets actuales a localStorage.
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    // console.log(tweets);
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}


//* Ejecución de código.