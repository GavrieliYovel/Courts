const { Router } = require('express');
const { usersDbController } = require('../controllers/usersController')

const usersRouter = new Router();

usersRouter.get('/', usersDbController.getAllUsers);
usersRouter.get('/:emailorid', usersDbController.getUserMW);
usersRouter.post('/new', usersDbController.createUser );
usersRouter.put('/edit', usersDbController.editUser );
usersRouter.delete('/', usersDbController.deleteUser );
usersRouter.post('/login', usersDbController.login())

module.exports = { usersRouter };
