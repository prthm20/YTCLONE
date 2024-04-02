import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const tweetschema=new Schema({
  
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true,
    }
  
},{timestamps:true});

export const tweet=mongoose.model("tweet",tweetschema);