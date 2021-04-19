// ! LocalStorage solo almacena strings por lo tanto no se pueden guardar areglos ni objetos.
localStorage.setItem('nombre', 'Eliceo ROAN');
// sessionStorage.setItem('nombre', 'Eliceo ROAN');
// * Pero hay un metodo paara poder guardar estos datos Compuestos en el LocalStorage.
const producto = {
    nombre: 'Monitor 24 pulgadas',
    precio: 300
}

const productoString = JSON.stringify(producto);
console.log(productoString);
localStorage.setItem('Producto', productoString);

const meses = ['Enero', 'Febrero', 'Marzo'];
// const mesesString = JSON.stringify(meses);
localStorage.setItem('Meses', JSON.stringify(meses));