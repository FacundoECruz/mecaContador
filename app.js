const express = require('express');
const app = express();
const path = require('path')
const Meca = require('./models/Meca')
const mongoose = require('mongoose')
const { Schema } = mongoose;
const moment = require('moment')

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
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/meca', async (req, res) => {
    const mecasDb = await Meca.find({});
    const mecas = mecasDb.reverse();
    res.render('home', { mecas })
})

app.post('/meca', async (req, res) => {
    const { speed, mistakes } = req.body.meca
    const meca = new Meca(req.body.meca);
    meca.indice = speed / (mistakes*10)
    meca.date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    await meca.save();
    res.redirect('/meca')
})

app.listen(3000, () => {
    console.log('LISTEN ON 3000')
})


