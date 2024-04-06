import mongoose from "mongoose"
import {Viedeo} from "../models/viedeo.model.js"
import {Subscription} from "../models/subscription.model.js"
import {like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const userId=req.user._id;
  const getviedeocount=await Viedeo.countDocuments({owner:userId});
  console.log(getviedeocount);
  const getlikecount=await like.countDocuments({likedby:userId});
  console.log(getlikecount);
  const getsubscribercount=await Viedeo.countDocuments({channel:userId});
  console.log(getsubscribercount);
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
 const channelId=req.user._id;
const allviedeos=await Viedeo.find({owner:channelId});
console.log(allviedeos);
return res
.status(201)
.json(new ApiResponse(200,allviedeos, "These are all viedeos by channel"));
});
const getChanVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
 const {channel}=req.params;
const allviedeos=await Viedeo.find({owner:channel});
console.log(allviedeos);
return res
.status(201)
.json(new ApiResponse(200,allviedeos, "These are all viedeos by channel"));
});


export {
    getChannelStats, 
    getChannelVideos,
    getChanVideos
    }