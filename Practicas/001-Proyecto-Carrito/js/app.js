//* Importación de módulos.
//* Declaración de variables.
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    // Elimina cursos del carrito.
    carrito.addEventListener('click', eliminarCurso);
    // vaciar el HTML.
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

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
        // Actualizamos la cantidad.
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; /* Retorna el obejto actualizado */
            } else {
                return curso; /* Retorna el objeto que no esta duplicado */
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agrega elementos al arreglo del carrito.
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el HTML.
function carritoHTML() {
    // Limpiar el HTML
    LimpiarHTML();
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
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
}

// Elimina los cursos del tbody
function LimpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';
    // Forma rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
//* Ejecución de código.