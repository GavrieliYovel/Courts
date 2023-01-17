const express = require("express");
require('dotenv').config();
const cors = require('cors');
require('./dbConnection');
const { usersRouter } = require("./routers/usersRouter");
const { courtsRouter } = require("./routers/courtsRouter");
const {gamesRouter} = require("./routers/gamesRouter");
const {teamsRouter} = require("./routers/teamsRouter");
const {reportsRouter} = require("./routers/reportsRouter");

const app = express();
const port = process.env.PORT || 3030;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', usersRouter);
app.use('/courts', courtsRouter);
app.use('/games', gamesRouter);
app.use('/reports', reportsRouter);
app.use('/teams', teamsRouter);

app.use((req, res) => {
    res.status(400).send('Something is broken!');
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));
