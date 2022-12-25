const { Router } = require('express');
const { courtsDbController } = require('../controllers/courtsController')
const {usersDbController} = require("../controllers/usersController");

const courtsRouter = new Router();

courtsRouter.get('/', courtsDbController.getAllUCourts);

courtsRouter.post('/new', courtsDbController.createCourt);
courtsRouter.put('/edit', courtsDbController.editCourt);
courtsRouter.delete('/:name', courtsDbController.deleteCourt);
module.exports = { courtsRouter };
