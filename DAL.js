const {Court} = require('./models/court');
const {Game} = require('./models/game');
const {Report} = require('./models/report');
const {User} = require('./models/user');
const {Team} = require('./models/team');
const moment = require("moment");

//##############################
//          Courts
//##############################
getAllCourts = async () => {
    return Court.find({})
        .populate({path: "supervisor", model: "User"})
        .populate({path: "games", model: "Game"})
        .populate({path: 'games', populate: {path: 'team'},model: "Game"});
}

getCourtByID = async (courtID) => {
    return Court.findById(courtID).populate({path: "supervisor", model: "User"});
}

createCourt = async (newCourtData) => {
    const newCourt = new Court(newCourtData);
    return await newCourt.save();
}

editCourt = async (courtToEditID, newCourtData) => {
    return Court.findByIdAndUpdate(courtToEditID, newCourtData, {new: true});
}

deleteCourt = async (courtID) => {
    return Court.findByIdAndDelete(courtID);
}

//#################################################
//      Adding a Supervisor to court and User
//#################################################


addSupervisorToCourt = async (courtID, supervisorID) => {
    await User.findByIdAndUpdate(supervisorID, {$push: {supervisedCourt: courtID}}, {safe: true})
    return Court.findByIdAndUpdate(courtID, {$push: {supervisor: supervisorID}}, {safe: true, new: true});
}
deleteSupervisorFromCourt = async (courtID, supervisorID) => {
    await User.findByIdAndUpdate(supervisorID, {$pull: {supervisedCourt: courtID}}, {safe: true});
    return Court.findByIdAndUpdate(courtID, {$pull: {supervisor: supervisorID}}, {safe: true, new: true});
}

//##############################
//          Users
//##############################

userExists = async (userId) =>{
    return User.exists({_id: userId});
}

getAllUsers = async () => {
    return User.find({}).populate({path: "supervisedCourt", model: "Court"});
}
createUser = async (newUserData) => {
    const newUser = new User(newUserData);
    switch (newUser.type.toLowerCase()) {
        case "player":
            newUser.rank = 1;
            break;
        case "admin":
            newUser.supervisedCourt = newUserData.supervisedCourt;
            break;
        default:
            return null;
    }
    return newUser.save();
}

getUserByID = async (userID) => {
    return User.findById(userID).populate({path: "supervisedCourt", model: "Court"});
}
getUserByEmail = async (userEmail) => {
    return User.findOne({email: userEmail}).populate({path: "supervisedCourt", model: "Court"});
}

editUser = async (userID, newUserData) => {
    return User.findByIdAndUpdate(userID, newUserData, {new: true});

}
deleteUser = async (userID) => {
    return User.findByIdAndDelete(userID);
}

decreaseUserRank = async (userID) => {
    return User.findByIdAndUpdate(userID, {$inc: {'rank': -1}}, {new: true});
}

increaseUserRank = async (userID) => {
    return User.findByIdAndUpdate(userID, {$inc: {'rank': 1}}, {new: true});
}

getUserRank = async (userID) => {
    let user = User.findById(userID);
    return user.rank;
}

allUsers = async (userID) => {
    let users= await User.find({_id: {$ne: userID}});
    return users;
}

//##############################
//          Game
//##############################

gameExists = async (id) =>{
    return Game.exists({_id: id});
}

getAllGames = async () => {
    return Game.find({}).populate({path: "creator", model: "User"}).populate({path: "court", model: "Court"});
}

// getGamesByPlayerID = async (playerID) => {
//     return Game.find({players: {$in: playerID}}).populate({path: "players", model: "User"}).populate({
//         path: "court",
//         model: "Court"
//     });
// }


getGameByTeamPlayerId = async(teamPlayerId) =>{
    return  Game.find({'team.players' : teamPlayerId});
}


getGameByID = async (gameID) => {
    return Game.findById(gameID).populate({path: "creator", model: "User"}).populate({
        path: "court",
        model: "Court"
    });
}
createGame = async (newGameData) => {
    const newGame = new Game(newGameData);
    const game = await newGame.save();
    await Court.findByIdAndUpdate(game.court, {$push: {games: game._id}}, {safe: true});
    return game;
}
editGame = async (gameToEditID, editedGameData) => {
    return Game.findByIdAndUpdate(gameToEditID, editedGameData, {new: true});
}

deleteGame = async (gameID) => {
    return Game.findByIdAndDelete(gameID);
}

addCourtToGame = async (gameID, courtID) => {
    return Game.findByIdAndUpdate(gameID, {court: courtID}, {safe: true, new: true});
}

getGamesByDate = async (date, courtID) => {
    const startOfDay = moment(date).startOf('day').toDate();
    const endOfDay = moment(date).endOf('day').toDate();
    return Game.find({
        gameDate: {
            $gte: startOfDay,
            $lte: endOfDay
        },
        court: courtID
    });
}

getGamesBetweenHours = async (startDate, endDate, courtID) => {
    return Game.find({
        $or:[
            {
                $and: [
                    {gameDate: { $lte: startDate}},
                    {endDate: { $gte: startDate}},
                    {court: courtID}
                ]
            },
            {
                $and: [
                    {gameDate: { $lte: endDate}},
                    {endDate: { $gte: endDate}},
                    {court: courtID}
                ]
            },
            {
                $and: [
                    {gameDate: { $gte: startDate}},
                    {endDate: { $lte: endDate}},
                    {court: courtID}
                ]
            }

        ]

    });
}
//14:10-14:45
//14:00-15:00

// addPlayerToGame = async (gameID, playerID) => {
//     return Game.findByIdAndUpdate(gameID, {$push: {players: playerID}}, {safe: true, new: true});
// }

deletePlayerFromGame = async (gameID, playerID) => {
    return Game.findByIdAndUpdate(gameID, {$pull: {players: playerID}}, {safe: true, new: true});
}

addPlayerToGame = async (gameID, playerID) => {
    return Game.findByIdAndUpdate(gameID, {$push: {players: playerID}}, {safe: true, new: true});
}

changeCourtOfGame = async (gameID, newCourtID) => {
    return Game.findByIdAndUpdate(gameID, {court: newCourtID}, {safe: true, new: true});
}


//##############################
//          Report
//##############################

getReportByID = async (reportID) => {
    return Report.findById(reportID).populate({path: "reported", model: "User"}).populate({
        path: "reporter",
        model: "User"
    });
}

getAllReports = async () => {
    return Report.find({}).populate({path: "reported", model: "User"}).populate({
        path: "reporter",
        model: "User"
    });
}

getReportsByReportedID = async (reportedID) => {
    return Report.find({reported: reportedID}).populate({path: "reported", model: "User"}).populate({
        path: "reporter",
        model: "User"
    });
}
getReportsByReporterID = async (reporterID) => {
    return Report.find({reporter: reporterID}).populate({path: "reported", model: "User"}).populate({
        path: "reporter",
        model: "User"
    });
}

getReportsByReporterIdAndReportedId = async (reporterID, reportedID) => {
    return Report.find({$and: [{reporter: reporterID}, {reported: reportedID}]}).populate({
        path: "reported",
        model: "User"
    }).populate({
        path: "reporter",
        model: "User"
    });
}

getReportsBetweenDates = async (startDate, endDate) => {
    return Report.find({reportDate: { $gte: new Date(startDate), $lte: new Date(endDate)}}).populate({
        path: "reported",
        model: "User"
    }).populate({
        path: "reporter",
        model: "User"
    });
}

createReport = async (newReportData) => {
    const newReport = new Report(newReportData);
    return await newReport.save();
}

editReport = async (reportID, newReportData) => {
    return Report.findByIdAndUpdate(reportID, newReportData, {new: true});
}

deleteReport = async (reportID) =>{
    return Report.findByIdAndDelete(reportID);
}

//##############################
//          Team
//##############################
teamExists = async (teamId) =>{
    return Team.exists({_id: teamId});
}
getAllTeams = async () => {
    return Team.find({}).populate({
        path: 'players',
        model: "User"
    });
}

getTeamByTeamId = async (teamId) =>{
    return Team.findById(teamId).populate({
        path: 'players',
        model: "User"
    });
}
getTeamsByPlayerId = async (playerId) => {
    return Team.find({players : playerId }).populate({
        path: 'players',
        model: "User"
    });
}
getTeamsNoPlayer = async(playerId) =>{
    return Team.find({"players" : {"$ne" : playerId} }).populate({
        path: 'players',
        model: "User"
    });
}

createTeam = async (newTeamData) =>{
    const newTeam = new Team(newTeamData);
    return await newTeam.save();;
}

addPlayerToTeam  = async (teamId, newPlayerId) =>{
    return Team.findByIdAndUpdate(teamId, {$push: {players: newPlayerId}}, {safe: true, new: true});
}

deletePlayerFromTeam = async (teamId, deletePlayerId) => {
    return Team.findByIdAndUpdate(teamId,{$pull: {players: deletePlayerId}}, {safe: true, new: true});
}

addPlayersToTeam  = async (teamId, newPlayersId) =>{
    return Team.findByIdAndUpdate(teamId, {$push: {players: { $each: newPlayersId}}}, {safe: true, new: true});
}

deletePlayersFromTeam = async (teamId, deletePlayersId) => {
    return Team.findByIdAndUpdate(teamId,{$pull: {players: {$in:deletePlayersId}}}, {safe: true, new: true});
}

deleteTeam = async (teamId) => {
    return Team.findByIdAndDelete(teamId);
}

editTeam = async (teamId, newTeamData) =>{
    return Team.findByIdAndUpdate(teamId, newTeamData, {new: true});
}



module.exports = {
    gameExists,
    teamExists,
    userExists,
    createCourt,
    editCourt,
    getAllCourts,
    getCourtByID,
    deleteCourt,
    addSupervisorToCourt,
    deleteSupervisorFromCourt,
    getAllUsers,
    createUser,
    getUserByEmail,
    getUserByID,
    editUser,
    deleteUser,
    allUsers,
    getAllGames,
    getGameByTeamPlayerId,
    getGameByID,
    createGame,
    editGame,
    deleteGame,
    addCourtToGame,
    deletePlayerFromGame,
    changeCourtOfGame,
    getReportByID,
    getAllReports,
    getReportsByReportedID,
    getReportsByReporterID,
    getReportsByReporterIdAndReportedId,
    getReportsBetweenDates,
    createReport,
    editReport,
    deleteReport,
    getTeamByTeamId,
    getTeamsByPlayerId,
    createTeam,
    addPlayerToTeam,
    deletePlayerFromTeam,
    addPlayersToTeam,
    deletePlayersFromTeam,
    deleteTeam,
    editTeam,
    getGamesByDate,
    getGamesBetweenHours,
    getAllTeams,
    decreaseUserRank,
    increaseUserRank,
    getUserRank,
    addPlayerToGame,
    getTeamsNoPlayer
}
