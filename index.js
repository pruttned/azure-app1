const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const DataStore = require('nedb');

const db = new DataStore({ filename: 'db.db', autoload: true });
const app = express();

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/client-dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());


app.post('/', (req, res) => {
    req.sanitizeBody('message').escape();
    if (req.body.message) {

        db.insert({
            date: new Date(),
            message: req.body.message
        }, () => {
            renderIndex(res);
        });
    }
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});

function renderIndex(res) {
    db.find({}).sort({ date: -1 }).exec((err, docs) => {
        res.render('index', {
            notes: docs
        });
    })
}
