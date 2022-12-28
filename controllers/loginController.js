const {User} = require('../models/user')
const DAL = require('../DAL');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


exports.loginController = {
    async login(req, res) {
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
    }
}
