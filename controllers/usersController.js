const { User } = require('../models/user')
const DAL = require('../DAL');

exports.usersDbController = {

    async getAllUsers(req, res) {
        const users = await User.find({});
        res.json(users);
    },
    async createUser(req, res) {
            const newUser = await DAL.createUser(req.body);
            if(newUser)
                res.status(200).send(newUser);
            else
                res.status(404).send(null);
        },
    getUserByMail(req, res) {
        const user = DAL.getUserByEmail(req.email);
        if(user)
            res.status(200).send(user);
        else
            res.status(404).send(null);

    },
    getUserByID(req,res){
        const user = DAL.getUserByID(req.id);
        if(user)
            res.status(200).send(user);
        else
            res.status(404).send(null);

    },
    async editUser(req, res) {
        const {userID, newUserData} = req.body;
        const updatedUser = await DAL.editUser(userID, newUserData);
        if (updatedUser)
            res.status(200).send(updatedUser);
        else
            res.status(404).send(null);


    },
    async deleteUser(req, res) {
        const {userID} = req.body;
        const deletedUser = await DAL.deleteUser(userID);

        if(deletedUser)
            res.status(200).send(deletedUser);
        else
            res.status(404).send(null);
            }

}
