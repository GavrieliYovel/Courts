const { Router } = require('express');
const { usersDbController } = require('../controllers/usersController')

const usersRouter = new Router();

usersRouter.get('/', usersDbController.getAllUsers);

usersRouter.post('/new', usersDbController.createUser );
module.exports = { usersRouter };
