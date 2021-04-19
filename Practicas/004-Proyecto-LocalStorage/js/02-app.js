const nombre = localStorage.getItem('nombre');
console.log(nombre);

const productoJSON = localStorage.getItem('Producto');
console.log(JSON.parse(productoJSON));

const meses = localStorage.getItem('Meses');
const mesesArray = JSON.parse(meses);
console.log(mesesArray);