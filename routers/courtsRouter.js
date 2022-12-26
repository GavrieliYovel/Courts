const { Router } = require('express');
const { courtsDbController } = require('../controllers/courtsController')
const {usersDbController} = require("../controllers/usersController");

const courtsRouter = new Router();

courtsRouter.get('/', courtsDbController.getAllUCourts);
courtsRouter.get('/:id', courtsDbController.getCourtByID);
courtsRouter.post('/new', courtsDbController.createCourt);
courtsRouter.put('/edit', courtsDbController.editCourt);
courtsRouter.put('/addSuper', courtsDbController.addSupervisorToCourt);
courtsRouter.delete('/', courtsDbController.deleteCourt);
module.exports = { courtsRouter };
