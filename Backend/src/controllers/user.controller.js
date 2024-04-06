import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import jwt from "jsonwebtoken";
import path from "path";
import mongoose from "mongoose";
import { error } from "console";
import { runInNewContext } from "vm";
import  json from "body-parser";


//completed
const generatAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found for userId:", userId);
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshtoken = user.generateRefreshToken();
    console.log("Generated Access Token:", accessToken);
    console.log("Generated Refresh Token:", refreshtoken);

    user.refreshtoken = refreshtoken;
    await user.save({ validatBeoreSave: false });

    return { accessToken, refreshtoken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};
//completed
const registerUser = asyncHandler(async (req, res) => {
  //get user details  from frontend
  //validation-not empty
  //check if user already exists
  //check for images ,check for avatar
  //create user object,create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { email, password, username, fullname } = req.body;
  console.log(req.body);

  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError("400", "All fields are repuired");
  }

  const existeduser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existeduser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  console.log(req.body); // Log the entire req.body object
  console.log(req.files); // Log the entire req.files object

  const avatarFiles = req.files && req.files.avatar;
  //const coverImageFiles = req.files && req.files.coverImage; // Define coverImageFiles

  //if (!avatarFiles || !avatarFiles[0] || !avatarFiles[0].path) {
  //  console.error("Error: Avatar file not provided or path not defined");
  //throw new ApiError(400, "Avatar file not provided or path not defined");
  //}
  //const currentModulePath = new URL(import.meta.url).pathname;
  //const currentModuleDir = path.dirname(decodeURIComponent(currentModulePath));
  //
  //const avatarlocalpath = path.join(currentModuleDir, avatarFile.path);
  const avatarlocalpath = avatarFiles ? avatarFiles[0]?.path : null;
  //const coverImagelocalpath =coverImageFiles ? coverImageFiles[0]?.path : null;

  //if(!avatarlocalpath){
  // throw new ApiError(400,"avatarlocalpat not defined")
  //}
  //const coverImagelocalpath = coverImageFiles ? coverImageFiles[0]?.path : null;

  const avatar = await UploadOnCloudinary(avatarlocalpath);
  //  const coverImage =await UploadOnCloudinary(coverImagelocalpath)
  console.log("Cloudinary Response:", avatar);
  // console.log("Cloudinary Response:", coverImage);
  // const coverImage =await UploadOnCloudinary(coverImagelocalpath)
  //console.log("Cover Image Upload Response:", coverImage)

  //if (!avatar || !avatar.url) {
  // throw new ApiError(400, "Avatar upload failed or path not defined");
  //}

  //if (coverImage && !coverImage.url) {
  //throw new ApiError(400, "Cover image upload failed or path not defined");
  //}
  if (avatar && avatar.url) {
    const avatarUrl = avatar.url;
    console.log("Avatar URL:", avatarUrl);

    // Now you can use the avatarUrl as needed (e.g., store it in the database)
  } else {
    throw new ApiError(400, "Avatar upload failed or URL not defined");
  }
  const avatarurl = avatar.url;
  // const coverImageurl=coverImage.url;
  const user = await User.create({
    fullname,
    avatar: avatarurl||"",
    coverImage: "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createduser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  if (!createduser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

   return res
    .status(201)
    .json(new ApiResponse(200, createduser, "User registered Succesfully"));
});
//completed
const loginUser = asyncHandler(async (req, res) => {
  //req.body->data
  //username,email
  //find user
  //password check
  //acces and refresh token
  //send cookie

  const { email, password, username } = req.body;
  console.log("Request Body:", req.body);
  console.log("Email:", email);
  console.log("Username:", username);
  if (!username && !email) {
    throw new ApiError(400, "username or email required");
  }
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!existingUser) {
    throw new ApiError(400, "NO user found");
  }

  const ispasswordvalid = await existingUser.isPasswordcorrect(password);

  if (!ispasswordvalid) {
    throw new ApiError(400, "Password is incorrect");
  }

  const { refreshtoken, accessToken } = await generatAccessAndRefreshTokens(
    existingUser._id
  );

  const loggedinuser = await User.findById(existingUser._id).select(
    "-password -refreshtoken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshtoken", refreshtoken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinuser,
          accessToken,
          refreshtoken,
        },
        "User logged in succesfully"
      )
    );
});
//completed
const logoutuser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshtoken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshtoken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});
//completed
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingrefreshtoken =
    req.cookies.refreshtoken || req.body.refreshtoken;
  if (!incomingrefreshtoken) {
    throw new ApiError(400, "Unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(
      incomingrefreshtoken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(400, "invalid refreshtoken");
    }
    if (incomingrefreshtoken !== user?.refreshtoken) {
      throw new ApiError(400, "Refresh token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newrefreshtoken } =
      await generatAccessAndRefreshTokens(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshtoken", newrefreshtoken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshtoken: newrefreshtoken },
          "accessToken refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(400, error?.message || "invalid refreshtoken");
  }
});
//completed
const changecurrentpassword = asyncHandler(async (req, res) => {
  const { oldpassword, newpassword } = req.body;
  console.log(req.body);
  console.log(newpassword)
  const user = await User.findById(req.user._id);
  const ispasswordcorrect =await user.isPasswordcorrect(oldpassword);
  if(!ispasswordcorrect){
    throw new ApiError(400,"password is incorrect")
  }
  user.password = newpassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed succesfully"));
});
//completed
const getCurrentUser = asyncHandler(async (req, res) => {
  const ob=req.user;
  console.log(ob);
  return res
    .status(200)
    .json(new ApiResponse(200,req.user, "current user fetched successfully"));
});
//completed
const updateAccountdetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  if (!fullname || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return (
    res.status(200)
    .json(new ApiResponse(200, user, "Account details updated succesfully"))
  );
});
//Not working properly
const updateuseravatar = asyncHandler(async (req, res) => {
  const avatarlocalpath = req.file?.path;
  if (!avatarlocalpath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  const avatar = await UploadOnCloudinary(avatarlocalpath);
  if (!avatar.url) {
    throw new ApiError(400, "error while uploading on avatar");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      set: {
        avatar:avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res.status(200).json(new ApiResponse(200, user, "avatar updated"));
});
//make a utility function to delete old avatar image
const getUserchannelprofile = asyncHandler(async (req, res) => {
  const username = req.params;

  if (!username) {
    throw new ApiError(400, "username is missing");
  }
  const channel = await User.aggregate([
    {
      $match: {
        username: username,
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribercount: {
          $size: "$subscribers",
        },
        
        channelssubscribedto: {
          $size: "$subscribedTo",
        },
        
        isSubscribedto: {
          $cond: {
            if: { $in: [req?.user._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },

    },
    {

      $project: {
        fullname: 1,
        username: 1,
        email: 1,
        subscribercount: 1,
        isSubscribedto: 1,
        channelssubscribedto: 1,
        avatar: 1,
      },
      
    }
 ] );
  if (!channel?.length) {
    throw new ApiError(400, "channel does not exist");
  }
console.log(channel)
  return res
    .status(200)
    .json(new ApiResponse(200, channel, "User channel fetched succesfully"));
});

const getWatchhistory = asyncHandler(async (req, res) => {
  const user=User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req?.user._id),
      },
    },
    {
      $lookup: {
        from: "Viedeos",
        localField: "Watchhistory",
        foreignField: "_id",
        as: "Watchhistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline:[
                {
                  fullname:1,
                  username:1,
                  avatar:1,
                },
                {
                  $addFields:{
                    owner:{
                      $first:"$owner"
                    }
                  }
                }
              ]
            },
          },
        ],
      },
    },
  ]);
  return res
  .status(200)
  .json(
    new ApiResponse(200,user[0].Watchhistory,"Watchhistory fetched successfully")
  )
});

export {
  registerUser,
  loginUser,
  logoutuser,
  refreshAccessToken,
  changecurrentpassword,
  getCurrentUser,
  updateAccountdetails,
  updateuseravatar,
  getUserchannelprofile,
  getWatchhistory
};
