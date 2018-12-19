const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs')

// luo yhteyden tietokantaan
var db

MongoClient.connect('mongodb://starwars:sw2018@ds111072.mlab.com:11072/sw-quotes', (err, client) => { 
 
 if (err) return console.log(err)
  db = client.db('sw-quotes')
 
 // luo palvelimen sivustolle
 
app.listen(port);
console.log('Palvelin on pystyssä osoitteessa localhost:4000!')
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
		
    // renderöi ejs tiedoston
    res.render('index.ejs', {quotes: result})
  })
})

// funktio joka lisää uutta dataa tietokantaan
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Tallennettu tietokantaan!')
    res.redirect('/')
	
  })
})