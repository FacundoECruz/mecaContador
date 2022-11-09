const express = require('express');
const app = express();
const path = require('path')
const Meca = require('./models/Meca')
const mongoose = require('mongoose')
const { Schema } = mongoose;

const fecha = () => {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = new Date;
    const fullDate = `${dias[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth()]}, de ${date.getFullYear()}. ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return fullDate;
}

mongoose.connect('mongodb://localhost:27017/meca', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/meca', async (req, res) => {
    const mecas = await Meca.find({});
    res.render('home', { mecas })
})

app.post('/meca', async (req, res) => {
    const { speed, mistakes } = req.body.meca
    const meca = new Meca(req.body.meca);
    meca.indice = speed / (mistakes*10)
    meca.date = fecha();
    await meca.save();
    res.redirect('/meca')
})

app.listen(3000, () => {
    console.log('LISTEN ON 3000')
})


