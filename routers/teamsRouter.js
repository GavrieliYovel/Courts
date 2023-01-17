const { Router } = require('express');
const teamsController =  require("../controllers/teamsController");
const teamsRouter = new Router();


teamsRouter.get("/", teamsController.getAllTeams);
teamsRouter.get("/:id", teamsController.getByIdRouter);
teamsRouter.put("/player/:teamid/:playerid", teamsController.addPlayerToTeam);
teamsRouter.delete("/player/:teamid/:playerid", teamsController.deletePlayerFromTeam);
teamsRouter.put("/", teamsController.editTeam);
teamsRouter.post("/", teamsController.createTeam);
teamsRouter.delete("/", teamsController.deleteTeam);


module.exports = teamsRouter;
