import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentschema=new Schema({

   content:{
    type:String,
    required:true,
   },
   viedeo:{
    type:Schema.Types.ObjectId,
    ref:"Viedeo",
   },
   owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
   },


},{timestamps:true})

commentschema.plugin(mongooseAggregatePaginate);

export const Comment=mongoose.model("Comment",commentschema)