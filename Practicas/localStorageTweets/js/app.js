//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listener
eventListener();

function eventListener() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHtml();
    });
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if (tweet === '') {
        monstrarError('El mensaje no puede estar vacio');
        return;
    }

    const objTweet = {
        id: Date.now(),
        tweet
    }

    //Add arreglo de tweets
    tweets = [...tweets, objTweet];
    console.log(tweets);

    crearHtml();

    formulario.reset();

}

//Mostrar mensaje
function monstrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.classList.add('error');
    mensajeError.textContent = error;

    //Inserta el contenido en el Html
    formulario.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHtml() {
    limpiarHtml();
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            //Agregar un boton
            const btneliminar = document.createElement('a');
            btneliminar.classList.add('borrar-tweet');
            btneliminar.innerText = 'X';

            //Add funtion eliminar
            btneliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear Html
            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            //Asignar el btn
            li.appendChild(btneliminar);
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

function limpiarHtml() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id != id);
    crearHtml();
    console.log(tweets);
}

//Agrega los tweet a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}