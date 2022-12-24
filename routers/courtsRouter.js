const { Router } = require('express');
const { courtsDbController } = require('../controllers/courtsController')

const courtsRouter = new Router();

courtsRouter.get('/', courtsDbController.getAllUCourts);

courtsRouter.post('/new', courtsDbController.createCourt);
module.exports = { courtsRouter };
