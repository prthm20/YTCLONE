import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    const user=req.user._id;

    const issubscribed=await Subscription.findOne({
        subscriber:user,
        channel:channelId});

    if(!issubscribed){
       const newsubscribe= await Subscription.create({
            subscriber:user,
            channel:channelId
        })
        console.log(newsubscribe,"subscribed")
    }
    else{

      const del=await  Subscription.findOneAndDelete({
        subscriber:user,
        channel:channelId
      })
      console.log(del,"unsubscribed");


    }
//console.log(channel);
//const issubscribedto =channel.subscribers.includes(user);

return res
.status(400)
.json(new ApiResponse(200,{},"done"));
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    const channel=await Subscription.find({channel:channelId});
    console.log(channel)

    if(!channel){
        throw new ApiError(400,"Channel not found");
    }

    const subscribers=await User.find({_id:{$in:channel.subscribers}}).select("fullname username");
    console.log(subscribers)
    return res
    .status(200)
    .json(new ApiResponse(200,subscribers,"Fetched subscribers succesfully"));
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const UserId =req.user._id;
    console.log(UserId)
    
    const user=await Subscription.find({subscriber:UserId});
    console.log(user)
    
   // if(!channel){
     //   throw new ApiError(400,"Channel not found");
    //}
    
    //const channels=await User.find({_id:{$in:user.subscribedTo}}).select("fullname username");
    return res
    .status(200)
    .json(new ApiResponse(200,[],"Fetched subscribers succesfully"));
    
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}