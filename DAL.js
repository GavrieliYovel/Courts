const {Court} = require('./models/court');
const {Game} = require('./models/game');
const {Report} = require('./models/report');
const {User} = require('./models/user');


//##############################
//          Courts
//##############################
getAllCourts = async () => {
    return Court.find({}).populate({path: "supervisor", model: "User"});
}

getCourtByID = async (courtID) => {
    return Court.find({_id: courtID}).populate({path: "supervisor", model: "User"});
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
    await User.findByIdAndUpdate(supervisorID, {$pull: {supervisedCourt: courtID}}, {safe: true})
    return Court.findByIdAndUpdate(courtID, {$pull: {supervisor: supervisorID}}, {safe: true, new: true});
}

//##############################
//          Users
//##############################

getAllUsers = async () => {
    return User.find({}).populate({path: "supervisedCourt", model: "Court"});
}
createUser = async (newUserData) => {
    const newUser = User(newUserData);
    switch (newUser.type.toLowerCase()) {
        case "player":
            newUser.rank = 1;
            break;
        case "admin":
            newUser.supervisedCourt = null;
            break;
        default:
            return null;
    }
    return newUser.save();
}

getUserByID = async (userID) => {
    return User.find({_id: userID}).populate({path: "supervisedCourt", model: "Court"});
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

//##############################
//          Game
//##############################

getAllGames = async () => {
    return Game.find({}).populate({path: "players", model: "User"}).populate({path: "court", model: "Court"});
}

getGamesByPlayerID = async (playerID) => {
    return Game.find({players: {$in: playerID}}).populate({path: "players", model: "User"}).populate({
        path: "court",
        model: "Court"
    });
}

getGameByID = async (gameID) => {
    return Game.find({_id: gameID}).populate({path: "players", model: "User"}).populate({
        path: "court",
        model: "Court"
    });
}
createGame = async (newGameData) => {
    const newGame = new Game(newGameData);
    return await newGame.save();

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

addPlayerToGame = async (gameID, playerID) => {
    return Game.findByIdAndUpdate(gameID, {$push: {players: playerID}}, {safe: true, new: true});
}


//##############################
//          Report
//##############################

getReportByID = async (reportID) => {
    return Report.find({_id: reportID}).populate({path: "reported", model: "User"}).populate({
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


module.exports = {
    createCourt,
    editCourt,
    getAllCourts,
    getCourtByID,
    deleteCourt,
    addSupervisorToCourt,
    getAllUsers,
    createUser,
    getUserByEmail,
    getUserByID,
    editUser,
    deleteUser,
    deleteSupervisorFromCourt,
    getAllGames,
    getGamesByPlayerID,
    getGameByID,
    createGame,
    editGame,
    deleteGame,
    addCourtToGame,
    addPlayerToGame,
    getReportByID,
    getAllReports,
    getReportsByReportedID,
    getReportsByReporterID,
    getReportsBetweenDates,
    createReport,
    editReport,
    deleteReport
}
