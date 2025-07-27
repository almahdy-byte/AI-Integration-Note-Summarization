import { model, Schema, Types } from "mongoose";

const noteScheme = new Schema({
    title : {
        type : String ,
        require:true
    },

    body:{
        type:String,
        require:true
    },

    ownerId:{
        type:Types.ObjectId,
        ref:"User"
    },
    summary:{
        type:String,
    }
},{timestamps : true});

noteScheme.pre(/^find/, function (next) {
  this.populate('ownerId');
  next();
});
 
export const noteModel = model('Notes' , noteScheme)