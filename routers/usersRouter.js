const { Router } = require('express');
const { usersDbController } = require('../controllers/usersController')

const usersRouter = new Router();

usersRouter.get('/', usersDbController.getAllUsers);
usersRouter.get('/:email', usersDbController.getUserByMail);
usersRouter.post('/new', usersDbController.createUser );
usersRouter.put('/edit/:email', usersDbController.editUser );
usersRouter.delete('/:email', usersDbController.deleteUser );

module.exports = { usersRouter };
