const express = require('express')

const app = express();

app.listen(3000, () => console.log("Listening on 3000"))

// setup template engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static files
app.use(express.static(__dirname + '/public'));

// create the home url
app.get('/', (req, res) => {
    // res.render('index', {title: 'Home', message: "Hello There"})
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/about', (req, res) => {
    res.render('about')
})