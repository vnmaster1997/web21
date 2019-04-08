const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser'); //xử lý form


//data-type form gui len: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use("/static", express.static(__dirname));
// app.set('views', path.join(__dirname, 'views'));
app.get('/', function(req, res) {
    // get random question
});

app.get('/ask', function(req, res) {
    res.sendFile(__dirname + "/views/ask.html");
});

app.post('/addquestion', function(req,res) {
    // req.on("data", function(data) {
    //     console.log(data+"").split("=");
    // })

    // const questions = req.body.questions;

    const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    const { question } = req.body;
    const newQuestion = {
        content: question,
        yes: 0,
        no: 0,
        id: questions.length,
    }
    questions.push(newQuestion);
    fs.writeFileSync("./questions.json", JSON.stringify(questions));
    res.send("Success");
    console.log(req.body);
})

app.get("/addquestion/:question_number",function (req,res) {
    const {question_number} = req.params
    const questions = JSON.parse(fs.readFileSync("questions.json", {encoding:"utf-8"}))
    if (question_number >= questions.length) {
        res.send("Wrong question");
    } else {
        const question = questions[question_number];
        const question_text= question.question;
        const yes_number = question.yes;
        const no_number = question.no;
        res.send(`
        <h1>${question_text}</h1>
        <span>${yes_number}</span>
        <span>${no_number}</span>
        <a href="/"><button>Xem cau hoi khac</button></a>
        `);
    }
})

app.post("/addquestion:questionNumber",function (req,res) {
    const {questionNumber} = req.body
    const {answer} = req.body
    const questions = JSON.parse(fs.readFileSync("questions.json", {encoding:"utf-8"}))
    const question = questions[questionNumber]
    if(answer === "yes"){
        question.yes += 1;
    } else if (answer === "no"){
        question.no += 1;
    }
    fs.writeFileSync( "./questions.json",JSON.stringify(questions));
    const url = `/question/${questionNumber}`
    res.redirect(url)
})

app.get('/answer', function(req, res) {
    const data = JSON.parse(fs.readFileSync("./questions.json"), {encoding: "utf-8"});
    const ran = Math.floor(Math.random() * data.length);
    const ques = data[ran].content;
    res.send(`
    <h1>${ques}</h1>
    <form action="/addquestion/:questionNumber" method="POST">
        <input type="text" name="questionNumber" value="${ques}" hidden></input>
        <div id="btn-answer">
            <div id="btn-no">
                <a><button class="btn btn-danger btn-lg" type="submit" name="btn-yesno" value="no">
                    <span class="glyphicon glyphicon-thumbs-down">
                        Sai / Không / Trái
                    </span>
                </button></a>
            </div>
            <div id="btn-yes">
                <a><button class="btn btn-primary btn-lg" type="submit" name="btn-yesno" value="yes">
                    <span class="glyphicon glyphicon-thumbs-down">
                        Đúng / Có / Phải
                    </span>
                </button></a>
            </div>
            <div class="space"></div>
        </div>
        <div id="btn-tab">
            <a href="/question/${ques}"><button class="btn btn-default" type="submit" name="btn-yesno" value="resultvote">Kết quả vote</button></a>
            <a href="/answer"><button class="btn btn-default" type="submit" name="btn-yesno" value="differentquestion">Câu hỏi khác</button></a>
        </div>
    </form>
    `)
})

app.get('/main.css', function(req, res) {
    res.sendFile(__dirname + "/" + "main.css");
  });

app.listen(3000, function(err) {
    if(err) console.log(err);
    else console.log("Server start success!");
});