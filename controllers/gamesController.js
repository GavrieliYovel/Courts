const DAL = require('../DAL');
const {mongoose} = require('mongoose');
const moment = require('moment');

const getGamesByPlayerID = async (id, req, res) =>{
        const games = await DAL.getGameByTeamPlayerId(req.params.id);
        if (games)
            res.status(200).send(games);
        else
            res.status(404).send(null);

}

const getGameByID = async (id, req, res) =>{
        const game = await DAL.getGameByID(req.params.id);
        if (game)
            res.status(200).send(game);
        else
            res.status(404).send(null);
}

exports.gamesDbController = {

    async getByIdRouter (req, res){
        const id = req.params.id;
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            if (await DAL.userExists(id))
                await getGamesByPlayerID(id, req, res);
            else if (await DAL.gameExists(id))
                await getGameByID(id, req, res);
        } else
            res.status(404).send(null);
    },

    async getAllGames(req,res) {
        res.status(200).send(await DAL.getAllGames());
    },

    async createGame(req, res) {
        const games = await DAL.getGamesBetweenHours(moment(req.body.gameData).toDate(), moment(req.body.endData).toDate(), req.body.courtID);
        console.log(games.length);
        //const rank = await DAL.getUserRank(req.body.userID);
        
        if(games.length === 0) {
            const newGame = await DAL.createGame(req.body);
            if (newGame)
                res.status(200).send(newGame);
            else
                res.status(404).send(null);
        } else {
            if(games.length === 0)
                res.status(404).send('there is a game scheduled at this time');
            else
                res.status(404).send('rank to low to create game');
        }
    },
    async editGame(req, res) {
        const {gameID, newGameData} = req.body;
        const updatedGame = await DAL.editUser(gameID, newGameData);
        if (updatedGame)
            res.status(200).send(updatedGame);
        else
            res.status(404).send(null);
    },
    async deleteGame(req, res) {
        const {gameID} = req.body;
        const deletedGame = await DAL.deleteGame(gameID);

        if (deletedGame)
            res.status(200).send(deletedGame);
        else
            res.status(404).send(null);
    },
    async addCourtToGame(req, res) {
        const {gameID, newGameData} = req.body;
        if (mongoose.Types.ObjectId.isValid(gameID)) {
            const editedGame = await DAL.addCourtToGame(gameID,newGameData);
            if (editedGame)
                res.status(200).send(editedGame);
            else
                res.status(404).send(null);
        } else
            res.status(404).send(null);
    },
    async deletePlayerFromGame(req, res) {
        const {gameID, playerID} = req.body;
        if ((mongoose.Types.ObjectId.isValid(gameID) && (mongoose.Types.ObjectId.isValid(playerID)))) {
            const deletedPlayer = await DAL.deletePlayerFromGame(gameID, playerID);
            if (deletedPlayer)
                res.status(200).send(deletedPlayer);
            else
                res.status(404).send(null);
        } else
            res.status(404).send(null);
    },
    async changeCourtOfGame(req, res) {
        const {gameID, newCourtID} = req.body;
        if (mongoose.Types.ObjectId.isValid(gameID)) {
            const editedGame = await DAL.changeCourtOfGame(gameID, newCourtID);
            if (editedGame)
                res.status(200).send(editedGame);
            else
                res.status(404).send(null);
        } else
            res.status(404).send(null);
    },
    async getGameByDate(req, res) {
        const {date, courtID} = req.query;
        const games = await DAL.getGamesByDate(moment(date).toDate(), courtID);
        if(games)
            res.status(200).send(games);
        else
            res.status(404).send(null);
    }
}
