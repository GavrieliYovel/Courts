const { Router } = require('express');
const { gamesDbController } = require('../controllers/gameController')

const gamesRouter = new Router();

gamesRouter.get('/', gamesDbController.getAllGames);
gamesRouter.get('/:playerID', gamesDbController.getGamesByPlayerID);
gamesRouter.get('/:ID', gamesDbController.getGameByID);
gamesRouter.post('/new', gamesDbController.createGame);
gamesRouter.put('/edit', gamesDbController.editGame);
gamesRouter.delete('/', gamesDbController.deleteGame);
gamesRouter.put('/addCourt', gamesDbController.addCourtToGame);
gamesRouter.put('/addPlayer', gamesDbController.addPlayerToGame);
gamesRouter.delete('/deleteFromGame', gamesDbController.deletePlayerFromGame);
gamesRouter.put('/changeCourt', gamesDbController.changeCourtOfGame);

module.exports = { gamesRouter };
