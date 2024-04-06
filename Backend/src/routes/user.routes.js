import { Router } from "express";
import {upload} from "../middlewears/multer.middlewear.js"
import { changecurrentpassword, getCurrentUser, getUserchannelprofile, getWatchhistory, loginUser, logoutuser, refreshAccessToken, registerUser, updateAccountdetails } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewears/auth.middlewear.js";
import { deleteVideo, getAllVideos, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/video.controller.js";
import { getVideoById } from "../controllers/video.controller.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";
import { get } from "mongoose";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controller.js";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller.js";
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller.js";

const router=Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ])   
    ,registerUser);
router.route("/login").post(loginUser) 

//viedeo controller routes
router.route("/publish").post(verifyJwt,
    upload.fields([
        {name:"viedeoFile",maxcount:1}
    ]),publishAVideo) 
    router.route("/viedeos/:viedeoid").patch(togglePublishStatus)
//router.route("/getviedeos").get(getAllVideos)
router.route("/viedeos/:viedeoid").get(getVideoById)
router.route("/viedeos/:viedeoid").put(updateVideo)
router.route("/viedeos/:viedeoid").delete(deleteVideo)
router.route("/getall").get(getAllVideos)

/////////////////////////////////////////////////////////
//tweet.controller.js
router.route("/tweet").post(verifyJwt,createTweet);
router.route("/usertweet/:userid").get(verifyJwt,getUserTweets);
router.route("/updatetweet/:tweetid").put(verifyJwt, updateTweet);
router.route("/deletetweet/:tweetid").delete(deleteTweet);

//like.controller.js
router.route("/like/:videoId").post(verifyJwt,toggleVideoLike);
router.route("/commentlike").post(verifyJwt,toggleCommentLike);
router.route("/tweetlike/:tweetId").post(verifyJwt,toggleTweetLike);
router.route("/likedviedeos").get(verifyJwt,getLikedVideos);

//comment.controller.js
router.route("/getcomments/:videoId").get(getVideoComments);
router.route("/addcomments/:videoId").post(verifyJwt,addComment);
router.route("/updatecomment/:commentId").post(verifyJwt,updateComment);
router.route("/deletecomment/:commentId").delete(verifyJwt,deleteComment);

//subscription routes
router.route("/subscribe/:channelId").post(verifyJwt,toggleSubscription);
router.route("/subscribers/:channelId").get(verifyJwt,getUserChannelSubscribers);
router.route("/subscribed").get(verifyJwt,getSubscribedChannels);

//playlist routes
router.route("/createplaylist").post(verifyJwt,createPlaylist);
router.route("/userplaylist").get(verifyJwt,getUserPlaylists);
router.route("/playlistbyid/:playlistId").get(verifyJwt,getPlaylistById);
router.route("/addtoplaylist/:playlistId/:videoId").post(addVideoToPlaylist);
router.route("/removefromplaylist/:playlistId/:videoId").delete(verifyJwt,removeVideoFromPlaylist);
router.route("/deleteplaylist/:playlistId").delete(verifyJwt,deletePlaylist);
router.route("/updateplaylist/:playlistId").put(verifyJwt,updatePlaylist);

//dashboard routes
router.route("/channelstats").get(verifyJwt,getChannelStats)
router.route("/channelviedeos").get(verifyJwt,getChannelVideos)

//secured routes
router.route("/logout").post(verifyJwt,logoutuser)
router.route("/refresh-accesstoken").post(refreshAccessToken)
router.route("/change-password").post(verifyJwt,changecurrentpassword)
router.route("/current-user").get(verifyJwt,getCurrentUser)
router.route("/update-account").patch(verifyJwt,updateAccountdetails)
router.route("/update-image").patch(verifyJwt,upload.single("avatar"),updateAccountdetails)
router.route("/c/:username").get(verifyJwt,getUserchannelprofile)
router.route("/history").get(verifyJwt,getWatchhistory)

export { router}