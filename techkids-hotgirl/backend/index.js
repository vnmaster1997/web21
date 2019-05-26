const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect('mongodb://localhost/tk-hotgirl-21', (err) => {
	if(err) console.log(err)
	else console.log("DB connect success!");
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret: '1235anhcodanhroinhipnaokhong',
	saveUninitialized: false, // quyet dinh server co luu thong tin ng dung luon khi truy cap app k
	resave: false, // de bi conflict khi user bat app tren nhieu tab
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}))

const userApiRouter = require('./routers/userApi');
const postApiRouter = require('./routers/postApi');
const authApiRouter = require('./routers/authApi');

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/home.html');
})

app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/views/login.html');
})
app.use('/api/auth', authApiRouter);

app.use((req, res, next) => {
	console.log("Hello");
	console.log(req.session);
	console.log(req.sessionID);
	// req.session.user = "abc";
	// res.send("Hello middleware");
	next(); 
})

app.use('/api/users', userApiRouter);
app.use('/api/posts', postApiRouter);

app.listen(6969, (err) => {
	if(err) console.log(err)
	else console.log("Server start success");
});