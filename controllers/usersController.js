const {User} = require('../models/user')

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
        if (req.body.type.toLowerCase() != 'player' && req.body.type.toLowerCase() != 'admin') {
            res.send("Wrong type of user")
        } else {
            const result = newUser.save();
            if (result)
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
        let userToUpdate;
        await User.findOne({'email': req.body.email})
            .then(user => {
                userToUpdate = user;
                console.log(userToUpdate);
            })
        const {newuser} = req.body;
        console.log(newuser);
        if (userToUpdate) {
            User.updateOne({
                    email: req.body.email
                },
                {
                    $set:
                        {name: newuser.name},
            {
                email:newuser.email.toLowerCase()
            }
            {
                password: newuser.password
            }
            {
                birthday: newuser.birthday
            }
            {
                phoneNumber: newuser.phoneNumber
            }
            {
                address: newuser.address
            }
            {
                type: newuser.type.toLowerCase()
            }
        ,

        })
            res.send(`${newuser.name} profile was edit successfully`);
        } else
            res.send("This user doesn't exist");

        // const userString = JSON.parse(JSON.stringify(req.body));
        // User.deleteOne({email: req.params.email})
        //     .then(result => {
        //         if (result)
        //         {
        //             let newUser = new User({
        //                 name: userString.name,
        //                 email: userString.email.toLowerCase(),
        //                 password: userString.password,
        //                 birthday: userString.birthday,
        //                 phoneNumber: userString.phoneNumber,
        //                 address: userString.address,
        //                 type: userString.type.toLowerCase()
        //             })
        //             if (userString.type == 'player')
        //                 newUser.rank = userString.rank;
        //             if (userString.type == 'admin')
        //                 newUser.supervisedCourt = userString.supervisedCourt;
        //             if(userString.type.toLowerCase() != 'player' && userString.type.toLowerCase() != 'admin') {
        //                 res.send("Wrong type of user");
        //             } else {
        //                 const result = newUser.save();
        //                 if(result)
        //                     res.send(`${req.body.name} profile was edit successfully`);
        //                 else
        //                     res.status(404).send("Error editing user");
        //             }
        //         }
        //         else
        //         {
        //             res.send("Failed to delete the existing user");
        //         }
        //     })

        // }
        // else
        // {
        //     res.send("The user doesn't exist");
        // }

    },
    deleteUser(req, res) {
        User.findOne({'email': req.params.email})
            .then(isexists => {
                if (isexists) {
                    User.deleteOne({'email': req.params.email})
                        .then(result => {
                            if (result)
                                res.send("User was deleted");
                            else
                                res.send("The user was not deleted");
                        })
                        .catch(err => console.log(err));

                } else {
                    res.send("The user doesn't exist");
                }
            })
    }

}
