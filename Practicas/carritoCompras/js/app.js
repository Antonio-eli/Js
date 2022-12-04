//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//Funciones
cargarEventListeners();

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito de compras
    vaciarCarrito.addEventListener('click', () => {
        msgSwalVaciar();
        articulosCarrito = []; //Reseteamos el arreglo
        limpiarHTML();
    });
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        console.log("cursoId", cursoId);
        articulosCarrito.some(curso => {
            if (curso.id === cursoId) {
                if (curso.cantidad > 1) {
                    curso.cantidad--;
                } else {

                    swal.fire({
                        title: '¿Estas seguro?',
                        text: "de eliminar el producto del carrito!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Si',
                        cancelButtonText: 'No',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //Elimina del arreglo articulosCarrito por el data-id
                            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
                            swal.fire({
                                text: 'Producto eliminado',
                                icon: "success"
                            })
                        } else if (
                            /* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.cancel
                        ) {
                            swal.fire(
                                'Bien sigue con la compra :)'
                            )
                        }
                    })
                    carritoHTML();
                }
            }
        });
        carritoHTML();
    }
}

//Lee el contenido del HTML y extrae la informacion del curso
function leerDatosCurso(curso) {
    //Curso trae el HTML que pasamos en la funcion agregar curso
    console.log("curso ->", curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    console.log("infoCurso ->", infoCurso);

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    console.log("existe -> ", existe);
    if (existe) {
        //Actualizamos la cantidad en el Modal carrito
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                let precioCruso = Number(infoCurso.precio.slice(1, infoCurso.precio.length))
                console.log("precioCruso -> ", precioCruso);
                msgSwal();
                curso.cantidad++;

                //Actualiza el precio
                curso.precio = `$${precioCruso * curso.cantidad}`
                return curso; //Retorna el objeto actualizado
            } else {
                return curso; //Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agrega el curso al arreglo del carrito
        msgSwal();
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log("articulosCarrito ->", articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
    //Limpiaa el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <button class="borrar-curso" data-id="${id}"> Eliminar </button>
        </td>
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //Forma lenta :: contenedorCarrito.innerHTML = '';
    //Foma nueva
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

//Swal
function msgSwal() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: "Producto guardado correctamente"
    })

    //text: "termina tu compra en el carrito de compras",

}

function msgSwalVaciar() {
    let timerInterval
    Swal.fire({
        title: 'Vaciando carrito',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Eliminado producto del carrito exitosamente')
        }
    })
}