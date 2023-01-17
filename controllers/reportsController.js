const DAL = require('../DAL');
const {mongoose} = require("mongoose");

module.exports = {

    getAllReports: async (req, res) => {
        res.status(200).send(await DAL.getAllReports());

    },

    getReportByID: async (req, res) => {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const report = await DAL.getReportByID(req.params.id);
            if (report)
                res.status(200).send(report);
            else
                res.status(404).send(null);
        } else
            res.status(404).send(null);
    },
    getReportsByReporterID: async (req, res) => {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const reports = await DAL.getReportsByReporterID(req.params.id);
            if (reports)
                res.status(200).send(reports);
            else
                res.status(404).send(null);
        } else
            res.status(404).send(null);
    },
    getReportsByReportedID : async (req, res) =>{
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const reports = await DAL.getReportsByReportedID(req.params.id);
            if (reports)
                res.status(200).send(reports);
            else
                res.status(404).send(null);
        } else
            res.status(404).send(null);
    },
    getReportsByReportedIDAndReportedID: async (req, res) => {
        if (mongoose.Types.ObjectId.isValid(req.params.reporterid) && mongoose.Types.ObjectId.isValid(req.params.reportedid) ) {
            const reports = await DAL.getReportsByReporterIdAndReportedId(req.params.reporterid, req.params.reportedid);
            if (reports)
                res.status(200).send(reports);
            else
                res.status(404).send(null);
        } else
            res.status(404).send(null);
    },
    getReportsBetweenDates : async  (req,res) => {
        const startDate = req.query.startdate;
        const endDate = req.query.enddate;

        const reports = await DAL.getReportsBetweenDates(startDate, endDate);
        if (reports)
            res.status(200).send(reports);
        else
            res.status(404).send(null);
    },
    createReport : async (req,res) => {
        const newReport = await DAL.createReport(req.body);
        newReport ? res.status(200).send(newReport) : res.status(404).send(null);
    },

    editReport : async (req,res) =>{
        const {reportID, newReportData} = req.body;
        const updatedReport = await DAL.editReport(reportID, newReportData);
        if(updatedReport)
            res.status(200).send(updatedReport);
        else
            res.status(404).send(null);
    },
    deleteReport : async (req, res) =>{
        const {reportID} = req.body;
        const deletedReport = await DAL.deleteReport(reportID);

        if(deletedReport)
            res.status(200).send(deletedReport);
        else
            res.status(200).send(null);
    }

}
