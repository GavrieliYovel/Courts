const { User } = require('../models/user')

exports.usersDbController = {
    async getAllUsers(req, res) {
        const users = await User.find({});
        res.json(users);
    },
    async createUser(req, res) {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            birthday: req.body.birthday,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            type: req.body.type.toLowerCase()
        })
        if (req.body.type == 'player')
            newUser.rank = 1;
        if (req.body.type == 'admin')
            newUser.supervisedCourt = null;
        if(req.body.type.toLowerCase() != 'player' && req.body.type.toLowerCase() != 'admin') {
            res.send("Wrong type of user")
        } else {
            const result = newUser.save();
            if(result)
                res.send(`${req.body.name} created successfully`);
            else
                res.status(404).send("Error saving user");
        }
    },
    getUserByMail(req, res) {
         User.findOne({'email': req.params.email})
            .then(result => {
                if (result)
                    res.send(result);
                else
                    res.send("The email does not exist, try again");
            })
            .catch(err => console.log(err));

    },
    async editUser(req, res) {
        const {email, newuser} = req.body;
        await User.findOneAndUpdate({email: email}, newuser, {new: true})
            .then(updatedUser => res.status(200).send(updatedUser))
            .catch((err) => {
                if (err)
                    console.log("Something went wrong");
                res.send(null);
            })
    },
    deleteUser(req, res) {
        User.findOne({'email': req.params.email})
            .then(isexists => {
                if (isexists)
                {
                    User.deleteOne({'email': req.params.email})
                        .then(result => {
                            if (result)
                                res.send("User was deleted");
                            else
                                res.send("The user was not deleted");
                        })
                        .catch(err => console.log(err));

                }
                else
                {
                    res.send("The user doesn't exist");
                }
                })
            }

}
