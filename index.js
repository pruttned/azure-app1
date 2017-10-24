const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const DataStore = require('nedb');

const db = new DataStore({ filename: 'db.db', autoload: true });
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client-dist'));

app.use(bodyParser.json());
app.use(expressValidator());


app.get('/posts', (req, res) => {
    sendMessages(res);
});
app.post('/posts', (req, res) => {
    req.sanitizeBody('message').escape();
    if (req.body.message) {

        db.insert({
            date: new Date(),
            message: req.body.message
        }, () => {
            sendMessages(res);
        });
    } else {
        sendMessages(res);
    }
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
function sendMessages(res) {
    db.find({}).sort({ date: -1 }).exec((err, docs) => {
        res.json({
            notes: docs
        });
    });
}

