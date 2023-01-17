const { Router } = require('express');
const reportsController =  require("../controllers/reportsController");
const reportsRouter = new Router();

reportsRouter.get('/', reportsController.getAllReports);
reportsRouter.get ('/:id', reportsController.getReportByID);
reportsRouter.get("/reporter/:id",reportsController.getReportsByReporterID);
reportsRouter.get ("/reported/:id", reportsController.getReportsByReportedID);
reportsRouter.get("/:reporterid/:reportedid",reportsController.getReportsByReportedIDAndReportedID);
reportsRouter.get("/date",reportsController.getReportsBetweenDates);
reportsRouter.post("/", reportsController.createReport);
reportsRouter.put("/", reportsController.editReport);
reportsRouter.delete("/", reportsController.deleteReport)

module.exports = reportsRouter;
