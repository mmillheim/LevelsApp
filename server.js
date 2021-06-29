const express = require('express');
const app = express();
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path')
const sassMiddleware = require('node-sass-middleware');
const methodOverride = require('method-override')


app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use(ejsLayouts)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sassMiddleware({
    src: path.join(__dirname, 'bootstrap'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(__dirname + '/public'));
//app.use(methodOverride('_method'))
app.set("port", process.env.PORT || 4000);

const itemController = require('./controllers/item-controller')
const vendorController = require('./controllers/vendor-controller')

app.use('/items', itemController)
app.use('/vendors', vendorController)

app.get('/welcome', (req, res) => {
    res.send('welcome')
})

app.get('/login', (req, res) => {
    res.send("Please Log In")
})

app.get('/', (req, res) => {
    res.redirect('/welcome');
})

app.listen(app.get("port"), () => {
    console.log(`PORT: ${app.get("port")}`)
})