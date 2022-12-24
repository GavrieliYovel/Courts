const { Router } = require('express');
const { usersDbController } = require('../controllers/usersController')

const usersRouter = new Router();

usersRouter.get('/', usersDbController.getAllUsers);
usersRouter.get('/:email', usersDbController.getUserByMail);
usersRouter.post('/new', usersDbController.createUser );
module.exports = { usersRouter };
