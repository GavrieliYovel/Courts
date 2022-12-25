const {Court} = require('./models/court');
const {Game} = require('./models/game');
const {Report} = require('./models/report');
const {User} = require('./models/user');


//##############################
//          Courts
//##############################
getAllCourts = async =>{
    return Court.find({}).populate({path:"supervisor", model: "User"});
}

getCourtByID = async (courtID) =>{
    return Court.find({_id: courtID});
}

createCourt = async (newCourtData) =>{
    const newCourt = new Court(newCourtData);
    return newCourt.save();
}

editCourt = async (courtToEditID, newCourtData) =>{
  return Court.findByIdAndUpdate(courtToEditID, newCourtData, {new:true});
}

deleteCourt = async (courtID) =>{
    return Court.findByIdAndDelete({courtID});
}

//##############################
//          Users
//##############################


createUser =  async (newUserData) =>{
    const newUser = User(newUserData);
    switch(newUser.type.toLowerCase())
    {
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

getUserByID = async(userID) =>{
    return User.find({_id: userID});
}
getUserByEmail = async(userEmail) =>{
    return User.findOne({email: userEmail});
}

editUser = async(userID, newUserData) =>{
    return User.findByIdAndUpdate(userID, newUserData, {new:true});

}
deleteUser = async (userID) =>{
    return Court.findByIdAndDelete({userID});
}



module.exports = {
    createCourt,
    editCourt,
    getAllCourts,
    deleteCourt,
    createUser,
    getUserByEmail,
    getUserByID,
    editUser,
    deleteUser
}
