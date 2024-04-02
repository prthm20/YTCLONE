import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId}=req.params
    const allcomments=await Comment.find({viedeo:videoId});
    console.log(allcomments);
    return res
    .status(201)
    .json(new ApiResponse(200,allcomments, "These are ary"));

})
//completed
const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {content}=req.body
    const {videoId}=req.params
    const comment=await Comment.create({
        content:content,
        viedeo:videoId,
        owner:req.user._id
        
    })
    console.log(comment);
    


})
//completed
const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const{content}=req.body
    console.log(content);
    const{commentId}=req.params
    console.log(commentId)
    const comment =await Comment.findByIdAndUpdate(commentId,{
    content:content
   })
   
})
//completed
const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const{commentId}=req.params
    const comment=await Comment.findByIdAndDelete(commentId) 
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }