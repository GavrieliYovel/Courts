const DAL = require('../DAL');
const {mongoose} = require('mongoose');

exports.gamesDbController = {
    async getAllGames(req,res) {
        console.log(req.session.user)
        res.status(200).send(await DAL.getAllGames());
    },

    async getGamesByPlayerID(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const games = await DAL.getGamesByPlayerID(req.params.id);
            if (games)
                res.status(200).send(games);
            else
                res.status(404).send(null);
        } else
            res.status(404).send(null);
    },

    async getGameByID(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const game = await DAL.getGamesByPlayerID(req.params.id);
            if (game)
                res.status(200).send(game);
            else
                res.status(404).send(null);
        } else
            res.status(404).send(null);
    },

    async createGame(req, res) {
        const newGame = await DAL.createGame(req.body);
        if (newGame)
            res.status(200).send(newGame);
        else
            res.status(404).send(null);
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
    async addPlayerToGame(req, res) {
        const {gameID, newGameData} = req.body;
        if (mongoose.Types.ObjectId.isValid(gameID)) {
            const editedGame = await DAL.addPlayerToGame(gameID, newGameData);
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
    }
}
