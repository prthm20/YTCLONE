import { ApiError } from "../utils/ApiError.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const verifyJwt=asyncHandler(async(req,res,next)=>{

 
  
  try {
    const token=  req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer ","")
    console.log("Received token:", token);
    
    if(!token){
      throw new ApiError(401,"Unauthorized request")
      
    }
    const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user=await User.findById(decodedToken?._id).select("-password -refreshtoken")
    
    if(!user){
      throw new ApiError(401,"invalid accestoken")
    }
    req.user=user;
    next()
  } catch (error) {
    throw new ApiError(401,error?.message||"invalid access token")
  }
})
