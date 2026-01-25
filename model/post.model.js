import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    image:String,
    name:String,
    link:String,
    post:String,
    comments:{name:String,image:String,comment:String}
})

const Post = mongoose.model("post",postSchema)
export default Post