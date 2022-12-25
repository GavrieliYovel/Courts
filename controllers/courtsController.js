const { Court } = require('../models/court')
const {User} = require("../models/user");

exports.courtsDbController = {
    async getAllUCourts(req, res) {
        const courts = await Court.find({});
        res.json(courts);
    },
    async createCourt(req, res) {
        let newCourt = new Court({
            name: req.body.name,
            // location: req.body.location,
            location: [{
                "LON": req.body.location.LON,
                "LAT": req.body.location.LAT,
            }],
            city: req.body.city,
            scope: req.body.scope,
            supervisor: req.body.supervisor,
            status: req.body.status
        })
        const result = newCourt.save();
        if(result)
            res.send(`${req.body.name} created successfully`);
        else
            res.status(404).send("Error saving court");

    },
    async editCourt(req, res) {
        const {name, newCourt} = req.body;
        await Court.findOneAndUpdate({name: name}, newCourt, {new: true})
            .then(updatedCourt => res.status(200).send(updatedCourt))
            .catch((err) => {
                if (err)
                    console.log("Something went wrong");
                res.send(null);
            })


    },
    deleteCourt(req, res) {
        Court.findOne({'name': req.params.name})
            .then(isexists => {
                if (isexists)
                {
                    Court.deleteOne({'name': req.params.name})
                        .then(result => {
                            if (result)
                                res.send("Court was deleted");
                            else
                                res.send("The court was not deleted");
                        })
                        .catch(err => console.log(err));

                }
                else
                {
                    res.send("The court doesn't exist");
                }
            })
    }
}
