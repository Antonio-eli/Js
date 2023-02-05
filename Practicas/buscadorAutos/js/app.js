//Variables
const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
const max = new Date().getFullYear();
const min = max - 10;

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos();

    //Llena las opciones de años
    llenarSelect();
})

//Funciones
function mostrarAutos() {
    autos.forEach((auto) => {
        const autoHtml = document.createElement('p');

        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        autoHtml.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio:  ${precio} - Color: ${color}
        `;

        //Insertar en el Html
        resultado.appendChild(autoHtml);
    })
}

function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}