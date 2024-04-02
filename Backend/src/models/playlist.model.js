import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const playlistschema=new Schema({
    viedeo:[
    {
        type:Schema.Types.ObjectId,
        ref:"Viedeo"
    }
],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
  
},{timestamps:true});

export const playlist=mongoose.model("playlist",playlistschema);