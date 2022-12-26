const DAL = require('../DAL');
const {mongoose} = require('mongoose');

exports.courtsDbController = {
    async getAllUCourts(req, res) {
        res.status(200).send(await DAL.getAllCourts());
    },

    async getCourtByID(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const court = await DAL.getCourtByID(req.params.id);
            if (court)
                res.status(200).send(court);
        } else
            res.status(404).send(null);
    },

    async createCourt(req, res) {
        const newCourt = await DAL.createCourt(req.body);
        if (newCourt)
            res.status(200).send(newCourt);
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

    async deleteCourt(req, res) {
        const {courtID} = req.body;
        const deletedCourt = await DAL.deleteCourt(courtID);
        if (deletedCourt)
            res.status(200).send(deletedCourt);
        else
            res.status(404).send(null);

    },
    async addSupervisorToCourt(req, res) {
        const {courtID, supervisorID} = req.body;
        const updatedCourt = await DAL.addSupervisorToCourt(courtID, supervisorID);
        if (updatedCourt)
            res.status(200).send(updatedCourt);
        else
            res.status(404).send(null);
    }

}
