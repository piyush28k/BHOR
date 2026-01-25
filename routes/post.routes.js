import express from 'express'
import { addPost,deletePost,getPost } from '../controller/Post.controller.js'

const route = express.Router()
route.post("/addpost",addPost)
route.post("/deletepost",deletePost)
route.get("/getPost", getPost)

export default route