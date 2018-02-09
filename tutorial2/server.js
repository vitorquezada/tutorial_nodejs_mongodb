const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

var db;

MongoClient.connect('mongodb://vitorquezada:1234@ds229918.mlab.com:29918/tutorial_nodejs', (err, client) => {
    if (err) return console.log(err);
    db = client.db('tutorial_nodejs');

    app.listen(3000, () => {
        console.log('listening 3000')
    });
});

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', function (req, res) {
    var cursor = db.collection('quotes').find();
    cursor.toArray((err, result) => {
        res.render('index.ejs', { quotes: result });
    });
});

app.post('/quotes', (req, res) => {
    console.log(req.body);
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log("saved to database");
        res.redirect("/");
    });
});

app.put('/quotes', (req, res) => {
    db.collection('quotes').findOneAndUpdate(
        { name: "Yoda" },
        {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        },
        {
            sort: { _id: -1 },
            upsert: true
        },
        (err, result) => {
            if (err) return console.log(err);
            res.send(result);
        }
    );
});

app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete(
        { name: req.body.name },
        (err, result) => {
            if (err) res.send(500, err);
            res.send({ message: 'A darth vadar quote got deleted' });
        }
    );
});

console.log(__dirname);