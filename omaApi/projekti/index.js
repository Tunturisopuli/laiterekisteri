// npm install express
// npm install handlebars
// npm install consolidate

var bodyParser = require('body-parser');
var express = require('express');
var cons = require('consolidate');
var app = express();
var path = require('path');
var customerController = require('./customerController');

// Tulosta konsoliin mahdolliset enginet
//console.log(cons);

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('./'));

app.route('/createUser')
    .post(customerController.createUser);

app.get('/', function(req, res) {
  res.render('login', {
    
  });
});
app.get('/register', function (req, res) {
    res.render('register', {

    });
});

app.get('/etusivu', function (req, res) {
    res.render('pääsivu', {

    });
});


app.get('/users', function(req, res) {

    customerController.fetchTypesRevised().then(function(data){
        console.log("types = " + JSON.stringify(data));
        return data;    
    })
    .then((types) => {
        return types;
    })
    .catch(function(msg){
        console.log("Virhettä pukkaa " + msg);
    })
    .then((types) => {
        // suoritetaan vaikka tulis virhe
        if (types == null) types = [{ Avain: -1, Lyhenne: "KAIKKI", Selite: "Tyhyjä" }];
        //res.send(data)
        res.render('users', {
            title: 'Users',
            subtitle: 'best',
            users: users,
            languages: ['englanti', 'suomi', 'ruotsi'],
            types : types
        });        
    });
});

app.listen(3003);
console.log('Express server listening on port 3003');

