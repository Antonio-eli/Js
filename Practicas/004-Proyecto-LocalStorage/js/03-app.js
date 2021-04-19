localStorage.removeItem('nombre');

// Acualizar un registro.
const mesesArray = JSON.parse(localStorage.getItem('Meses'));
console.log(mesesArray);
mesesArray.push('Abril Actualizado');
console.log(mesesArray);
localStorage.setItem('Meses', JSON.stringify(mesesArray));

localStorage.clear();