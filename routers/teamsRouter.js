const { Router } = require('express');
const teamsController =  require("../controllers/teamsController");
const teamsRouter = new Router();


teamsRouter.get("/", teamsController.getAllTeams);
teamsRouter.get("/:id", teamsController.getByIdRouter);
teamsRouter.get("/noplayer/:id", teamsController.getTeamsNoPlayer);
teamsRouter.put("/player/:teamid/:playerid", teamsController.addPlayerToTeam);
teamsRouter.delete("/player/:teamid/:playerid", teamsController.deletePlayerFromTeam);
teamsRouter.put("/edit", teamsController.editTeam);
teamsRouter.post("/new", teamsController.createTeam);
teamsRouter.delete("/", teamsController.deleteTeam);


module.exports = {teamsRouter};
