const { Router } = require('express');
const { usersDbController } = require('../controllers/usersController')

const usersRouter = new Router();

usersRouter.get('/', usersDbController.getAllUsers);
usersRouter.get('/:emailOrID', usersDbController.getUserByMail);
usersRouter.post('/new', usersDbController.createUser );
usersRouter.put('/edit', usersDbController.editUser );
usersRouter.delete('/', usersDbController.deleteUser );

module.exports = { usersRouter };
