const { Router } = require('express');
const reportsController =  require("../controllers/reportsController");
const reportsRouter = new Router();

reportsRouter.get('/', reportsController.getAllReports);
reportsRouter.get ('/:id', reportsController.getReportByID);
reportsRouter.get("/reporter/:id",reportsController.getReportsByReporterID);
reportsRouter.get ("/reported/:id", reportsController.getReportsByReportedID);
reportsRouter.get("/:reporterid/:reportedid",reportsController.getReportsByReportedIDAndReportedID);
reportsRouter.get("/date/:startdate/:enddate",reportsController.getReportsBetweenDates);
reportsRouter.post("/new", reportsController.createReport);
reportsRouter.put("/edit", reportsController.editReport);
reportsRouter.delete("/", reportsController.deleteReport)

module.exports = {reportsRouter};
