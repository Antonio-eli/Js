//* Importación de módulos.
//* Declaración de variables.
// Variables usadas para el click.
const listaCursos = document.querySelector('#lista-cursos');
// Creamos un arreglo vacio para irlo llenado
let articulosCarrito = [];
// Contenedor de la lista del carrito.
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

cargarEventListeners();

function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    // Elimina cursos del carrito.
    carrito.addEventListener('click', eliminarCurso);
    // Muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        console.log(articulosCarrito);
        carritoHTML();
    });
    // vaciar el HTML.
    document.querySelector('#vaciar-carrito').addEventListener('click', () => {
        articulosCarrito = [];
        // carritoHTML();
        LimpiarHTML();
    });
}

//* Declaración de funciones.
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // console.log(e.target.parentElement.parentElement);
        leerDatosCurso(cursoSeleccionado);
    }
}
// Elimina un curso del carrito.
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de aticulosCarrito por el data-id.
        articulosCarrito = articulosCarrito.filter(curso => cursoId !== cursoId);
        // console.log(articulosCarrito);
        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML.
    }
}
//Lee el contenido del HTML al que le dimos click y extrae la información del curso.
function leerDatosCurso(curso) {
    // console.log(curso);
    //Crear un objeto con el contenido del curso actual.
    const infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        // console.log(infoCurso);
        // Revisa si un elemento ya existe en el carrito.
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    // console.log(existe);
    if (existe) {
        // Actualizamos la cantidad si el curso existe.
        articulosCarrito.forEach(curso => {
            if (curso.id === infoCurso.id) {
                // Actualizamos la cantidad
                curso.cantidad++;
            }
        });
    } else {
        // Agrega articulos al carrito.
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    // Agregar al HTML.
    carritoHTML();
}

//Muestra el carrito de compras en el HTML.
function carritoHTML() {
    // Limpiar el HTML
    LimpiarHTML();
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        const { imagen, titulo, precio, cantidad, id } = curso;
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;
        // Agrega el HTML del carrito en el tbody.
        contenedorCarrito.appendChild(row);
    });

    // Agregar el carrito al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina un curso duplicado y actualiza la cantidad
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const idCurso = e.target.getAttribute('data-id');
        // Si la cantidad es mayor a 1 entonces la cantidad decrementa --.
        articulosCarrito.forEach(curso => {
            if (curso.id === idCurso) {
                if (curso.cantidad > 1) {
                    // Actualizamos la cantidad
                    curso.cantidad--;
                    // Mostramos de nuevo el HTML.
                    carritoHTML();
                } else {
                    articulosCarrito = articulosCarrito.filter(curso => curso.id !== idCurso);
                    // Volvemos a cargar el HTML.
                    carritoHTML();
                }

            }
        });
    }
}

// Elimina los cursos del tbody.
function LimpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';
    // Forma rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    sincronizarStorage();
}

//* Ejecución de código.