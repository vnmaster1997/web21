const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PlayersModel = require('./models/players');
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect("mongodb://localhost:27017/hackathon", {useNewUrlParser: true}, function(err) {
    if(err) console.log(err);
    else console.log("DB connected ok!");

    PlayersModel.find({}, function(err, docs) {
        if(err) console.log(err);
        else console.log("Players: ", docs);
    })
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/home.html');
});

app.post("/addplayers", function(req, res) {
    // console.log('player[0]');
    PlayersModel.create({
        players: [
            req.body['player0'], 
            req.body['player1'],
            req.body['player2'],
            req.body['player3']
        ],
    }, function(err, docCreated) {
        if(err) {
            console.log(err)
        } else {
            console.log(docCreated);
        }
    })
})

app.listen(3000, function(err) {
    if(err) console.log(err);
    else console.log("Server start success");
})