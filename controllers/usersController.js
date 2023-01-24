const DAL = require('../DAL');
const {mongoose} = require("mongoose");
const bcrypt = require("bcrypt");

async function getUserByMail(req, res) {
    const user = await DAL.getUserByEmail(req.email);
    if (user)
        res.status(200).send(user);
    else
        res.status(404).send(null);

}
async function getUserByID(req, res) {
    const user = await DAL.getUserByID(req.id);
    if (user)
        res.status(200).send(user);
    else
        res.status(404).send(null);

}

exports.usersDbController = {

    async getAllUsers(req, res) {
        res.status(200).send(await DAL.getAllUsers());
    },

    async createUser(req, res) {
        const newUser = await DAL.createUser(req.body);
        if (newUser)
            res.status(200).send(newUser);
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

        if (deletedUser)
            res.status(200).send(deletedUser);
        else
            res.status(404).send(null);
    },

    getUserMW(req,res){
        const email0rID = req.params.emailorid;
        if(mongoose.Types.ObjectId.isValid(email0rID)) {
            req.id = email0rID;
            return getUserByID(req, res);
        }
        else
        {
            req.email = email0rID;
            return getUserByMail(req,res);
        }
    },
    async login(req, res)  {
        const user = await DAL.getUserByEmail(req.body.email);
        if(user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result) {
                req.session.user = user;
                res.send(user);
            } else {
                res.send(null);
            }
        } else {
            res.status(404).send('user not found')
        }
    },
    incUserRank : async (req, res) => {
        const updatedUser = DAL.increaseUserRank(req.params.id);
        if(updatedUser)
            res.status(200).send(updatedUser);
    },

    decUserRank : async (req, res) => {

    }


}
