//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
//Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);

    //Llena las opciones de años
    llenarSelect();
})

//EventListener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtarAuto();
})
year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtarAuto();
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtarAuto();
})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtarAuto();
})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtarAuto();
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtarAuto();
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtarAuto();
    console.log(datosBusqueda);
})

//Funciones
function mostrarAutos(autos) {
    limpiarHtml();

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

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

function filtarAuto() {
    const resultado = autos.filter(filtarMarca).filter(filtarYear).filter(filtarMinimo).filter(filtarMaximo).filter(filtarPuertas).filter(filtarTransmision).filter(filtarColor);

    if (resultado.length) {
        mostrarAutos(resultado);
        console.log(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHtml();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
}

function filtarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}