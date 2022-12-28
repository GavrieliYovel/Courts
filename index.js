const express = require("express");
require('dotenv').config();
const cors = require('cors');
require('./dbConnection');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const { usersRouter } = require("./routers/usersRouter");
const { courtsRouter } = require("./routers/courtsRouter");
const { loginRouter } = require("./routers/loginRouter");
const { gamesRouter } = require("./routers/gamesRouter");
const { htmlRouter } = require("./routers/htmlRouter");


const app = express();
const port = process.env.PORT || 3030;

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie:{ maxAge: oneDay }
}));

app.use(cookieParser());

app.use(express.static("public"));
app.use("/js", express.static(__dirname + "public/js"));

// set views
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', htmlRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/courts', courtsRouter);
app.use('/games', gamesRouter);
app.use((req, res) => {
    res.status(400).send('Something is broken!');
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));
