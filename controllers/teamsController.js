const DAL = require('../DAL');
const {mongoose} = require("mongoose");

const getTeamByTeamId =  async (req,res) => {
    const team = await DAL.getTeamByTeamId(req.params.id);
    if (team)
        res.status(200).send(team);
    else
        res.status(404).send(null);
}
const getTeamsByPlayerId = async (req,res) => {
    const teams = await  DAL.getTeamsByPlayerId(req.params.id);
    if (teams)
        res.status(200).send(teams);
    else
        res.status(404).send(null);

}


module.exports = {

    getAllTeams : async (req,res) =>{
        res.status(200).send(await DAL.getAllTeams());
    },
    getTeamsNoPlayer : async (req,res) =>{
        res.status(200).send( await DAL.getTeamsNoPlayer(req.params.id))
    },
    getByIdRouter : async (req,res) =>{
        if (await DAL.teamExists(req.params.id))
         return getTeamByTeamId(req, res);
        else if( await  DAL.userExists(req.params.id))
            return getTeamsByPlayerId(req, res);
        else
            res.status(404).send(null);

    },
    addPlayerToTeam : async (req,res) => {
        const updatedTeam = await  DAL.addPlayerToTeam(req.params.teamid, req.params.playerid);
        if (updatedTeam)
            res.status(200).send(updatedTeam);
        else
            res.status(404).send(null);

    },
    deletePlayerFromTeam : async (req,res) => {
        const updatedTeam = await  DAL.deletePlayerFromTeam(req.params.teamid, req.params.playerid);
        if (updatedTeam)
            res.status(200).send(updatedTeam);
        else
            res.status(404).send(null);

    },

    createTeam : async(req,res) => {
      const newTeam = await DAL.createTeam(req.body);
      if (newTeam)
          res.status(200).send(newTeam);
      else
          res.status(404).send(null);
    },

    editTeam : async (req,res) => {
       const {teamID, newTeamData} = req.body;
        const updatedTeam = await  DAL.editTeam(teamID, newTeamData);
        if (updatedTeam)
            res.status(200).send(updatedTeam);
        else
            res.status(404).send(null);
    },

    deleteTeam : async (req,res) => {
        const {teamID} = req.body;
        const deletedTeam = await DAL.deleteTeam(teamID);
        if(deletedTeam)
            res.status(200).send(deletedTeam);
        else
            res.status(404).send(null);
    }

}
