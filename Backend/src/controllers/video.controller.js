import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Viedeo } from "../models/viedeo.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getAllVideos = asyncHandler(async (req, res) => {

const allviedeos=await Viedeo.find({});
console.log(allviedeos);
return res
.status(201)
.json(new ApiResponse(200,allviedeos, "These are all viedeos by channel"));
       
})

//completed
const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} =req.body
    console.log(title)
    console.log(req.body)
    if(!title){
        throw new ApiError(400,"No title and description")
    }
    // TODO: get video, upload to cloudinary, create video
    const viedeofiles = req.files && req.files.viedeoFile;
    const viedeotarlocalpath = viedeofiles ? viedeofiles[0]?.path : null;
    const viedeotar=await UploadOnCloudinary(viedeotarlocalpath);
    console.log("Cloudinary response:",viedeotar);
    const user=await Viedeo.create({
          thumbnail:viedeotar.thumbnail,
          title,
          description,
          viedeoFile:viedeotar.url,
          duration:viedeotar.duration,
          owner:req.user._id,

    })
    console.log(user);
})
//completed
const getVideoById = asyncHandler(async (req, res) => {
    const { viedeoid } = req.params
    console.log(req.params)
    console.log(viedeoid)
    //TODO: get video by id
    const vid=await Viedeo.findById(viedeoid);
    if(!vid){
        throw new ApiError(400,"viedeo not found")
    }
    console.log(vid)
    console.log(vid.title);
})
//completed
const updateVideo = asyncHandler(async (req, res) => {
    const { viedeoid } = req.params
    const { title,description } = req.body
    const vid=await Viedeo.findById(viedeoid);
    console.log(vid.title)
    vid.title=title
    console.log(vid.title)
    vid.description=description
    console.log(vid.description);
    await vid.save();
    //TODO: update video details like title, description, thumbnail
    
})
//completed
const deleteVideo = asyncHandler(async (req, res) => {
    //TODO: delete video
    const { viedeoid } = req.params
    const vid=await Viedeo.deleteOne({_id:viedeoid});
    console.log("viedeo deleted");
    
})


const togglePublishStatus = asyncHandler(async (req, res) => {
    const { viedeoid } = req.params
    const vid=await Viedeo.findById(viedeoid);
    if(!vid.isPublished){
        return false

    }
    else{
        return true
    }


})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
//maine video controller ke routes define karte waqt multer ka function use or describe  nahi kiya tha isliye req.body kam nahi kr raha tha

//65d7a4d43bc38b9c75c38477