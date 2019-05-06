const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //xử lý form

const QuestionModel = require("./models/questionModel");

//data-type form gui len: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// app.set('views', path.join(__dirname, 'views'));
mongoose.connect("mongodb://localhost/quyet-de-21", {useNewUrlParser: true}, function(err) {
    if(err) console.log(err);
    else console.log("DB connected ok!");

    QuestionModel.find({}, function(err, docs) {
        if(err) console.log(err);
        else console.log("Question: ", docs);
    })

})

app.get('/', function(req, res) {
    // tra ve dang html dung res.send;
    res.sendFile(__dirname + "/views/home.html");
});

// tra ve cau hoi random
app.get("/randomquestion", (req, res) => {
    // const questionList = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    // const randomIndex = Math.floor(Math.random()*questionList.length);
    // const question = questionList[randomIndex];

    // tra ve dang html dung res.send;
    // res.send(questions);

    QuestionModel.find({}, function(err, docs) {
        if(err) console.log(err);
        else {
            const randomIndex = Math.floor(Math.random()*docs.length);
            res.send(docs[randomIndex]);
        }
    })

    // QuestionModel.count({}, function(err, totalDoc) {
    //     if(err) console.log(err);
    //     else {
    //         const randomIndex = Math.floor(Math.random()*totalDoc);
    //         QuestionModel.findOne({}).skip(randomIndex).exec((err, question) => { // .exec la cho de dat call back 
    //             if(err) console.log(err);
    //             else res.json(question);
    //         })
    //     }
    // })
})

app.get("/vote/:questionId/:vote", (req, res) => {
    // const questionId = req.params.questionId
    // const { questionId, vote } = req.params;
    // const questionList = JSON.parse(
    //     fs.readFileSync("./questions.json", {encoding: "utf-8"})
    // );
    
    // // for(let i = 0; i < questionList.length; i++) {
    // //     if(questionList[i].id == questionId) {
    // //         if(vote == "yes") {
    // //             questionList[i].yes++;
    // //         } else questionList[i].no++;
    // //     }
    // // }

    // questionList[questionId][vote]++;

    // fs.writeFileSync("./questions.json", JSON.stringify(questionList));

    const { questionId, vote } = req.params;
    if(vote == "yes"){

        QuestionModel.findById(questionId, function(err, data) {
            if(err) console.log(err);
            else {
                var yes = data.yes + 1
                QuestionModel.updateOne({_id: questionId}, {$set: {yes: yes}}, function(err, res) {
                    if(err) console.log(err);
                    else console.log(`${questionId} update ${vote}`);
                })
            }
        })


    } else {

        QuestionModel.findById(questionId, function(err, data) {
            if(err) console.log(err);
            else {
                var no = data.no + 1;
                QuestionModel.updateOne({_id: questionId}, {$set: {no: no}}, function(err, res) {
                    if(err) console.log(err);
                    else console.log(`${questionId} update ${vote}`);
                })
            }
        })
    }



    // chuyen huong trang toi 1 trang khac
    res.redirect("/");
})

app.get('/ask', function(req, res) {
    res.sendFile(__dirname + "/views/ask.html");
});

app.get("/question/:id", (req, res) => {
    // const { id } = req.params;
    res.sendFile(__dirname + "/views/question.html");
})

// lay thong tin cau hoi
app.get("/getinfo/:questionId", (req, res) => {
    // lay thong tin cua cau hoi
    // const questionList = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    // const {questionId} = req.params;
    // const question = questionList[questionId];
    // res.send(question);

    const { questionId } = req.params;
    QuestionModel.findOne({_id : questionId}, function(err, doc) {
        if(err) console.log(err);
        else {
            res.send(doc);
        }
    })
} )

app.post('/addquestion', function(req,res) {

    // const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    // const { question } = req.body;
    // const newQuestion = {
    //     content: question,
    //     yes: 0,
    //     no: 0,
    //     id: questions.length,
    // }
    // questions.push(newQuestion);
    // fs.writeFileSync("./questions.json", JSON.stringify(questions));
    // res.send("Success");
    // console.log(req.body);
    
    const { question } = req.body;

    QuestionModel.create({
        content: question    
    }, function(err, docCreated) {
        if(err) console.log(err)
        else res.redirect('/');
    })

})

app.listen(3000, function(err) {
    if(err) console.log(err);
    else console.log("Server start success!");
});