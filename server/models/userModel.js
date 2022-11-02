import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    profileImage: {type: String},
    coverImage: {type: String},
    livesIn: {type: String},
    workAt: {type: String},
    relationship: {type: String},
    followers: [{type: mongoose.Types.ObjectId, ref: "User"}],
    following: [{type: mongoose.Types.ObjectId, ref: "User"}],
  
},{timestamps : true})



export default mongoose.model("User",UserSchema)


