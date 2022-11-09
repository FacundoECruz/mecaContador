const date = new Date;
const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const fullDate = `${dias[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth()]}, de ${date.getFullYear()}. ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`


module.exports = fullDate;