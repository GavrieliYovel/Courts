const { Router } = require('express');
const { htmlController } = require('../controllers/htmlController');

const htmlRouter = new Router();

//GET
htmlRouter.get('/', htmlController.getLogin);


module.exports = { htmlRouter };
