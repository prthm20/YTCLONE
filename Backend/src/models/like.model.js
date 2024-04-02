import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likeschema=new Schema({
    viedeo:{
        type:Schema.Types.ObjectId,
        ref:"Viedeo"
    },
     comments:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },
     tweets:{
        type:Schema.Types.ObjectId,
        ref:"tweet"
    }
    
    ,
     likedby:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    
},{timestamps:true})

export const like=mongoose.model("like",likeschema);
      