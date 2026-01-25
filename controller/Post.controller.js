import PostModel from "../model/post.model.js";

export const getPost = async (req,res)=>{
    try{
        const posts = await PostModel.find()
        res.status(200).json({data:posts,msg:"post get success"})
    }catch(error){
        res.status(500).json({msg:"error in getting post => ",error})
    }
}

export const addPost = async (req,res)=>{
    const {image,name,link,cont} = req.body

    if(!image || !link || !name || !cont) return res.status(400).json({mgs:"incomplete data"})

    try{
        const post = new PostModel({image,name,link,post:cont})
        await post.save()

        res.status(200).json({mgs:"post add success"})
    }catch(error){
        res.status(500).json({mgs:"internal server error"})
    }
}

export const deletePost = async (req,res)=>{
    const {_id} = req.body
    if(!_id) return res.status(400).json({mgs:"ID is not given"})

    try{
        const posts = await PostModel.find()
        posts = posts.filter((post)=>post._id.toString()!==_id)
        await posts.save()

        res.status(200).json({msg:"delete success"});

    }catch(error){
        res.status(500).json({msg:"internal server error=> ",error})
    }

}