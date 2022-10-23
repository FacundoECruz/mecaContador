const express = require('express');
const app = express();
const path = require('path')
const Meca = require('./models/Meca')
const mongoose = require('mongoose')
const { Schema } = mongoose;

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

app.get('/meca', (req, res) => {
    res.render('home')
})

app.post('/meca', async (req, res) => {
    const { speed, mistakes } = req.body.meca
    const meca = new Meca(req.body.meca);
    const hora = Date.now();
    const indice = speed / (mistakes*10)
    meca.date = hora;
    meca.indice = indice;
    await meca.save();
    res.redirect('/meca')
})

app.listen(3000, () => {
    console.log('LISTEN ON 3000')
})



