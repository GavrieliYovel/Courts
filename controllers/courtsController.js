const { Court } = require('../models/court')

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

    }
}
