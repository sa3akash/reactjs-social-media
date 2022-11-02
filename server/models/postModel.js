import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({

    userId: {type: mongoose.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    likes: [{type: mongoose.Types.ObjectId, ref: "User"}],
    image: {type: String},

}, {timestamps: true})



export default mongoose.model("Post", PostSchema);

