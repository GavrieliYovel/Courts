const DAL = require('../DAL');

exports.courtsDbController = {
    async getAllUCourts(req, res) {
        res.status(200).send(DAL.getAllCourts());
    },

    async createCourt(req, res) {
        const result = DAL.createCourt(req.body);
        if(result)
            res.status(200).send(result);
        else
            res.status(404).send(null);

    },

    async editCourt(req, res) {
        const {courtID, newCourtData} = req.body;
        const updatedCourt = await DAL.editCourt(courtID, newCourtData);
        if (updatedCourt)
            res.status(200).send(updatedCourt);
        else
            res.status(404).send(null);

    },

    deleteCourt(req, res) {
        const {courtID} = req.body;
        const deletedCourt = DAL.deleteCourt(courtID);
        if(deletedCourt)
            res.status(200).send(deletedCourt);
        else
            res.status(404).send(null);

    }
}
