import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    image:String,
    profileImg:String,
    title:String,
    username:String,
    link:String,
    text:String,
    comments:{name:String,image:String,comment:String}
},{ timestamps: true })

const Post = mongoose.model("post",postSchema)
export default Post