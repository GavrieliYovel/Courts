const { Router } = require('express');
const { gamesDbController } = require('../controllers/gamesController')

const gamesRouter = new Router();

gamesRouter.get('/', gamesDbController.getAllGames);
gamesRouter.get('/:id', gamesDbController.getByIdRouter);
gamesRouter.get('/date/:date/:courtID', gamesDbController.getGameByDate);
gamesRouter.post('/new', gamesDbController.createGame);
gamesRouter.put('/edit', gamesDbController.editGame);
gamesRouter.delete('/', gamesDbController.deleteGame);
gamesRouter.put('/addcourt', gamesDbController.addCourtToGame);
gamesRouter.delete('/deleteplayer', gamesDbController.deletePlayerFromGame);
gamesRouter.put('/changecourt', gamesDbController.changeCourtOfGame);

module.exports = { gamesRouter };
